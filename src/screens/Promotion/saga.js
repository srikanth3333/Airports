import { put, call, takeLatest } from "redux-saga/effects";
import { getPromotionURL } from "../../services/api-end-points";
import { request } from "../../services";
import * as Dispatch from "./action";
import { PromotionAction } from "./action_types";
import { HTTP_METHODS } from "../../services/api-constants";
import {
    getLoggenInUserToken,
  } from "../../storage/reduxStore";

export function* getPromotionWatcher() {
  yield takeLatest(PromotionAction.GET_PROMOTIONS, getPromotionData);
}

export function* getPromotionData() {
    try {
      const result = yield call(() => request(getPromotionURL(), HTTP_METHODS.GET));
      if (result.response.status == 200) {
        yield put(Dispatch.getPromotionSucess(result.response.data));
      } else {
      }
    } catch (error) {
      alert(error);
    }
  }
