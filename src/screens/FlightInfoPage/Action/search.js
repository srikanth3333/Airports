import { createAction } from 'redux-actions'

import { search } from '../ActionType/search';

export const searchFlightsByCity = createAction(search.SEARCH_FLIGHTS_BY_CITY)
export const searchFlightsByCitySucceeded = createAction(search.SEARCH_FLIGHTS_BY_CITY_SUCCEEDED)
export const searchFlightsByCityFailed = createAction(search.SEARCH_FLIGHTS_BY_CITY_FAILED)

export const searchFlightsByAirline = createAction(search.SEARCH_FLIGHTS_BY_AIRLINE)
export const searchFlightsByAirlineSucceeded = createAction(search.SEARCH_FLIGHTS_BY_AIRLINE_SUCCEEDED)
export const searchFlightsByAirlineFailed = createAction(search.SEARCH_FLIGHTS_BY_AIRLINE_FAILED)

export const searchFlightsByFlightNumber = createAction(search.SEARCH_FLIGHTS_BY_FLIGHT_NUMBER)
export const searchFlightsByFlightNumberSucceeded = createAction(search.SEARCH_FLIGHTS_BY_FLIGHT_NUMBER_SUCCEEDED)
export const searchFlightsByFlightNumberFailed = createAction(search.SEARCH_FLIGHTS_BY_FLIGHT_NUMBER_FAILED)

export const fetchFlightMetadata = createAction(search.FETCH_FLIGHT_METADATA)
export const fetchFlightMetadataSucceeded = createAction(search.FETCH_FLIGHT_METADATA_SUCCEEDED)
export const fetchFlightMetadataFailed = createAction(search.FETCH_FLIGHT_METADATA_FAILED)

export const clearSearchResults = createAction(search.CLEAR_SEARCH_RESULTS)

export const selectSearchFlight = createAction(search.SELECT_SEARCH_FLIGHT)