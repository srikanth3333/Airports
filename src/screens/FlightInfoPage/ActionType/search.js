const prefix = 'search'

let SEARCH_FLIGHTS_BY_CITY = `${prefix}/searchFlightsByCity`
let SEARCH_FLIGHTS_BY_CITY_SUCCEEDED = `${prefix}/searchFlightsByCitySucceeded`
let SEARCH_FLIGHTS_BY_CITY_FAILED = `${prefix}/searchFlightsByCityFailed`
let SEARCH_FLIGHTS_BY_AIRLINE = `${prefix}/searchFlightsByAirline`
let SEARCH_FLIGHTS_BY_AIRLINE_SUCCEEDED = `${prefix}/searchFlightsByAirlineSucceeded`
let SEARCH_FLIGHTS_BY_AIRLINE_FAILED = `${prefix}/searchFlightsByAirlineFailed`
let SEARCH_FLIGHTS_BY_FLIGHT_NUMBER = `${prefix}/searchFlightsByFlightNumber`
let SEARCH_FLIGHTS_BY_FLIGHT_NUMBER_SUCCEEDED = `${prefix}/searchFlightsByFlightNumberSucceeded`
let SEARCH_FLIGHTS_BY_FLIGHT_NUMBER_FAILED = `${prefix}/searchFlightsByFlightNumberFailed`
let FETCH_FLIGHT_METADATA = `${prefix}/fetchFlightMetadata`
let FETCH_FLIGHT_METADATA_SUCCEEDED = `${prefix}/fetchFlightMetadataSucceeded`
let FETCH_FLIGHT_METADATA_FAILED = `${prefix}/fetchFlightMetadataFailed`
let CLEAR_SEARCH_RESULTS = `${prefix}/clearSearchResults`
let SELECT_SEARCH_FLIGHT = `${prefix}/selectSearchFlight`

export const search = {
  SEARCH_FLIGHTS_BY_CITY,
  SEARCH_FLIGHTS_BY_CITY_SUCCEEDED,
  SEARCH_FLIGHTS_BY_CITY_FAILED,
  SEARCH_FLIGHTS_BY_AIRLINE,
  SEARCH_FLIGHTS_BY_AIRLINE_SUCCEEDED,
  SEARCH_FLIGHTS_BY_AIRLINE_FAILED,
  SEARCH_FLIGHTS_BY_FLIGHT_NUMBER,
  SEARCH_FLIGHTS_BY_FLIGHT_NUMBER_SUCCEEDED,
  SEARCH_FLIGHTS_BY_FLIGHT_NUMBER_FAILED,
  FETCH_FLIGHT_METADATA,
  FETCH_FLIGHT_METADATA_SUCCEEDED,
  FETCH_FLIGHT_METADATA_FAILED,
  CLEAR_SEARCH_RESULTS,
  SELECT_SEARCH_FLIGHT
}