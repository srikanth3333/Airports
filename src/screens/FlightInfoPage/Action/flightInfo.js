import { createAction } from 'redux-actions'

import { flightInfo } from '../ActionType/flightInfo';

export const setTerminal = createAction(flightInfo.SET_TERMINAL)

export const fetchArrivals = createAction(flightInfo.FETCH_ARRIVALS)
export const fetchDepartures = createAction(flightInfo.FETCH_DEPARTURES)
export const fetchArrivalsFulfilled = createAction(flightInfo.FETCH_ARRIVALS_FULFILLED,
  (data, count) => data,
  (data, count) => ({ count: count || 0 })
)
export const fetchDeparturesFulfilled = createAction(flightInfo.FETCH_DEPARTURES_FULFILLED,
  (data, count) => data,
  (data, count) => ({ count: count || 0 })
)
export const fetchArrivalsFailed = createAction(flightInfo.FETCH_ARRIVALS_FAILED)
export const fetchDeparturesFailled = createAction(flightInfo.FETCH_DEPARTURES_FAILED)
export const fetchFlight = createAction(flightInfo.FETCH_FLIGHT,
  (id, codeshareId) => ({
    id: id,
    codeshareId: codeshareId
  }))
export const fetchFlightSucceeded = createAction(flightInfo.FETCH_FLIGHT_SUCCEEDED,
  (data, id, codeshareId) => data,
  (data, id, codeshareId) => ({
    id: id,
    codeshareId: codeshareId
  })
)
export const fetchFlightExpired = createAction(flightInfo.FETCH_FLIGHT_EXPIRED)
export const fetchFlightFailed = createAction(flightInfo.FETCH_FLIGHT_FAILED)
export const clearData = createAction(flightInfo.CLEAR_DATA)
export const fetchTailImages = createAction(flightInfo.FETCH_TAIL_IMAGES)
export const fetchTailImagesSucceeded = createAction(flightInfo.FETCH_TAIL_IMAGES_SUCCEEDED)
export const fetchTailImagesFailed = createAction(flightInfo.FETCH_TAIL_IMAGES_FAILED)

export const fetchPrevArrivals = createAction(flightInfo.FETCH_PREV_ARRIVALS)
export const fetchPrevDepartures = createAction(flightInfo.FETCH_PREV_DEPARTURES)
export const fetchPrevArrivalsFulfilled = createAction(flightInfo.FETCH_PREV_ARRIVALS_FULFILLED,
  (data, count) => data,
  (data, count) => ({ count: count || 0 })
)
export const fetchPrevDeparturesFulfilled = createAction(flightInfo.FETCH_PREV_DEPARTURES_FULFILLED,
  (data, count) => data,
  (data, count) => ({ count: count || 0 })
)
export const fetchPrevArrivalsFailed = createAction(flightInfo.FETCH_PREV_ARRIVALS_FAILED)
export const fetchPrevDeparturesFailled = createAction(flightInfo.FETCH_PREV_DEPARTURES_FAILED)