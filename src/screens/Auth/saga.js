import { put, call, takeLatest } from "redux-saga/effects";
import {
  fetchSplashData,
  postSignupURL,
  postVerifyEmailURL,
  postUserLogin,
  resetPasswordEmailURL,
  restePasswordURL,
  logoutUser,
  profileUpdate,
  resendVerificationCode,
  profileImgUpdate,
  changePasswordURL,
  getImage
} from "../../services/api-end-points";
import { request } from "../../services";
import * as Dispatch from "./action";
import { SplashAction } from "./action_types";
import { HTTP_METHODS } from "../../services/api-constants";
import {
  getLoggenInUserEmail,
  getLoggenInUserToken,
  getLoggenInUserData,
} from "../../storage/reduxStore";

export function* SplashDataWatcher() {
  yield takeLatest(SplashAction.SPLASHDATA, getSplashData);
}

export function* getSplashData() {
  try {
    const result = yield call(() =>
      request(fetchSplashData(), HTTP_METHODS.GET)
    );
    if (result.response.status == 200) {
      yield put(Dispatch.GetSplashDataSucess(result.response.data));
    } else {
    }
  } catch (error) {
    yield put(Dispatch.GetSplashDataError(error));
  }
}

export function* postSignUpDataWatcher() {
  yield takeLatest(SplashAction.SIGN_UP, postSignUpData);
}

export function* postSignUpData(action) {
  try {
    yield put(Dispatch.loader(true));
    let requestData = action.payload;
    const result = yield call(() =>
      request(postSignupURL(), HTTP_METHODS.POST, requestData)
    );
    if (result.response.status == 200) {
      action.payload.userid = result.response.data;
      yield put(Dispatch.postSignUpDataSucess(action.payload));
    } else {
    }
  } catch (error) {
    yield put(Dispatch.postSignUpDataError(error.response.data));
  }
}

export function* postVerifyEmailWatcher() {
  yield takeLatest(SplashAction.VERIFY_EMAIL, postVerifyEmail);
}

export function* postVerifyEmail(action) {
  // debugger
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    let code = action.payload.id;
    const result = yield call(() =>
      request(
        postVerifyEmailURL(code, action.payload.tokenId),
        HTTP_METHODS.POST,
        data,
        true
      )
    );
    console.log("VerifyyyyyyyResponse", result);
    // debugger
    if (result.response.status == 200) {
      let res = result.response.data;
      yield put(
        Dispatch.postVerifyEmailSuccess({
          message: "",
          token: res.token,
          userProfile: res.userProfile,
        })
      );
      yield action.payload.onSuccess(res);
    } else {
      yield action.payload.onError(result.response);
    }
  } catch (error) {
    if (
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.length > 0
    ) {
      yield action.payload.onError(error.response.data.errors[0].errorMessage);
    } else {
      yield action.payload.onError(error.response.data.message);
    }
    yield put(Dispatch.postVerifyEmailError(error.response.data));
  }
}

export function* postUserLoginWatcher() {
  yield takeLatest(SplashAction.LOGIN_IN, postUserLoginUser);
}

export function* postUserLoginUser(action) {
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    const result = yield call(() =>
      request(postUserLogin(), HTTP_METHODS.POST, data)
    );
    console.log("LoginResponse", result);
    if (result.response.status == 200) {
      let res = result.response.data;
      yield put(
        Dispatch.postUserLoginSuccess({
          message: "",
          token: res.token,
          userProfile: res.userProfile,
        })
      );
      yield action.payload.onSuccess(res);
    } else {
      yield action.payload.onError(result.response);
    }
  } catch (error) {
    if (
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.length > 0
    ) {
      yield action.payload.onError(error.response.data.errors[0].errorMessage);
    } else {
      yield action.payload.onError(error.response.data.message);
    }
    yield put(Dispatch.postUserLoginError(error.response.data));
  }
}

export function* postResetEmailWatcher() {
  yield takeLatest(SplashAction.RESET_VERIFY_EMAIL, postResetEmail);
}

export function* postResetEmail(action) {
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    const result = yield call(() =>
      request(resetPasswordEmailURL(data.email), HTTP_METHODS.POST, data)
    );
    if (result.response.status == 200) {
      let res = result.response.data;
      yield put(Dispatch.loader(false));
      yield action.payload.onSuccess(res);
    } else {
      yield put(Dispatch.loader(false));
      yield action.payload.onError("Email id not found");
    }
  } catch (error) {
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

export function* postResetPasswordWatcher() {
  yield takeLatest(SplashAction.RESET_PASSWORD, postResetPassword);
}

export function* postResetPassword(action) {
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    const result = yield call(() =>
      request(restePasswordURL(), HTTP_METHODS.POST, JSON.stringify(data))
    );
    if (result.response.status == 200) {
      let res = result.response.data;
      yield put(Dispatch.loader(false));
      yield action.payload.onSuccess(res);
    } else {
      yield put(Dispatch.loader(false));
      yield action.payload.onError("Reset Code is invalid or expired");
    }
  } catch (error) {
    console.log(error.response);
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

export function* posUserLogoutWatcher() {
  yield takeLatest(SplashAction.LOG_OUT, posUserLogout);
}

export function* posUserLogout(action) {
  debugger;
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    // let email = getLoggenInUserEmail();
    let token = getLoggenInUserToken();
    const result = yield call(() =>
      request(logoutUser(), HTTP_METHODS.POST, data, false, {}, true, token)
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

export function* posUserProfileInfoWatcher() {
  yield takeLatest(SplashAction.PROFILE_UPDATE, posUserProfileInfo);
}

export function* posUserProfileInfo(action) {
  debugger;
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    // let email = getLoggenInUserEmail();
    let token = getLoggenInUserToken();
    const result = yield call(() =>
      request(profileUpdate(), HTTP_METHODS.POST, data, false, {}, true, token)
    );
    if (result.response.status == 200) {
      let res = result.response.data;
      yield put(Dispatch.postUserProfileSuccess(res.userProfile));
      yield action.payload.onSuccess(res);
    } else {
      yield put(Dispatch.postUserProfileError(result.response));
      yield action.payload.onError("Invalid request");
    }
  } catch (error) {
    yield put(Dispatch.postUserProfileError(error.response));
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

export function* postResendCodeWatcher() {
  yield takeLatest(SplashAction.RESEND_VERIFICATION_CODE, postResetCode);
}

export function* postResetCode(action) {
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    const result = yield call(() =>
      request(resendVerificationCode(data.tokenId), HTTP_METHODS.POST, data)
    );
    if (result.response.status == 200) {
      let res = result.response.data;
      yield put(Dispatch.loader(false));
      yield action.payload.onSuccess(res);
    } else {
      yield put(Dispatch.loader(false));
      yield action.payload.onError("Email id not found");
    }
  } catch (error) {
    yield put(Dispatch.loader(false));
  }
}

const customMultiPartHeaders = async () => {
  return {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data',
    'x-api-type': 'mahb'
  };
}

export function* postProfileImgWatcher() {
  yield takeLatest(SplashAction.PROFILE_IMG, postProfileImg);
}

export function* postProfileImg(action) {
  debugger
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    const token = getLoggenInUserToken();
    const result = yield call(() =>
      request(
        profileImgUpdate(),
        HTTP_METHODS.POST,
        data,
        false,
        customMultiPartHeaders(),
        true,
        token
      )
    );
    console.log("VerifyyyyyyyProfilePicResponse", result);
    // debugger
    if (result.response.status == 200) {
      let res = result.response.data;
      console.log(getLoggenInUserData())
      // let userdata = Object.keys(getLoggenInUserData()).map((values)=>{return values.image!=''?values.image=res:values})
      let userdata=getLoggenInUserData();
      userdata.image=getImage(res);
      console.log(userdata)
      yield put(
        Dispatch.postProfileImageSuccess(userdata)
      );
      yield action.payload.onSuccess(res);
    } else {
      yield action.payload.onError(result.response);
    }
  } catch (error) {
    if (
      error.response.data &&
      error.response.data.errors &&
      error.response.data.errors.length > 0
    ) {
      yield action.payload.onError(error.response.data.errors[0].errorMessage);
    } else {
      yield action.payload.onError(error.response.data.message);
    }
    yield put(Dispatch.postProfileImageError(error.response.data));
  }
}


export function* postChangePasswordWatcher() {
  yield takeLatest(SplashAction.CHANGE_PASSWORD, postChangePassword);
}

export function* postChangePassword(action) {
  debugger;
  try {
    yield put(Dispatch.loader(true));
    let data = action.payload.data;
    let token = getLoggenInUserToken();
    const result = yield call(() =>
      request(
        changePasswordURL(),
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
