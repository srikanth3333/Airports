import { put, call, takeLatest } from "redux-saga/effects";
import { submitFeedBackURL } from "../../services/api-end-points";
import { request } from "../../services";
import * as Dispatch from "./action";
import { ProfileAction } from "./action_types";
import { HTTP_METHODS } from "../../services/api-constants";
import {
  getLoggenInUserEmail,
  getLoggenInUserToken,
} from "../../storage/reduxStore";

export function* postUserFeedBackWatcher() {
  yield takeLatest(ProfileAction.SUBMIT_FEEDBACK, postUserFeedBack);
}

export function* postUserFeedBack(action) {
  debugger;
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    let token = getLoggenInUserToken();
    const result = yield call(() =>
      request(
        submitFeedBackURL(),
        HTTP_METHODS.POST,
        data,
        false,
        {},
        true,
        token
      )
    );
    if (result.response.status == 200) {
      let res = result.response.data;
      yield put(Dispatch.loader(false));
      yield action.payload.onSuccess(res);
    } else {
      yield put(Dispatch.loader(false));
      yield action.payload.onError("Invalid request");
    }
  } catch (error) {
    console.log(error)
    yield put(Dispatch.loader(false));
    if (
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.length > 0
    ) {
      yield action.payload.onError(error.response.data.errors[0].errorMessage);
    } else {
      yield action.payload.onError(error.response.data.message);
    }
  }
}
