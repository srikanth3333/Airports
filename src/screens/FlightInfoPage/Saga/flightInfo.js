import { Image } from 'react-native'
import { takeEvery, throttle, put, call, select, takeLatest } from 'redux-saga/effects'
import { isEmpty, get, last, isError, size, pickBy } from 'lodash'

import {
  getDepartureFlights,
  getArrivalFlights,
  getFlightDetails,
  getTailImages,
  staticContentURL,
  getPrevArrivalFlightsURL,
  getPrevDepartureFlightsURL
} from '../../../services/api-end-points';
import { FLIGHT_LIMIT } from '../../../utils/constants';
import { HTTP_METHODS, request } from "../../../services";

import { normalizeFlightStatuses } from '../../../utils/reduxNormalizr';

import {flightInfo} from '../ActionType/flightInfo'
import {search} from '../ActionType/search'
import { flightInfo as actions } from '../Action'
import { TIME_BOUND_BY_MINUTES } from '../reducers/flightInfo'

const getTerminal = state => state.flightInfo.terminal.toUpperCase()
const getUserToken = state => get(state, 'userProfile.token', '')
// const getPreviewStatus = state => state.preview
const getPreviewStatus = state => false

const getFlightListInfo = (state, type) => {
  switch (type) {
    case flightInfo.FETCH_DEPARTURES:
      return {
        currentCount: size(state.flightInfo.departure),
        skip: state.flightInfo.departureSkip,
        total: state.flightInfo.departureTotal
      }
    case flightInfo.FETCH_ARRIVALS:
      return {
        currentCount: size(state.flightInfo.arrival),
        skip: state.flightInfo.arrivalSkip,
        total: state.flightInfo.arrivalTotal
      }
    default:
      return {}
  }
}

const getTimeBoundParamsText = (state, type) => {
  switch (type) {
    case flightInfo.FETCH_PREV_DEPARTURES:
      const departureBound = get(state, 'flightInfo.prevDepartureBounds', {})
      return `fromDepartures=${departureBound.from}&toDepartures=${departureBound.to}`
    case flightInfo.FETCH_PREV_ARRIVALS:
      const arrivalBounds = get(state, 'flightInfo.prevArrivalBounds', {})
      return `fromArrivals=${arrivalBounds.from}&toArrivals=${arrivalBounds.to}`
    default:
      return ''
  }
}

function* fetchFlights({ type }) {
  debugger
  const currentTerminal = yield select(getTerminal)
  const { total = 0, skip, currentCount = 0 } = yield select(getFlightListInfo, type)
  if (currentCount === total && currentCount > 0) {
    return false; // reach end of list
  }
  const URL = (type === flightInfo.FETCH_ARRIVALS) ? getArrivalFlights : getDepartureFlights
  const finalURL = URL + `?skip=${skip}` + `&take=${FLIGHT_LIMIT}` + '&terminal=' + currentTerminal
  console.log(finalURL)
  const succeededAction = (type === flightInfo.FETCH_ARRIVALS) ? actions.fetchArrivalsFulfilled : actions.fetchDeparturesFulfilled
  const failedAction = (type === flightInfo.FETCH_ARRIVALS) ? actions.fetchArrivalsFailed : actions.fetchDeparturesFailled

  const userToken = yield select(getUserToken)
  const isPreviewEnabled = yield select(getPreviewStatus)
  try {
    console.log(finalURL)
    let data = []
    if (!isPreviewEnabled) {
      data = yield call(()=>request(finalURL, HTTP_METHODS.GET))

    } else {
      data = yield call(()=>request(finalURL, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'x-api-type': 'mahb'
        },
        method: 'GET'
      }));
    }
    data = data.response.data
    console.log("sagasgfasgfsagDataaaa", data)
    if (isError(data)) {
      yield put(failedAction(data))
    } else if (!isEmpty(data)) {
      const count = get(data, 'count', 0)
      const { entities = {}, result } = normalizeFlightStatuses(get(data, 'flightStatuses', {}))

      yield put(succeededAction(entities, count))
    } else {
      yield put(failedAction(data))
    }
  } catch (e) {
    console.log(e)
    yield put(failedAction(e))
  }
}

function* fetchPrevFlights({ type }) {
  const isArrival = (type === flightInfo.FETCH_PREV_ARRIVALS)
  const currentTerminal = yield select(getTerminal)
  const timeBoundParams = yield select(getTimeBoundParamsText, type)
  // TODO: set a limit here for timeBound
  const URL = (isArrival) ? getPrevArrivalFlightsURL : getPrevDepartureFlightsURL
  const finalURL = URL + `?skip=0&take=1000` + '&terminal=' + currentTerminal + '&' + timeBoundParams
  const succeededAction = (isArrival) ? actions.fetchPrevArrivalsFulfilled : actions.fetchPrevDeparturesFulfilled
  const failedAction = (isArrival) ? actions.fetchPrevArrivalsFailed : actions.fetchPrevDeparturesFailled

  const userToken = yield select(getUserToken)
  const isPreviewEnabled = yield select(getPreviewStatus)
  try {
    console.log(finalURL)
    let data = []
    if (!isPreviewEnabled) {
      data = yield call(()=>request(finalURL, HTTP_METHODS.GET))
    } else {
      data = yield call(()=>request(finalURL, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'x-api-type': 'mahb'
        },
        method: 'GET'
      }))
    }
    data=data.response.data
    if (isError(data)) {
      yield put(failedAction(data))
    } else if (!isEmpty(data)) {
      const count = get(data, 'count', 0)
      const { entities = {}, result } = normalizeFlightStatuses(get(data, 'flightStatuses', {}))
      yield put(succeededAction(entities, count))
    } else {
      yield put(failedAction(data))
    }
  } catch (e) {
    console.log(e)
    yield put(failedAction(e))
  }
}

function* fetchFlightDetails({ payload }) {
  const { id, codeshareId } = payload
  const URL = getFlightDetails + '?afsKey=' + ((codeshareId && codeshareId != 0) ? codeshareId : id)

  const userToken = yield select(getUserToken)
  const isPreviewEnabled = yield select(getPreviewStatus)
  console.log(URL)
  try {
    let data = []
    if (!isPreviewEnabled) {
      data = yield call(()=>request(URL, HTTP_METHODS.GET))
    } else {
      data = yield call(()=>request(URL, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'x-api-type': 'mahb'
        },
        method: 'GET'
      }))
    }

    if (isError(data)) {
      yield put(actions.fetchFlightFailed(data))
      return;
    }
    if (data.count && data.count<1) {
      yield put(actions.fetchFlightExpired())
      return;
    }
    const { entities = {}, result } = normalizeFlightStatuses(get(data, 'flightStatuses', {}))
    if (!isEmpty(data) && result.length === 1 && result[0]==id) {
      const { flights, codeshareFlights } = entities
      const flight = get(flights, ((id && id != 0) ? id : codeshareId)) || null
      if (!flight) {
        yield put(actions.fetchFlightFailed(new Error('invalid flight')))
        return;
      }
      const leg = get(flight, 'leg')
      if (leg!='A' && leg!='D') {
        yield put(actions.fetchFlightFailed(new Error('invalid leg')))
        return;
      }
      const codeshareFlight = get(codeshareFlights, codeshareId) || null
      if (!codeshareFlight) {
        yield put(actions.fetchFlightFailed(new Error('invalid codeshare flight')))
        return;
      }
      yield put(actions.fetchFlightSucceeded(entities, id, codeshareId ))
    } else {
      yield put(actions.fetchFlightFailed(new Error('no result')))
    }
  } catch (e) {
    console.log(e)
    yield put(actions.fetchFlightFailed(e))
  }
}

async function prefetchTailImages(data) {
  let imagePrefetchs = [];
  data.forEach(({ image }) => {
    imagePrefetchs.push(Image.prefetch(staticContentURL + image))
  })
  return Promise.all(imagePrefetchs)
}

function* fetchTailImagesSaga() {
  const userToken = yield select(getUserToken)
  const isPreviewEnabled = yield select(getPreviewStatus)
  try {
    let data = []
    if (!isPreviewEnabled) {
      data = yield call(()=>request(getTailImages,HTTP_METHODS.GET))
    } else {
      data = yield call(()=>request(getTailImages, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'x-api-type': 'mahb'
        },
        method: 'GET'
      }))
    }
      data=data.response.data;
    if (isError(data)) {
      yield put(actions.fetchTailImagesFailed(data))
      return;
    }
    yield put(actions.fetchTailImagesSucceeded(data))
    // prefetch tailImages here
    // const result = yield call(prefetchTailImages, data)
    // should be all true for a successful prefetch
  } catch (e) {
    console.log(e)
    yield put(actions.fetchTailImagesFailed(e))
  }
}

const getSearchFlightData = (state, id) => {
  const flight = get(state, `search.flightSearchResults.flights.${id}`)

  if (!isEmpty(flight) && !isEmpty(flight.codeShareFlights)) {
    const codeshareFlights = pickBy(get(state, 'search.flightSearchResults.codeshareFlights', []), (value, key) => {
      return flight.codeShareFlights.includes(value.afsKey)
    })
    if (!isEmpty(codeshareFlights)) {
      return {
        flights: { [id]: flight },
        codeshareFlights: codeshareFlights
      }
    }
  }
  return null
}

function* handleSearchFlightSelected({ payload }) {
  const { id, codeshareId } = payload
  const flightData = yield select(getSearchFlightData, id)
  console.log(flightData)
  if (!isEmpty(flightData)) {
    const leg = get(flightData, `flights.${id}.leg`)
    if (['A', 'D'].includes(leg)) {
      const action = (leg === 'A') ? actions.fetchArrivalsFulfilled: actions.fetchDeparturesFulfilled
      yield put(action(flightData))
    }
  }
  yield put(actions.fetchFlight(id, codeshareId))
}

// export function* watchFetchingRequests() {
//   yield throttle(1000, flightInfo.FETCH_ARRIVALS, fetchFlights)
//   yield throttle(1000, flightInfo.FETCH_DEPARTURES, fetchFlights)
//   yield takeEvery(flightInfo.FETCH_FLIGHT, fetchFlightDetails)

//   yield throttle(1000, flightInfo.FETCH_PREV_ARRIVALS, fetchPrevFlights)
//   yield throttle(1000, flightInfo.FETCH_PREV_DEPARTURES, fetchPrevFlights)

//   yield takeEvery(flightInfo.FETCH_TAIL_IMAGES, fetchTailImagesSaga)
//   // yield takeEvery(preview.RESET_CACHE, fetchTailImagesSaga)
// }

export function* watchfetchFlightsArrival() {
  yield throttle(1000, flightInfo.FETCH_ARRIVALS, fetchFlights)
}

export function* watchfetchFlightsDeparture() {
  yield throttle(1000,flightInfo.FETCH_DEPARTURES, fetchFlights)
}
export function* watchfetchFlightsDetails() {
  yield throttle(1000,flightInfo.FETCH_FLIGHT, fetchFlightDetails)
}
export function* watchFetchPrevFlightsArrival() {
  yield throttle(1000,flightInfo.FETCH_PREV_ARRIVALS, fetchPrevFlights)
}
export function* watchFetchPrevFlightsDeparture() {
  yield throttle(1000,flightInfo.FETCH_PREV_DEPARTURES, fetchPrevFlights)
}
export function* watchFetchTailImagesSaga() {
  yield takeLatest(flightInfo.FETCH_TAIL_IMAGES, fetchTailImagesSaga)
}

export function* watchSearch() {
  yield takeLatest(search.SELECT_SEARCH_FLIGHT, handleSearchFlightSelected)
}
