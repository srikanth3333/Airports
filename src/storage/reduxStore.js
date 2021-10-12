import store from "../store/configureStore";
import { isEmpty } from "../utils/globalMethods";

const getLoginStatus = () => {
  let userInfo = store.getState().SplashReducer.userProfile;
  return userInfo && userInfo.userId ? true : false
}

const getLoggenInUserEmail = () => {
  let userInfo = store.getState().SplashReducer.userProfile;
  return !isEmpty(userInfo) && userInfo.emailAddress ? userInfo.emailAddress : ''
}
const getLoggenInUserData = () => {
  let userInfo = store.getState().SplashReducer.userProfile;
  return !isEmpty(userInfo) && userInfo ? userInfo : {}
}

const getLoggenInUserToken = () => {
  let token = store.getState().SplashReducer.token;
  return token !== '' ? token : '';
}

export {
  getLoginStatus,
  getLoggenInUserEmail,
  getLoggenInUserData,
  getLoggenInUserToken
}


