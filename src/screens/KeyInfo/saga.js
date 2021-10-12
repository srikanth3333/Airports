import { put, call, takeLatest } from "redux-saga/effects";
import { getFaqURL } from "../../services/api-end-points";
import { request } from "../../services";
import * as Dispatch from "./action";
import { KayAction } from "./action_types";
import { HTTP_METHODS } from "../../services/api-constants";

export function* KeyInfoDataWatcher() {
  yield takeLatest(KayAction.GET_FAQ, getKeyInfoData);
}

export function* getKeyInfoData() {
  try {
    const result = yield call(() => request(getFaqURL(), HTTP_METHODS.GET));
    if (result.response.status == 200) {
      yield put(Dispatch.GetFaqDataSucess(result.response.data));
    } else {
    }
  } catch (error) {
    alert(error);
  }
}
