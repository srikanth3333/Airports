import { handleActions } from 'redux-actions'
import { get, size, set, forEach, isEmpty } from 'lodash'

import { flightInfo } from './../actionTypes'

export const TIME_BOUND_BY_MINUTES = {
  ARRIVAL: {
    from: -480,
    to: -240
  },
  DEPARTURE: {
    from: -250,
    to: -10
  },
  QUERY_SIZE: 240,
  MIN_ARRIVAL_FROM: -480,
  MIN_DEPARTURE_FROM: -250
}

const intialState = {
  arrival: {},
  departure: {},
  codeshare_arrival: {},
  codeshare_departure: {},
  arrivalTotal: 0,
  arrivalSkip: 0,
  departureTotal: 0,
  departureSkip: 0,
  lastRequest: null,
  tailImages: {},
  requestError: null,
  detailRequestError: null,
  flightUnavailable: null,
  prevArrivalBounds: { ...TIME_BOUND_BY_MINUTES.ARRIVAL },
  prevDepartureBounds: { ...TIME_BOUND_BY_MINUTES.DEPARTURE }
}

/* Apply special merge since getFlightDetails API does not reflect all codeshare flights */
/* So we retain the codeshare list of originalList while updating other info */
const mergedFlights = (originalList, list = {}) => {
  forEach(list, (value, key) => {
    const originalValue = get(originalList, key)
    if (!isEmpty(originalValue) && !isEmpty(originalValue.codeShareFlights)) {
      set(value, 'codeShareFlights', originalValue.codeShareFlights)
    }
  })
  return {
    ...originalList,
    ...list
  }
}

export default handleActions({
    [flightInfo.FETCH_DEPARTURES]: (state) => {
      return {
        ...state,
        lastRequest: null,
        requestError: null
      }
    },
    [flightInfo.FETCH_ARRIVALS]: (state) => {
      return {
        ...state,
        lastRequest: null,
        requestError: null
      }
    },
    [flightInfo.FETCH_FLIGHT]: (state) => {
      return {
        ...state,
        lastRequest: null,
        requestError: null,
        flightUnavailable: null
      }
    },
    [flightInfo.FETCH_DEPARTURES_FULFILLED]: (state, { payload, meta }) => {
      const departure = {
        ...state.departure,
        ...payload.flights
      }
      const codeshare_departure = {
        ...state.codeshare_departure,
        ...payload.codeshareFlights
      }
      return {
        ...state,
        departure: departure,
        codeshare_departure: codeshare_departure,
        departureSkip: size(departure),
        departureTotal: meta.count || size(departure),
        lastRequest: new Date().toISOString(),
        requestError: null
      }
    },
    [flightInfo.FETCH_ARRIVALS_FULFILLED]: (state, { payload, meta }) => {
      const arrival = {
        ...state.arrival,
        ...payload.flights
      }
      const codeshare_arrival = {
        ...state.codeshare_arrival,
        ...payload.codeshareFlights
      }
      return {
        ...state,
        arrival: arrival,
        codeshare_arrival: codeshare_arrival,
        arrivalSkip: size(arrival),
        arrivalTotal: meta.count || size(arrival),
        lastRequest: new Date().toISOString(),
        requestError: null
      }
    },
    [flightInfo.FETCH_ARRIVALS_FAILED]: (state, { payload }) => {
      return {
        ...state,
        lastRequest: new Date().toISOString(),
        requestError: get(payload, 'message', '')
      }
    },
    [flightInfo.FETCH_DEPARTURES_FAILED]: (state, { payload }) => {
      return {
        ...state,
        lastRequest: new Date().toISOString(),
        requestError: get(payload, 'message', '')
      }
    },
    [flightInfo.FETCH_FLIGHT_SUCCEEDED]: (state, { payload, meta }) => {
      const { flights, codeshareFlights } = payload
      const { id, codeshareId } = meta
      const flight = get(flights, ((id && id != 0) ? id : codeshareId))
      const leg = get(flight, 'leg')
      switch (leg) {
        case 'A':
          return {
            ...state,
            arrival: mergedFlights(state.arrival, flights),
            codeshare_arrival: {
              ...state.codeshare_arrival,
              ...codeshareFlights
            },
            requestError: null,
            flightUnavailable: false
          }
        case 'D':
          return {
            ...state,
            departure: mergedFlights(state.departure, flights),
            codeshare_departure: {
              ...state.codeshare_departure,
              ...codeshareFlights
            },
            requestError: null,
            detailRequestError: null,
            flightUnavailable: false
          }
        default:
          return state
      }
      return state
    },
    [flightInfo.FETCH_FLIGHT_EXPIRED]: (state, { payload }) => {
      return {
        ...state,
        lastRequest: new Date().toISOString(),
        detailRequestError: null,
        flightUnavailable: true
      }
    },
    [flightInfo.FETCH_FLIGHT_FAILED]: (state, { payload }) => {
      return {
        ...state,
        lastRequest: new Date().toISOString(),
        detailRequestError: get(payload, 'message', '')
      }
    },
    [flightInfo.CLEAR_DATA]: (state, { payload }) => {
      return {
        ...intialState,
        tailImages: state.tailImages || initialState.tailImages
      }
    },
    [flightInfo.FETCH_TAIL_IMAGES_SUCCEEDED]: (state, { payload }) => {
      return {
        ...state,
        tailImages: payload
      }
    },
    [flightInfo.FETCH_PREV_DEPARTURES]: (state) => {
      return {
        ...state,
        lastRequest: null,
        requestError: null
      }
    },
    [flightInfo.FETCH_PREV_ARRIVALS]: (state) => {
      return {
        ...state,
        lastRequest: null,
        requestError: null
      }
    },
    [flightInfo.FETCH_PREV_DEPARTURES_FULFILLED]: (state, { payload, meta }) => {
      const departure = {
        ...state.departure,
        ...payload.flights
      }
      const codeshare_departure = {
        ...state.codeshare_departure,
        ...payload.codeshareFlights
      }
      return {
        ...state,
        departure: departure,
        codeshare_departure: codeshare_departure,
        departureSkip: size(departure),
        departureTotal: meta.count || size(departure),
        lastRequest: new Date().toISOString(),
        requestError: null,
        prevDepartureBounds: {
          from: state.prevDepartureBounds.from - TIME_BOUND_BY_MINUTES.QUERY_SIZE,
          to: state.prevDepartureBounds.from
        }
      }
    },
    [flightInfo.FETCH_PREV_ARRIVALS_FULFILLED]: (state, { payload, meta }) => {
      const arrival = {
        ...state.arrival,
        ...payload.flights
      }
      const codeshare_arrival = {
        ...state.codeshare_arrival,
        ...payload.codeshareFlights
      }
      return {
        ...state,
        arrival: arrival,
        codeshare_arrival: codeshare_arrival,
        arrivalSkip: size(arrival),
        arrivalTotal: meta.count || size(arrival),
        lastRequest: new Date().toISOString(),
        requestError: null,
        prevArrivalBounds: {
          from: state.prevArrivalBounds.from - TIME_BOUND_BY_MINUTES.QUERY_SIZE,
          to: state.prevArrivalBounds.from
        }
      }
    },
    [flightInfo.FETCH_PREV_ARRIVALS_FAILED]: (state, { payload }) => {
      return {
        ...state,
        lastRequest: new Date().toISOString()
      }
    },
    [flightInfo.FETCH_PREV_DEPARTURES_FAILED]: (state, { payload }) => {
      return {
        ...state,
        lastRequest: new Date().toISOString()
      }
    },
  }, intialState)