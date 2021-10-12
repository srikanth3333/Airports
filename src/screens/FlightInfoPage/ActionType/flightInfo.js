const prefix = 'flightInfo'

let FETCH_DEPARTURES = `${prefix}/fetchDepartures`
let FETCH_DEPARTURES_FULFILLED = `${prefix}/fetchDepartures_FULFILLED`
let FETCH_DEPARTURES_FAILED = `${prefix}/fetchDepartureFailed`
let FETCH_ARRIVALS = `${prefix}/fetchArrivals`
let FETCH_ARRIVALS_FULFILLED = `${prefix}/fetchArrivals_FULFILLED`
let FETCH_ARRIVALS_FAILED = `${prefix}/fetchArrivalsFailed`
let FETCH_FLIGHT = `${prefix}/fetchFlight`
let FETCH_FLIGHT_SUCCEEDED = `${prefix}/fetchFlightSucceeded`
let FETCH_FLIGHT_EXPIRED = `${prefix}/fetchFlightExpired`
let FETCH_FLIGHT_FAILED = `${prefix}/fetchFlightFailed`
let CLEAR_DATA = `${prefix}/clearData`
let FETCH_TAIL_IMAGES = `${prefix}/fetchTailImages`
let FETCH_TAIL_IMAGES_SUCCEEDED = `${prefix}/fetchTailImagesSucceeded`
let FETCH_TAIL_IMAGES_FAILED = `${prefix}/fetchTailImagesFailed`
let SET_TERMINAL = `${prefix}/setTerminal`

let FETCH_PREV_DEPARTURES = `${prefix}/fetchPrevDepartures`
let FETCH_PREV_DEPARTURES_FULFILLED = `${prefix}/fetchPrevDepartures_FULFILLED`
let FETCH_PREV_DEPARTURES_FAILED = `${prefix}/fetchPrevDepartureFailed`
let FETCH_PREV_ARRIVALS = `${prefix}/fetchPrevArrivals`
let FETCH_PREV_ARRIVALS_FULFILLED = `${prefix}/fetchPrevArrivals_FULFILLED`
let FETCH_PREV_ARRIVALS_FAILED = `${prefix}/fetchPrevArrivalsFailed`

export const flightInfo = {
  FETCH_DEPARTURES,
  FETCH_DEPARTURES_FULFILLED,
  FETCH_DEPARTURES_FAILED,
  FETCH_ARRIVALS,
  FETCH_ARRIVALS_FULFILLED,
  FETCH_ARRIVALS_FAILED,
  FETCH_FLIGHT,
  FETCH_FLIGHT_SUCCEEDED,
  FETCH_FLIGHT_EXPIRED,
  FETCH_FLIGHT_FAILED,
  CLEAR_DATA,
  FETCH_TAIL_IMAGES,
  FETCH_TAIL_IMAGES_SUCCEEDED,
  FETCH_TAIL_IMAGES_FAILED,

  FETCH_PREV_DEPARTURES,
  FETCH_PREV_DEPARTURES_FULFILLED,
  FETCH_PREV_DEPARTURES_FAILED,
  FETCH_PREV_ARRIVALS,
  FETCH_PREV_ARRIVALS_FULFILLED,
  FETCH_PREV_ARRIVALS_FAILED,
  SET_TERMINAL
}