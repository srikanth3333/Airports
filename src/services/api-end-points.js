import { exp } from "react-native/Libraries/Animated/Easing";
import { api_environments } from "./api-environment";

let envi = "uat"; //'test uat';

export function getBaseURL() {
  return api_environments[envi] + "/api";
}

export function getRateBaseUrl(){
  return api_environments['prod'] + "/api";
}
export function getAssetPath(){
  return api_environments[envi]
}

export function fetchSplashData() {
  return getBaseURL() + "/content/get-alerts-notices";
}

export function postSignupURL() {
  return getBaseURL() + "/userprofile/signup";
}

export function postVerifyEmailURL(otp, userId) {
  return (
    getBaseURL() +
    `/userprofile/verify-email?verifyCode=${otp}&userId=${userId}`
  );
}

export function postUserLogin() {
  return getBaseURL() + `/userprofile/login`;
}

export function fetchFlightURL() {
  return getBaseURL() + `employee/1`;
}

export function fetchFlightURL2() {
  return getBaseURL() + `/flights/get-flight-arrivals`;
}
export function fetchFlightURL3() {
  return getBaseURL() + `/flights/get-flight-departures`;
}

export function resetPasswordEmailURL(email) {
  return getBaseURL() + `/userprofile/reset-initiate?emailAddress=${email}`;
}

export function restePasswordURL() {
  return getBaseURL() + `/userprofile/reset-password`;
}

export function logoutUser() {
  return getBaseURL() + `/userprofile/logout`;
}

export function profileUpdate() {
  return getBaseURL() + "/userprofile/profile";
}

export function resendVerificationCode(userid){
  return getBaseURL() + `/userprofile/verify-initiate?userId=${userid}`;
}
export function profileImgUpdate() {
  return getBaseURL() + "/userprofile/UploadImage";
}

export function submitFeedBackURL(){
  return getBaseURL() + "/surveys/feedback";
}

export function changePasswordURL(){
  return getBaseURL() + "/userprofile/changePassword";
}
export function getSpecialNeedData(){
  return getBaseURL() + "/content/get-specialneeds"
}

export function getFaqURL(){
  return getBaseURL()+'/content/get-faqs'
}

export function getImage(path){
  return getBaseURL()+`/userprofile/image?id=${path}`
}

export function getPromotionURL(){
  return getBaseURL()+`/content/get-promotions`
}

export function getAssestImages(){
  return getAssetPath()+`/static`
}

export function getTranportData() {
  return getBaseURL() + `/content/get-transport`
}

export function getRateData(path) {
  console.log(JSON.stringify(path),"pathhhhhhhhhhhhhhhhhhh")
  return getRateBaseUrl() + `/ratings?path=${path.params}`
}

export function postRateData() {
  return getRateBaseUrl() + `/ratings`
}

export const getDepartureFlights = `${getBaseURL()}/flights/get-flight-departures-cache`

export const getArrivalFlights = `${getBaseURL()}/flights/get-flight-arrivals-cache`
export const getTailImages = `${getBaseURL()}/content/get-tail-images`
export const getPrevArrivalFlightsURL = `${getBaseURL()}/flights/get-flight-arrivals`
export const getPrevDepartureFlightsURL = `${getBaseURL()}/flights/get-flight-departures`
export const getFlightDetails = `${getBaseURL()}/flights/get-flights-cache`
export const getParkingPlaces = `${getBaseURL()}/content/get-parkings`
export const googleDirectionsURL = 'https://maps.googleapis.com/maps/api/directions/json'
export const postSurvey = `${getBaseURL()}/devices/post-survey`
export const getFlightMeta = `${getBaseURL()}/flights/get-flight-meta`
