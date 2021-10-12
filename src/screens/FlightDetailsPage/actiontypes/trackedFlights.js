const prefix = 'trackedFlights'

export const TRACK_FLIGHT = `${prefix}/trackFlight`
export const UNTRACK_FLIGHT = `${prefix}/untrackFlight`
export const REFRESH_TRACKED_FLIGHT = `${prefix}/refreshTrackedFlight`
export const REFRESH_TRACKED_FLIGHT_SUCCEEDED = `${prefix}/refreshTrackedFlightSucceeded`
export const REFRESH_TRACKED_FLIGHT_EXPIRED = `${prefix}/refreshTrackedFlightExpired`
export const REFRESH_TRACKED_FLIGHT_FAILED = `${prefix}/refreshTrackedFlightFailed`

export const SAVE_MY_FLIGHT_SUCCEEDED = `${prefix}/saveMyFlightSucceeded`
export const SAVE_MY_FLIGHT_FAILED = `${prefix}/saveMyFlightFailed`
export const DELETE_MY_FLIGHT_SUCCEEDED = `${prefix}/deleteMyFlightSucceeded`
export const DELETE_MY_FLIGHT_FAILED = `${prefix}/deleteMyFlightFailed`
export const EDIT_MY_FLIGHT = `${prefix}/editMyFlight`
export const EDIT_MY_FLIGHT_SUCCEEDED = `${prefix}/editMyFlightSucceeded`
export const EDIT_MY_FLIGHT_FAILED = `${prefix}/editMyFlightFailed`
export const GET_MY_FLIGHTS = `${prefix}/getMyFlights`
export const GET_MY_FLIGHTS_SUCCEEDED = `${prefix}/getMyFlightsSucceeded`
export const GET_MY_FLIGHTS_FAILED = `${prefix}/getMyFlightsFailed`
export const RESET = `${prefix}/resetHistory`