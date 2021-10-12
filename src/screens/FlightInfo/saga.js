import { put, call, takeLatest } from "redux-saga/effects";
import {
  fetchFlightURL, fetchFlightURL2, fetchFlightURL3
} from "../../services/api-end-points";
import { request } from "../../services";
import * as Dispatch from "./action";
import { FlightInfoAction } from "./action_types";
import { HTTP_METHODS } from "../../services/api-constants";


export function* FlightDataWatcher() {
  yield takeLatest(FlightInfoAction.FLIGHTDATA, getFlightData);
}

export function* getFlightData() {
  try {
    const result = yield call(() =>
      request(fetchFlightURL2(), HTTP_METHODS.GET)
    );
    if (result.response.status == 200) {
      yield put(Dispatch.GetFlightDataSucess(result));
    } else {
    }
  } catch (error) {
    yield put(Dispatch.GetFlightDataError(error));
  }
}

export function* FlightDepartureDataWatcher() {
  yield takeLatest(FlightInfoAction.FLIGHT_DEPARTURE_DATA, getDepartureFlightData);
}

export function* getDepartureFlightData() {
  try {
    const result = yield call(() =>
      request(fetchFlightURL3(), HTTP_METHODS.GET)
    );
    if (result.response.status == 200) {
      yield put(Dispatch.GetDepartureFlightSucess(result));
    } else {
    }
  } catch (error) {
    yield put(Dispatch.GetDepartureFlightError(error));
  }
}
