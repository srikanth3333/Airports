import { handleActions } from 'redux-actions'
import { get, set, cloneDeep } from 'lodash'

import { search as actionTypes } from '../ActionType/search';

const initialState = {
  flightMetadata: {},
  flightMetadataCheckSum: '',
  flightSearchResults: {},
  searchError: null,
  isSearchByFlightNumber: false
}

export default handleActions({
  [actionTypes.CLEAR_SEARCH_RESULTS]: (state, { payload }) => {
    return {
      ...state,
      flightSearchResults: {},
      searchError: null,
      isSearchByFlightNumber: false
    }
  },
  [actionTypes.FETCH_FLIGHT_METADATA_SUCCEEDED]: (state, { payload }) => {
    const checkSum = get(payload, 'checkSum', '')
    return {
      ...state,
      flightMetadataCheckSum: checkSum,
      flightMetadata: payload
    }
  },
  [actionTypes.SEARCH_FLIGHTS_BY_AIRLINE_SUCCEEDED]: (state, { payload }) => {
    return {
      ...state,
      flightSearchResults: payload,
      searchError: null,
      isSearchByFlightNumber: false
    }
  },
  [actionTypes.SEARCH_FLIGHTS_BY_AIRLINE_FAILED]: (state, { payload }) => {
    return {
      ...state,
      flightSearchResults:  {},
      searchError: payload.toString(),
      isSearchByFlightNumber: false
    }
  },
  [actionTypes.SEARCH_FLIGHTS_BY_FLIGHT_NUMBER_SUCCEEDED]: (state, { payload }) => {
    return {
      ...state,
      flightSearchResults: payload,
      searchError: null,
      isSearchByFlightNumber: true
    }
  },
  [actionTypes.SEARCH_FLIGHTS_BY_FLIGHT_NUMBER_FAILED]: (state, { payload }) => {
    return {
      ...state,
      flightSearchResults:  {},
      searchError: payload.toString(),
      isSearchByFlightNumber: false
    }
  },
  [actionTypes.SEARCH_FLIGHTS_BY_CITY_SUCCEEDED]: (state, { payload }) => {
    return {
      ...state,
      flightSearchResults: payload,
      searchError: null,
      isSearchByFlightNumber: false
    }
  },
  [actionTypes.SEARCH_FLIGHTS_BY_CITY_FAILED]: (state, { payload }) => {
    return {
      ...state,
      flightSearchResults:  {},
      searchError: payload.toString(),
      isSearchByFlightNumber: false
    }
  },
}, initialState)