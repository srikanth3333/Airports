import {put, call, takeEvery} from 'redux-saga/effects';
import { SPECIAL_ASSISTANCE } from './types';
import { request } from "../../services";
import { HTTP_METHODS } from "../../services/api-constants";
import { getSpecialNeedData } from '../../services/api-end-points';
export function* TravellingWithChild() {
  try {
    const response = yield call(()=>request(getSpecialNeedData(), HTTP_METHODS.GET));
    yield put({type: SPECIAL_ASSISTANCE.TRAVELLING_WITH_CHILD_SUCCESS, payload: response.response.data});
  } catch (e) {
        yield put({type: SPECIAL_ASSISTANCE.TRAVELLING_WITH_CHILD_ERROR, payload: e});
  }
}

export function*  SpecialNeedDataWatcher() {
  yield takeEvery(SPECIAL_ASSISTANCE.TRAVELLING_WITH_CHILD_REQUEST, TravellingWithChild);
}