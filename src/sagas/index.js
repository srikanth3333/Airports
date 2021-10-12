import { all } from "redux-saga/effects";
import { GetSpecialNeedData } from "../screens/SpecialAssistance/saga"
import { FlightDataWatcher, FlightDepartureDataWatcher } from "../screens/FlightInfo/saga";
import { SplashDataWatcher, postSignUpDataWatcher,postChangePasswordWatcher, postVerifyEmailWatcher, postUserLoginWatcher,postResetEmailWatcher,postResetPasswordWatcher,posUserProfileInfoWatcher, postResendCodeWatcher,postProfileImgWatcher} from "../screens/Auth/saga";
import {postUserFeedBackWatcher} from "../screens/MyProfile/saga";
import {KeyInfoDataWatcher} from '../screens/KeyInfo/saga';
import { SpecialNeedDataWatcher } from "../screens/SpecialAssistance/saga";
import {getPromotionWatcher} from '../screens/Promotion/saga';
import { watchfetchFlightsArrival, watchfetchFlightsDeparture, watchfetchFlightsDetails, watchFetchPrevFlightsArrival, watchFetchPrevFlightsDeparture, watchFetchTailImagesSaga, watchSearch } from "../screens/FlightInfoPage/Saga/flightInfo";
// import { watchSearch } from "../screens/FlightInfoPage/Saga/flightInfo";
import {watchPlans} from '../screens/FlightDetailsPage/saga/plans';
import { watchSearchFetchFlightMetadata, watchSearchFlightsByAirline, watchSearchFlightsByCity, watchSearchFlightsByFlightNumber } from "../screens/FlightInfoPage/Saga/search";
import { GetTransportsData, GetRatesData, PostRatesData } from "../screens/Transport/saga";
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    FlightDataWatcher(),
    SplashDataWatcher(),
    postSignUpDataWatcher(),
    postVerifyEmailWatcher(),
    postUserLoginWatcher(),
    postResetEmailWatcher(),
    postResetPasswordWatcher(),
    posUserProfileInfoWatcher(),
    postResendCodeWatcher(),
    postChangePasswordWatcher(),
    postUserFeedBackWatcher(),
    postProfileImgWatcher(),
    KeyInfoDataWatcher(),
    SpecialNeedDataWatcher(),
    FlightDepartureDataWatcher(),
    getPromotionWatcher(),
    watchfetchFlightsArrival(),
    watchfetchFlightsDeparture(),
    watchfetchFlightsDetails(),
    watchFetchPrevFlightsArrival(),
    watchFetchPrevFlightsDeparture(),
    watchFetchTailImagesSaga(),
    watchSearch(),
    watchPlans(),
    watchSearchFetchFlightMetadata(),
    watchSearchFlightsByAirline(),
    watchSearchFlightsByCity(),
    watchSearchFlightsByFlightNumber(),
    GetTransportsData(),
    GetRatesData(),
    PostRatesData(),
  ]);
}
