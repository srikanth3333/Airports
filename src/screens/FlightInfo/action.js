import { FlightInfoAction } from "./action_types";



export const GetFlightData = () => ({
  type: FlightInfoAction.FLIGHTDATA,
});


export const GetFlightDataSucess = (data) => ({
  type: FlightInfoAction.FLIGHTDATA_SUCCESS,
  payload: data,
});


export const GetFlightDataError = (data) => ({
  type: FlightInfoAction.FLIGHTDATA_ERROR,
  payload: data,
});

export const GetDepartureFlightData = () => ({
  type: FlightInfoAction.FLIGHT_DEPARTURE_DATA,
});


export const GetDepartureFlightSucess = (data) => ({
  type: FlightInfoAction.FLIGHT_DEPARTURE_SUCCESS,
  payload: data,
});


export const GetDepartureFlightError = (data) => ({
  type: FlightInfoAction.FLIGHT_DEPARTURE_ERROR,
  payload: data,
});