import { takeEvery, takeLatest, put, call, select, all } from 'redux-saga/effects'
import { isEmpty, find, get, set, take, last, isError, isArray, forEach } from 'lodash'

import { googleDirectionsURL, getParkingPlaces, getFlightDetails, postSurvey } from '../../../services/api-end-points'
import { GOOGLE_MAPS_GEOCODING_APIKEY } from '../../../general/constants/keys'
import {request,HTTP} from '../../general/utils/fetch'
// import isInsideAirport from '../../utils/map/isInsideAirport'

import { normalizeFlightStatuses } from '../../../utils/reduxNormalizr'
import { flightStatusCodes } from '../../../general/constants/statues'

import * as actionTypes from '../actiontypes'
import { plans as actions } from '../action'
import { getDefaultPlan } from '../reducer/plans'

import moment from 'moment'
import {localizeDate} from '../../../utils/constants'

const getLastRoute = state => last(get(state, 'rootNav.routes', []))

const getToken = ({ userProfile }) => {
  return userProfile.token
}

const getSearchMetaInfo = state => state.plans.searchMeta || {}

const getSelectedKey = (state) => {
  return get(state, 'plans.selected', null)
}

const getSelectedPlan = (state) => {
  const selected = get(state, 'plans.selected', '')
  return get(state, `plans.list.${selected}`, null)
}

const getPlanByKey = (state,key) => {
  return get(state, `plans.list.${key}`, null)
}

const getFlightInfofromSearchResult = (state, { id, codeshareId }) => {
  const flight = get(state, `plans.searchResult.flights.${id}`)
  const codeshareFlight = get(state, `plans.searchResult.codeshareFlights.${codeshareId}`)
  return {
    flight: flight,
    codeshareFlight: codeshareFlight
  }
}

// const localizeDate = (date) => {
//   return moment.utc(moment(date).subtract('8', 'hours').format("YYYY-MM-DD HH:mm:ss")).local()
// }
// console.log(date);
  // console.log(moment(date).toDate())
  // console.log(moment(date).subtract('8', 'hours').format("YYYY-MM-DD HH:mm:ss"))
  // console.log(moment.utc(moment(date).subtract('8', 'hours').format("YYYY-MM-DD HH:mm:ss")).local().toDate())
  // return moment(date).subtract('8', 'hours').local()

const filterUnavailableFlights = (data) => {
  try {
    return data.filter(flight => {
      /*if (isEmpty(flight.statusCode)) {
        return false
      }*/
      if (flightStatusCodes.FLIGHT_CLOSED.includes(data.statusCode)) {
        return false
      }
      if (flight.leg === 'A') {
        const now = moment(localizeDate(new Date()));
        const flightTime = moment(localizeDate(flight.flightTime))
        var duration = moment.duration(now.diff(flightTime)).asHours()
        if (isNaN(duration)) {
          return false;
        }
        if (duration > 4) {
          return false;
        }
        if ([flightStatusCodes.FLIGHT_CANCELLED].includes(flight.statusCode)) {
          return false;
        }
      } else {
        if ([flightStatusCodes.FLIGHT_DEPARTED, flightStatusCodes.FLIGHT_CANCELLED].includes(flight.statusCode)) {
          return false;
        }
      }
      return true;
    })
  } catch (e) {
    return []
  }
}

const removeUnrelatedFlights = (codeshareFlights, selectedFlightNo) => {
  const result = {}
  forEach(codeshareFlights, (f, key) => {
    const flightNo = f.flightNumber.replace(' ', '').toLowerCase()
    if (!flightNo.includes(selectedFlightNo.replace(' ', '').toLowerCase())) {
      set(result, key, f)
    }
  })

  return result
}

const getUserToken = state => get(state, 'userProfile.token', '')
const getPreviewStatus = state => state.preview

function* searchFlight({ payload, meta }) {
  try {
    const URL = getFlightDetails + `?flightnumber=` + encodeURI(payload)
    const userToken = yield select(getUserToken)
    const isPreviewEnabled = yield select(getPreviewStatus)
    console.log(URL)
    let data = []
    if (!isPreviewEnabled) {
      data = yield call(fetch, URL)
    } else {
      data = yield call(fetch, URL, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'x-api-type': 'mahb'
        },
        method: 'GET'
      })
    }
    if (isError(data)) {
      yield put(actions.searchFlightFailed(data))
      return;
    } else if (!isEmpty(data)) {
      // filter out flights
      const filteredData = filterUnavailableFlights(get(data, 'flightStatuses', []))
      const { entities = {}, result } = normalizeFlightStatuses(filteredData)
      if (result.length > 0) {
        yield put(actions.searchFlightSucceeded(entities, meta))
      } else {
        yield put(actions.searchFlightFailed(new Error('no result')))
      }
    } else {
      yield put(actions.searchFlightFailed(new Error('no result')))
    }
  } catch (e) {
    console.log(e)
    yield put(actions.searchFlightFailed(e))
  }
}

function* createTransitPlan({ payload }) {
  const flightInfo = payload.flightInfo

  if (true) {
    const plan = getDefaultPlan(flightInfo)
    const { barcodeData = {} } = yield select(getSearchMetaInfo)
    const bagsInfo = payload.bagsInfo

    set(plan, 'type', 'transit_to_place')
    yield put(actions.createTransitPlanSucceeded(plan, barcodeData, bagsInfo))
  } else {
    // deal with login user later
  }
}

function* createPlan({ payload }) {
  // const token = yield select(getToken)
  let flightInfo = payload.planData;
  if (!flightInfo) flightInfo = yield select(getFlightInfofromSearchResult, payload)
  //if (!token || token.length === 0) {
  if (true) {
    const plan = getDefaultPlan(flightInfo)
    const { barcodeData = {} } = yield select(getSearchMetaInfo)

    const flightType = get(flightInfo, 'flight.leg')
    switch (flightType) {
      case 'D':
        const { status, location, terminal } = yield call(isInsideAirport)
        // TODO: check terminal too?
        set(plan, 'type', status ? 'airport_to_gate' : 'home_to_gate')
        break
      case 'A':
        set(plan, 'type', 'gate_to_place')
        break
      default:
        break
    }
    // TODO: set origin/destination in here based on type of fight and terminal of gate
    yield put(actions.createPlanSucceeded(plan, barcodeData))
  } else {
    // deal with login user later
  }
}

function* checkPlanExisted({ payload }) {
  const { flightNo } = payload.details
  const plan = yield select(getPlanWithFlightNo, flightNo)
  if (!isEmpty(plan)) {
    // do nothing
  } else {
    yield put(actions.createPlan(flightNo))
  }
}

function* getDirection({ origin = '', destination = '', mode }) {
  const URL = googleDirectionsURL + `?key=${GOOGLE_MAPS_GEOCODING_APIKEY}` + `&origin=place_id:${origin}` + `&destination=place_id:${destination}` + `&mode=${mode}`
  const userToken = yield select(getUserToken)
  const isPreviewEnabled = yield select(getPreviewStatus)
  try {
    let data = []
    if (!isPreviewEnabled) {
      data = yield call(fetch, URL)
    } else {
      data = yield call(fetch, URL, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'x-api-type': 'mahb'
        },
        method: 'GET'
      })
    }
    if (isError(data)) {
      return { error: data.message }
    }
    if (isEmpty(data)) {
      return { error: 'no_response' }
    } else if (!isEmpty(data) && get(data, 'status') === 'OK' && !isEmpty(get(data, 'routes.0.legs'))) {
      return get(data, 'routes.0.legs')
    } else if (!isEmpty(get(data, 'status'))) {
      return { error: data.status }
    } else {
      return { error: 'unknown' }
    }
  } catch (e) {
    console.log(e)
    return { error: e.message }
  }
}

const getParkingFromState = state => {
  const unfiltered = get(state, 'terminal.unfiltered.contentBlocks', [])
  return unfiltered.filter(poi => poi.subCategory === 'Parking')
}

function* getParking() {
  try {
    const userToken = yield select(getUserToken)
    const isPreviewEnabled = yield select(getPreviewStatus)
    let data = []
    if (!isPreviewEnabled) {
      data = yield call(fetch, getParkingPlaces)
    } else {
      data = yield call(fetch, getParkingPlaces, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'x-api-type': 'mahb'
        },
        method: 'GET'
      })
    }
    if (isError(data)) {
      return { error: data.message }
    }
    if (data && isArray(data) && !isEmpty(data)) {
      return data
    } else {
      return []
    }
  } catch (e) {
    return  []
  }
}

const getCarRentalFromState = state => {
  const unfiltered = get(state, 'terminal.unfiltered.contentBlocks', [])
  return unfiltered.filter(poi => poi.subCategory === "Car_Rental")
}

function* getCarRental() {
  try {
    const data = yield select(getCarRentalFromState)
    return data
    /*const data = yield call(fetch, getCarRentalServices)
    if (isError(data)) {
      return { error: data.message }
    }
    if (data && isArray(data) && !isEmpty(data)) {
      return data
    } else {
      return { error: 'unknown' }
    }*/
  } catch (e) {
    return []
  }
}

function* getTravelingOptions() {
  const plan = yield select(getSelectedPlan)
  if (!isEmpty(plan)) {
    const { id } = plan
    const { origin, destination } = get(plan, 'gettingThere', {})
    if (id && !isEmpty(origin) && !isEmpty(destination)) {
      const travelingOptions = yield all({
        transit: call(getDirection, {
          origin: get(origin, 'place_id'),
          destination: get(destination, 'place_id'),
          mode: 'transit'
        }),
        driving: call(getDirection, {
          origin: get(origin, 'place_id'),
          destination: get(destination, 'place_id'),
          mode: 'driving'
        })
      })
      yield put(actions.setGettingThereSupportData(id, travelingOptions))
    }
  }
}

function* getTransportTravelingOptions({ payload }) {
  const { origin, destination, isHomeToGate = false } = payload
  if (!isEmpty(origin) && !isEmpty(destination)) {
    const travelingOptions = yield all({
      transit: call(getDirection, {
        origin: get(origin, 'place_id'),
        destination: get(destination, 'place_id'),
        mode: 'transit'
      }),
      driving: call(getDirection, {
        origin: get(origin, 'place_id'),
        destination: get(destination, 'place_id'),
        mode: 'driving'
      }),
      parking: call(getParking),
      carRental: call(getCarRental),
      request: {
        origin: origin,
        destination: destination,
        isHomeToGate: isHomeToGate
      }
    })
    yield put(actions.setTransportTravelingOptions(travelingOptions))
  } else {
    let travelingOptions = null
    if (!isEmpty(origin) || !isEmpty(destination)) {
      travelingOptions = {
        request: {
          origin: origin,
          destination: destination,
          isHomeToGate: isHomeToGate
        }
      }
    }
    yield put(actions.setTransportTravelingOptions(travelingOptions))
  }
}

function* handleBarcodeReceived({ payload }) {
  const { airlineCode = '', flightNumber = '' } = payload
  const searchNumber = `${airlineCode} ${flightNumber}`
  yield put(actions.searchFlight(searchNumber, payload))
}

function* resetPlan({ payload }) {
  const { routeName } = yield select(getLastRoute)
  if (routeName === 'BoardingPassForm') {
    yield put(actions.removeCurrentPlan())
  }
}

function* updateState({ payload, meta }) {
  if (meta === 'plans') {
    yield put(actions.setState(payload))
  }
}

function* postSurveyData({ payload, meta }) {
  const { planId } = meta
  const isPreviewEnabled = yield select(getPreviewStatus)
  try {
    const plan = yield select(getSelectedPlan)
    const token = yield select(getToken)
    const { flightNumber } = plan.flightInfo.codeshareFlight
    const requestBody = JSON.stringify({
      ...payload,
      JourneyDetail: { flightNumber: flightNumber }
    })
    const result = []
    if (!isPreviewEnabled) {
      result = yield call(fetch, postSurvey, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: "POST",
        body: requestBody
      })
    } else {
      result = yield call(fetch, postSurvey, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-api-type': 'mahb'
        },
        method: "POST",
        body: requestBody
      })
    }
    if (isError(result)) {
      yield put(actions.postSurveyFailed(planId, result))
    } else if (!get(result, 'success', false)) {
      yield put(actions.postSurveyFailed(planId, new Error('failed to set')))
    } else {
      yield put(actions.postSurveySucceeded(planId, payload))
    }
  } catch (e) {
    console.log(e)
    yield put(actions.postSurveyFailed(planId, e))
  }
}

function* submitRating({ payload, meta }) {
  const { planId } = meta
  const { flightNumber, afsKey } = payload
  try {
    const token = yield select(getToken)
    const isPreviewEnabled = yield select(getPreviewStatus)
    const result = []
    if (!isPreviewEnabled) {
      result = yield call(fetch, postSurvey, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({
          ...payload,
          JourneyDetail: {
            flightNumber: flightNumber,
            afsKey: afsKey
          }
        })
      })
    } else {
      result = yield call(fetch, postSurvey, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-api-type': 'mahb'
        },
        method: "POST",
        body: JSON.stringify({
          ...payload,
          JourneyDetail: {
            flightNumber: flightNumber,
            afsKey: afsKey
          }
        })
      })
    }
    if (isError(result)) {
      throw result
    } else if (!get(result, 'success', false)) {
      throw new Error('failed to set')
    } else {
      yield put(actions.rateSucceeded(planId, payload))
    }
  } catch (e) {
    console.log(e)
    yield put(actions.rateFailed(planId, e))
  }
}


function* updatePlan({payload}) {
  let key = null;
  let plan = null;
  if (payload) {
    key = payload.toString();
    plan = yield select(getPlanByKey, key)
  } else {
    const { routeName, params = {} } = yield select(getLastRoute)
    if (routeName !== 'BoardingPlan' && routeName !== 'HelpPlanMyTrip') {
      return false
    }
    key = yield select(getSelectedKey)
    plan = yield select(getSelectedPlan)
    if (isEmpty(plan)) {
      const { id, codeshareId, planData } = params
      yield put(actions.createPlan(id, codeshareId, planData))
      return;
    }
  }
  try {
    const id = plan.flightInfo.flight.afsKey
    const codeshareId = plan.flightInfo.codeshareFlight.afsKey
    const URL =  getFlightDetails+ `?afsKey=${codeshareId}`
    const userToken = yield select(getUserToken)
    const isPreviewEnabled = yield select(getPreviewStatus)

    let data = []
    if (!isPreviewEnabled) {
      data = yield call(fetch, URL)
    } else {
      data = yield call(fetch, URL, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'x-api-type': 'mahb'
        },
        method: 'GET'
      })
    }
    if (isError(data)) {
      yield put(actions.refreshPlanFailed(data))
      return;
    } else if (!isEmpty(data)) {
      const count = data.count;
      if (count!=null && count!=undefined && count==0) {
          // yield put(actions.refreshPlanExpired(key.toString()))
          return;
      }
      const { entities = {}, result } = normalizeFlightStatuses(get(data, 'flightStatuses', []))
      if (result.length > 0) {
        const codeshareFlight = get(entities.codeshareFlights, codeshareId)
        const flight = get(entities.flights, id)
        if (!isEmpty(flight) && !isEmpty(codeshareFlight)) {
          yield put(actions.refreshPlanSucceeded({id:plan.id, flightInfo: {
            flight: flight,
            codeshareFlight: codeshareFlight
          }}))
        } else {
          yield put(actions.refreshPlanFailed(new Error('no result 01')))
        }
      } else {
        yield put(actions.refreshPlanFailed(new Error('no result 02')))
      }
    } else {
      yield put(actions.refreshPlanFailed(new Error('No flight found')))
    }
  } catch (e) {
    yield put(actions.refreshPlanFailed(e))
  }
}

const checkUserExisted = state => !isEmpty(state, 'userProfile.token')

function* updateSignUpSignInModalState() {
  yield take(actionTypes.rootNav.ON_TRANSITION_END) // wait til transition completed
  const isUserExisted = yield select(checkUserExisted)
  yield put(actions.askedForSignUp(!isUserExisted))
}

export function* watchPlans() {
  yield takeLatest(actionTypes.plans.ON_BARCODE_RECEIVED, handleBarcodeReceived)
  yield takeLatest(actionTypes.plans.SEARCH_FLIGHT, searchFlight)
  yield takeLatest(actionTypes.plans.CREATE_PLAN, createPlan)
  yield takeLatest(actionTypes.plans.SET_GETTING_THERE_ORIGIN, getTravelingOptions)
  yield takeLatest(actionTypes.plans.SET_GETTING_THERE_DESTINATION, getTravelingOptions)
  yield takeLatest(actionTypes.plans.POST_SURVEY, postSurveyData)
  yield takeLatest(actionTypes.plans.RATE_CHECKIN, submitRating)
  yield takeLatest(actionTypes.plans.RATE_IMMIGRATION, submitRating)
  yield takeLatest(actionTypes.plans.RATE_BOARDING_GATE, submitRating)
  yield takeEvery(actionTypes.plans.CREATE_PLAN_SUCCEEDED, updateSignUpSignInModalState)
  yield takeLatest(actionTypes.plans.REFRESH_PLAN, updatePlan)
  yield takeEvery(actionTypes.plans.CREATE_TRANSIT_PLAN, createTransitPlan)
}

export function* watchRootnav() {
  yield takeEvery(actionTypes.rootNav.ON_TRANSITION_END, updatePlan)
}

export function* watchStorage() {
  yield takeEvery(actionTypes.storage.LOAD_DATA_SUCCEEDED, updateState)
}