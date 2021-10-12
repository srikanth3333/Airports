import {put, call, takeEvery} from 'redux-saga/effects';
import { TransportType } from './types';
import { request } from "../../services";
import { HTTP_METHODS } from "../../services/api-constants";
import { getRateData, getTranportData,postRateData } from '../../services/api-end-points';
export function* Transport() {
  try {
    const response = yield call(()=>request(getTranportData(), HTTP_METHODS.GET));
    yield put({type:  TransportType.TRANSPORT_SUCCESS, payload: response});
  } catch (e) {
        yield put({type: TransportType.TRANSPORT_ERROR, payload: e});
  }
}

export function*  GetTransportsData() {
  yield takeEvery(TransportType.TRANSPORT_REQUEST , Transport);
}

export function* Rates(path) {
  try {
    const response = yield call(()=>request(getRateData(path), HTTP_METHODS.GET));
    yield put({type:  TransportType.GET_RATE_SUCCESS, payload: response});
  } catch (e) {
        yield put({type: TransportType.GET_RATE_ERROR, payload: e});
  }
}

export function*  GetRatesData() {
  yield takeEvery(TransportType.GET_RATE_REQUEST , Rates);
}

export function* PostRates(action) {
  try {
    let requestData = action.payload;
    const response = yield call(() =>
      request(postRateData(), HTTP_METHODS.POST, requestData)
    );
    // const response = yield call(()=>request(getRateData(path), HTTP_METHODS.POST));
    yield put({type:  TransportType.POST_RATE_SUCCESS, payload: response});
  } catch (e) {
        yield put({type: TransportType.POST_RATE_ERROR, payload: e});
  }
}

export function*  PostRatesData() {
  yield takeEvery(TransportType.POST_RATE_REQUEST , PostRates);
}

export default GetTransportsData;