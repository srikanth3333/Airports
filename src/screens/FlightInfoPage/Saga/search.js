import { takeEvery, put, call, select } from 'redux-saga/effects'
import { isEmpty, isError, get, last } from 'lodash'

import { getFlightMeta, getFlightDetails } from '../../../services/api-end-points'
// import fetch from '../../general/utils/fetch'
import { HTTP_METHODS, request } from "../../../services";

import { normalizeFlightStatuses } from '../../../utils/reduxNormalizr'
import {flightInfo} from '../ActionType/flightInfo'
import {search} from '../ActionType/search'
import { search as actions } from '../Action'

const SEARCH_TIME_BOUND_BY_MINUTES = {
  ARRIVAL: {
    from: -480,
    to: 360
  },
  DEPARTURE: {
    from: -250,
    to: 2160
  }
}

const getUserToken = state => get(state, 'userProfile.token', '')
const getPreviewStatus = state => false

const getTimeBoundParams = (leg) => {
  switch (leg) {
    case 'A':
      return `&fromArrivals=${SEARCH_TIME_BOUND_BY_MINUTES.ARRIVAL.from}&toArrivals=${SEARCH_TIME_BOUND_BY_MINUTES.ARRIVAL.to}`
    case 'D':
      return `&fromDepartures=${SEARCH_TIME_BOUND_BY_MINUTES.DEPARTURE.from}&toDepartures=${SEARCH_TIME_BOUND_BY_MINUTES.DEPARTURE.to}`
    default:
      return ''
  }
}

const getSearchByAirlineURL = ({ code, leg }, url = getFlightDetails) => {
  url += `?skip=0&take=300&AircraftOperatorCode=${code}`
  url += getTimeBoundParams(leg)
  return url
}

const getSearchByFlightNumberURL = ({ flightNumber, leg }, url = getFlightDetails) => {
  url += `?flightNumber=${flightNumber}`
  url += getTimeBoundParams(leg)
  return url
}

const getSearchByCityURL = ({ code, leg }, url = getFlightDetails) => {
  url += `?skip=0&take=300&CityCode=${code}`
  url += getTimeBoundParams(leg)
  return url
}

const getCheckSum = state => state.search.flightMetadataCheckSum

const getLastMetadata = state => state.search.flightMetadata

function* fetchFlightMetadata() {
  debugger
  try {
    const checkSum = yield select(getCheckSum)
    let params = ``
    if (checkSum && checkSum.length>0) {
      params = `?checksum=${checkSum}`
    }
    const userToken = yield select(getUserToken)
    const isPreviewEnabled = yield select(getPreviewStatus)
    let data = []
    let finalURL = getFlightMeta+params
    if (!isPreviewEnabled) {
      // data = yield call(fetch, getFlightMeta+params)
      data = yield call(()=>request(finalURL, HTTP_METHODS.GET))
    } else {
      // data = yield call(fetch, getFlightMeta+params, {
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json',
      //     'x-api-type': 'mahb'
      //   },
      //   method: 'GET'
      // })
    }
    data=data.response.data;
    if (isError(data)) {
      yield put(actions.fetchFlightMetadataFailed(data))
      return false;
    }
    if (!isEmpty(data)) {
      if (data.success) {
        return;
      }
      debugger
      if (!isEmpty(data)) {
        if (data.flightMeta && data.flightMeta.flights) {
          const flightsByOperator = {};
          for (var i=0;i<data.flightMeta.flights.length;i++) {
            const e = data.flightMeta.flights[i];
            e.spacelessFlightNumber = (e.flightNumber) ? e.flightNumber.replace(/\s/g, '') : ''
            const opcode = e.airCraftOperatorCode;
            let flightsArray = flightsByOperator[opcode] || [];
            flightsArray.push(e);
            flightsByOperator[opcode] = flightsArray;
          }
          for (var i=0;i<data.flightMeta.airlineOperators.length;i++) {
            const e = data.flightMeta.airlineOperators[i];
            e.flights = flightsByOperator[e.operator]
          }
          //data.flightMeta.flightsByOperator = flightsByOperator;
        }
        yield put(actions.fetchFlightMetadataSucceeded(data))
      }
    }
  } catch (e) {
    yield put(actions.fetchFlightMetadataFailed(e))
    console.log(e)
  }
}

function* searchFlightsByAirline({ payload }) {
  try {
    const url = getSearchByAirlineURL(payload)
    const userToken = yield select(getUserToken)
    const isPreviewEnabled = yield select(getPreviewStatus)
    let data = []
    if (!isPreviewEnabled) {
      // data = yield call(fetch, url)
      data = yield call(() => request(url, HTTP_METHODS.GET))
    } else {
      // data = yield call(fetch, url, {
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json',
      //     'x-api-type': 'mahb'
      //   },
      //   method: 'GET'
      // })
    }
    data=data.response.data;
    if (isError(data)) {
      yield put(actions.searchFlightsByAirlineFailed("no result"))
      console.log(data)
      return false;
    }
    if (!isEmpty(data)) {
      if (payload.loadAll && data.count && data.flightStatuses && data.flightStatuses.length<data.count) {
        params = `${mainParams}&skip=0&take=${data.count}`
        const allData = yield call(fetch, getFlightDetails+params)
        if (!isEmpty(allData)) {
          data = allData
        }
      }
      const { entities = {}, result } = normalizeFlightStatuses(get(data, 'flightStatuses', {}))
      if (result.length > 0) {
        yield put(actions.searchFlightsByAirlineSucceeded(entities))
      } else {
        yield put(actions.searchFlightsByAirlineFailed(new Error('no result')))
      }
    } else {
      yield put(actions.searchFlightsByAirlineFailed(new Error('no result')))
    }
  } catch (e) {
    yield put(actions.searchFlightsByAirlineFailed(e))
    console.log(e)
  }
}

function* searchFlightsByFlightNumber({ payload }) {
  try {
    const url = getSearchByFlightNumberURL(payload)
    console.log(url)
    console.log(payload)
    const userToken = yield select(getUserToken)
    const isPreviewEnabled = yield select(getPreviewStatus)
    let data = []
    if (!isPreviewEnabled) {
      // data = yield call(fetch, url)
      data = yield call(() => request(url, HTTP_METHODS.GET))
    } else {
      // data = yield call(fetch, url, {
      //     headers: {
      //       'Authorization': `Bearer ${userToken}`,
      //       'Content-Type': 'application/json',
      //       'x-api-type': 'mahb'
      //     },
      //     method: 'GET'
      // })
    }
    data=data.response.data;
    if (!isEmpty(data)) {
      const { entities = {}, result } = normalizeFlightStatuses(get(data, 'flightStatuses', {}))
      if (result.length > 0) {
        yield put(actions.searchFlightsByAirlineSucceeded(entities))
      } else {
        yield put(actions.searchFlightsByAirlineFailed(new Error('no result')))
      }
    } else {
      yield put(actions.searchFlightsByAirlineFailed(new Error('no result')))
    }
  } catch (e) {
    yield put(actions.searchFlightsByAirlineFailed(e))
    console.log(e)
  }
}



function* searchFlightsByCity({ payload }) {
  try {
    const url = getSearchByCityURL(payload)
    const userToken = yield select(getUserToken)
    const isPreviewEnabled = yield select(getPreviewStatus)
    let data = []
    if (!isPreviewEnabled) {
      // data = yield call(fetch, url)
      data = yield call(() => request(url, HTTP_METHODS.GET))
    } else {
      // data = yield call(fetch, url, {
      //   headers: {
      //     'Authorization': `Bearer ${userToken}`,
      //     'Content-Type': 'application/json',
      //     'x-api-type': 'mahb'
      //   },
      //   method: 'GET'
      // })
    }
    data=data.response.data;
    if (isError(data)) {
      yield put(actions.searchFlightsByCityFailed(data))
      return false;
    }
    if (!isEmpty(data)) {
      if (payload.loadAll && data.count && data.flightStatuses && data.flightStatuses.length<data.count) {
        params = `${mainParams}&skip=0&take=${data.count}`
        const allData = yield call(fetch, getFlightDetails+params)
        if (!isEmpty(allData)) {
          data = allData
        }
      }
      const { entities = {}, result } = normalizeFlightStatuses(get(data, 'flightStatuses', {}))
      if (result.length > 0) {
        yield put(actions.searchFlightsByCitySucceeded(entities))
      } else {
        yield put(actions.searchFlightsByCityFailed(new Error('no result')))
      }
    } else {
      yield put(actions.searchFlightsByCityFailed(new Error('no result')))
    }
  } catch (e) {
    yield put(actions.searchFlightsByCityFailed(e))
    console.log(e)
  }
}

// export function* watchSearch() {
//   yield takeEvery(search.FETCH_FLIGHT_METADATA, fetchFlightMetadata)
//   yield takeEvery(search.SEARCH_FLIGHTS_BY_AIRLINE, searchFlightsByAirline)
//   yield takeEvery(search.SEARCH_FLIGHTS_BY_CITY, searchFlightsByCity)
//   yield takeEvery(search.SEARCH_FLIGHTS_BY_FLIGHT_NUMBER, searchFlightsByFlightNumber)
//   // yield takeEvery(actionTypes.preview.RESET_CACHE, fetchFlightMetadata)
// }

export function* watchSearchFetchFlightMetadata() {
  yield takeEvery(search.FETCH_FLIGHT_METADATA, fetchFlightMetadata)
}

export function* watchSearchFlightsByAirline() {
  yield takeEvery(search.SEARCH_FLIGHTS_BY_AIRLINE, searchFlightsByAirline)
}
export function* watchSearchFlightsByCity() {
  yield takeEvery(search.SEARCH_FLIGHTS_BY_CITY, searchFlightsByCity)
}
export function* watchSearchFlightsByFlightNumber() {
  yield takeEvery(search.SEARCH_FLIGHTS_BY_FLIGHT_NUMBER, searchFlightsByFlightNumber)
}