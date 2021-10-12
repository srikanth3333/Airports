import { SplashAction } from "./action_types";

export const GetSplashData = () => ({
  type: SplashAction.SPLASHDATA,
});

export const loader = (value) => ({
  type: SplashAction.LOADING,
  payload: value,
});

export const GetSplashDataSucess = (data) => ({
  type: SplashAction.SPLASHDATA_SUCCESS,
  payload: data,
});

export const GetToHomeAsGuest = (isGuest) => ({
  type: SplashAction.NAV_TO_HOME,
  payload: isGuest,
})

export const GetSplashDataError = (data) => ({
  type: SplashAction.SPLASHDATA_ERROR,
  payload: data,
});

export const postSignUpData = (data) => ({
  type: SplashAction.SIGN_UP,
  payload: data,
});

export const postSignUpDataSucess = (data) => ({
  type: SplashAction.SIGN_UP_SUCCESS,
  payload: data,
});

export const postSignUpDataError = (data) => ({
  type: SplashAction.SIGN_UP_ERROR,
  payload: data,
});

export const postVerifyEmail = ({id, tokenId, data, onSuccess, onError}) => ({
  type: SplashAction.VERIFY_EMAIL,
  payload: {id, tokenId, data, onSuccess, onError},
});

export const postVerifyEmailSuccess = (data) => ({
  type: SplashAction.VERIFY_EMAIL_SUCCESS,
  payload: data,
});

export const postVerifyEmailError = (data) => ({
  type: SplashAction.VERIFY_EMAIL_ERROR,
  payload: data,
});

export const postUserLogin = ({data, onSuccess, onError}) => ({
  type: SplashAction.LOGIN_IN,
  payload: {data, onSuccess, onError},
});

export const postResendVerifyCode=({data, onSuccess, onError}) => ({
  type: SplashAction.RESEND_VERIFICATION_CODE,
  payload: {data, onSuccess, onError},
});

export const postUserLoginSuccess = (data) => ({
  type: SplashAction.LOGIN_IN_SUCCESS,
  payload: data,
});

export const postUserLoginError = (data) => ({
  type: SplashAction.LOGIN_IN_ERROR,
  payload: data,
});

export const postResetEmail = ({data, onSuccess, onError}) => ({
  type: SplashAction.RESET_VERIFY_EMAIL,
  payload: {data, onSuccess, onError},
});

export const resetPassword=({data,onSuccess,onError})=>({
  type: SplashAction.RESET_PASSWORD,
  payload: {data, onSuccess, onError},
})

export const clearImage=()=>({
  type: SplashAction.CLEAR_IMAGE,
})

// export const postUserLogot = ({data, onSuccess, onError}) => ({
//   type: SplashAction.LOG_OUT,
//   payload: {data, onSuccess, onError},
// });

export const postUserLogot = () => ({
  type: SplashAction.LOG_OUT
});

export const postUserLogotSuccess = (data) => ({
  type: SplashAction.LOG_OUT_SUCCESS,
  payload: data,
});

export const postUserLogotError = (data) => ({
  type: SplashAction.LOG_OUT_ERROR,
  payload: data,
});

export const postUserInfo = ({data, onSuccess, onError}) => ({
  type: SplashAction.PROFILE_UPDATE,
  payload: {data, onSuccess, onError},
});

export const postUserProfileSuccess = (data) => ({
  type: SplashAction.PROFILE_UPDATE_SUCESS,
  payload: data,
});

export const postUserProfileError= (data) => ({
  type: SplashAction.PROFILE_UPDATE_ERROR,
  payload: data,
});

export const postProfileImage = ({data, onSuccess, onError}) => ({
  type: SplashAction.PROFILE_IMG,
  payload: {data, onSuccess, onError},
});

export const postProfileImageSuccess = (data) => ({
  type: SplashAction.PROFILE_IMG_SUCESS,
  payload: data,
});

export const postProfileImageError= (data) => ({
  type: SplashAction.PROFILE_IMG_ERROR,
  payload: data,
});

export const postChangePassowrd = ({data, onSuccess, onError}) => ({
  type: SplashAction.CHANGE_PASSWORD,
  payload: {data, onSuccess, onError},
});
