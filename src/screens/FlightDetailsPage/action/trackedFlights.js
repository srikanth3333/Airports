import { createAction } from 'redux-actions'

import { trackedFlights } from '../actiontypes'

export const trackFlight = createAction(trackedFlights.TRACK_FLIGHT)
export const untrackFlight = createAction(trackedFlights.UNTRACK_FLIGHT)
export const refreshTrackedFlight = createAction(trackedFlights.REFRESH_TRACKED_FLIGHT)
export const refreshTrackedFlightSucceeded = createAction(trackedFlights.REFRESH_TRACKED_FLIGHT_SUCCEEDED)
export const refreshTrackedFlightExpired = createAction(trackedFlights.REFRESH_TRACKED_FLIGHT_EXPIRED)
export const refreshTrackedFlightFailed = createAction(trackedFlights.REFRESH_TRACKED_FLIGHT_FAILED)

export const saveMyFlightSucceeded = createAction(trackedFlights.SAVE_MY_FLIGHT_SUCCEEDED)
export const saveMyFlightFailed = createAction(trackedFlights.SAVE_MY_FLIGHT_FAILED)

export const deleteMyFlightSucceeded = createAction(trackedFlights.DELETE_MY_FLIGHT_SUCCEEDED)
export const deleteMyFlightFailed = createAction(trackedFlights.DELETE_MY_FLIGHT_FAILED)

export const editMyFlight = createAction(trackedFlights.EDIT_MY_FLIGHT)
export const editMyFlightSucceeded = createAction(trackedFlights.EDIT_MY_FLIGHT_SUCCEEDED)
export const editMyFlightFailed = createAction(trackedFlights.EDIT_MY_FLIGHT_FAILED)
export const getMyFlights = createAction(trackedFlights.GET_MY_FLIGHTS)
export const getMyFlightsSucceeded = createAction(trackedFlights.GET_MY_FLIGHTS_SUCCEEDED)
export const getMyFlightsFailed = createAction(trackedFlights.GET_MY_FLIGHTS_FAILED)
export const reset = createAction(trackedFlights.RESET)