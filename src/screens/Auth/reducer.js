import { SplashAction } from "./action_types";

const initialState = {
  loading: true,
  splashdata: [],
  splashdataError: false,
  signupdata: "",
  signupdataError: "",
  token: "",
  userProfile: {},
  verifyEmailError: "",
  loginError: "",
  logoutError: "",
  profileDataError: "",
  isGuest: false,
  userProfileImg: {},
  profileImgUploadError: ""
};

const SplashInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SplashAction.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SplashAction.SPLASHDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        splashdata: action.payload,
        splashdataError: false,
      };
    case SplashAction.SPLASHDATA_ERROR:
      return {
        ...state,
        loading: false,
        splashdataError: true,
      };
    case SplashAction.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        signupdata: action.payload,
      };
    case SplashAction.SIGN_UP_ERROR:
      return {
        ...state,
        loading: false,
        signupdataError: action.payload,
      };
    case SplashAction.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        userProfile: action.payload.userProfile,
      };
    case SplashAction.VERIFY_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
        token: "",
        userProfile: {},
        verifyEmailError: action.payload,
      };
    case SplashAction.LOGIN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        userProfile: action.payload.userProfile,
      };
    case SplashAction.LOGIN_IN_ERROR:
      return {
        ...state,
        loading: false,
        token: "",
        userProfile: {},
        loginError: action.payload,
      };
    // case SplashAction.LOG_OUT_SUCCESS:
    //   return {
    //     ...state,
    //     signupdata: "",
    //     signupdataError:'',
    //     token: '',
    //     userProfile: {},
    //     verifyEmailError:'',
    //     loginError: '',
    //     logoutError: ''
    //   };
    case SplashAction.LOG_OUT:
      return {
        ...state,
        signupdata: "",
        signupdataError: "",
        token: "",
        userProfile: {},
        verifyEmailError: "",
        loginError: "",
        logoutError: "",
      };
    case SplashAction.LOG_OUT_ERROR:
      return {
        ...state,
        loading: false,
        logoutError: action.payload,
      };
    case SplashAction.PROFILE_UPDATE_SUCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
      };
    case SplashAction.PROFILE_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        profileDataError: action.payload,
      };
    case SplashAction.NAV_TO_HOME:
      return {
        ...state,
        loading: false,
        isGuest: action.payload
      };

    case SplashAction.PROFILE_IMG_SUCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
      };
    case SplashAction.PROFILE_IMG_ERROR:
      return {
        ...state,
        loading: false,
        profileImgUploadError: action.payload,
      };
      case SplashAction.CLEAR_IMAGE:
        let values = state.userProfile;
        values.image=''
        return {
          ...state,
          loading: false,
          userProfile:values,
        };
    default: {
      return state;
    }
  }
};

// Exports
export default SplashInfoReducer;
