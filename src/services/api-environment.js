/**
 * API ENVIRONMENTS
 */
 import axios from "axios";

 /**
  * PRODUCTION
  */
 const prod = 'https://tae.malaysiaairports.com.my:2443';
 
 /**
  * UAT
  */
 const uat = "https://tae.malaysiaairports.com.my:2443";

//  https://tae-alpha.malaysiaairports.com.my:2443/uat

 axios.get("http://mahb.tsp.mockable.io")
   .then((res) => {})
   .catch((error) => {
     // console.log('debug > axios > ', error.message);
     if (error.message && error.message !== "Network Error") {
     }
   });
 
 /**
  * DEV
  */
 const dev = "https://tae-alpha.malaysiaairports.com.my:2443/dev";
 
 /**
  * TEST
  */
 const test = "https://tae-alpha.malaysiaairports.com.my:2443/dev";
 
 /**
  * LOCAL
  */
 const local = "http://localhost:3000/";
 
 /**
  * GOOGLE API
  */
 const google_api = "https://maps.googleapis.com/maps/api/geocode/json";
 
 export const api_environments = {
   prod,
   dev,
   test,
   uat,
   google_api,
   local,
 };
 