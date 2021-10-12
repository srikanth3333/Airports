const isProduction = process.env.NODE_ENV === 'production'

const MOCKABLE_API_HOSTNAME = 'http://mahb.tsp.mockable.io'
export const PRODUCTION_API_HOSTNAMES = {
  'dev': 'https://tae-alpha.malaysiaairports.com.my:2443/dev',
  'uat': 'https://tae-alpha.malaysiaairports.com.my:2443/uat',
  'prod': 'https://tae-alpha.malaysiaairports.com.my:2443/uat'
}


//export const TravelApiLink = 'https://raw.githubusercontent.com/VChaithra/specialAssistance/master/db.json';
export const WheelChairApiLink = 'https://raw.githubusercontent.com/VChaithra/specialAssistance/master/wheelchair.json';

//export const TravelApiLink = 'http://localhost:3000/api/content/get-specialneeds'
export const TravelApiLink = '/content/get-specialneeds'

export const SELECTED_HOST = 'prod'

const API_HOSTNAME = `${PRODUCTION_API_HOSTNAMES[SELECTED_HOST]}/api`

export const pingServerURL = `http://www.google.com`

export const staticContentURL = `${PRODUCTION_API_HOSTNAMES[SELECTED_HOST]}/static`
export const previewAssetURL = `${PRODUCTION_API_HOSTNAMES[SELECTED_HOST]}/api/content/get-preview-static-asset?path=`

export const discoverURL = 'http://flyklia.com/'



export const getTravelApiDetails = `${API_HOSTNAME}/content/get-specialneeds`
export const getWheelApiDetails =`${WheelChairApiLink}`
//export const getInboxMessages = `${API_HOSTNAME}/inbox/get-messages`
export const getInboxMessages = `${API_HOSTNAME}/content/get-alerts-notices`

export const getArrivalFlights = `${API_HOSTNAME}/flights/get-flight-arrivals-cache`
export const getDepartureFlights = `${API_HOSTNAME}/flights/get-flight-departures-cache`

export const getPrevArrivalFlightsURL = `${API_HOSTNAME}/flights/get-flight-arrivals`
export const getPrevDepartureFlightsURL = `${API_HOSTNAME}/flights/get-flight-departures`

export const getPlaceList = `${API_HOSTNAME}/content/get-content-blocks-checksum`
export const getPlaceInfo = `${API_HOSTNAME}/content/get-content-block`
export const getFlightDetails = `${API_HOSTNAME}/flights/get-flights-cache`
export const getFlightDetailsNoCache = `${API_HOSTNAME}/flights/get-flights`
export const getFlightMeta = `${API_HOSTNAME}/flights/get-flight-meta`
export const getParkingPlaces = `${API_HOSTNAME}/content/get-parkings`
export const getCarRentalServices = `${API_HOSTNAME}/content/get-car-rentals-real`
export const getTailImages = `${API_HOSTNAME}/content/get-tail-images`
export const getCategories = `${API_HOSTNAME}/content/get-categories`
export const postSurvey = `${API_HOSTNAME}/devices/post-survey`

export const registerDeviceURL = `${API_HOSTNAME}/devices/register`
export const registerUserDeviceURL = `${API_HOSTNAME}/devices/register-user`
export const getTopicsURL = `${API_HOSTNAME}/devices/get-topics`
export const getLandingCards = `${API_HOSTNAME}/content/get-landing-cards`

export const getDirection = `${PRODUCTION_API_HOSTNAMES[SELECTED_HOST]}/maps/routepoi2`

export const weatherLocationURL = 'http://api.openweathermap.org/data/2.5/'
export const googleGeocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json'
export const weatherURL = 'https://api.darksky.net/forecast/'
export const geo_IP_URL = 'https://freegeoip.net/json/'
export const weatherIconBasedURL = 'http://jsphkhan.github.io/ReactNativeWeatherApp/assets/icons/'
export const googleMapDistanceMatrixURL= 'https://maps.googleapis.com/maps/api/distancematrix/json'
export const googleDirectionsURL = 'https://maps.googleapis.com/maps/api/directions/json'

export const grabDeepLinkURL = 'https://grab.com/'

/* TO BE REMOVED */
export const affinBankURL = 'https://rib.affinonline.com/rib/pb/logon'
export const amBankURL = 'https://www.ambank.com.my/eng/online-banking'
export const cimbBankURL = 'https://www.cimbbank.com.my/en/personal/banking-with-us/ways-to-bank/online-banking.html'
export const eonBankURL = 'https://www.aeoncredit.com.my/login'
export const hongLeongBankURL = 'https://s.hongleongconnect.my/rib/app/fo/login'
export const mayBankURL = 'https://www.maybank2u.com.my/mbb/m2u/common/M2ULogin.do?action=Login'
export const rhbBankURL = 'https://logon.rhb.com.my/'
/* TO BE REMOVED */

export const getKeyInfo = 'http://mahb.tsp.mockable.io/get-keyinfo-msic'
export const getGuidence = `${API_HOSTNAME}/content/get-guideme`
export const getShopping = 'https://mahb-tsp.mockable.io/get-shopping'
export const getPromotions = `${API_HOSTNAME}/content/get-promotions`
export const getTransport = `${API_HOSTNAME}/content/get-transport`
export const getFAQURL = `${API_HOSTNAME}/content/get-faqs`
export const getGeneralInfoURL = 'https://mahb-tsp.mockable.io/get-settings-general'
export const getGuideMe = `${API_HOSTNAME}/get-guideme`
export const favouritesURL = `${API_HOSTNAME}/favorites`
export const flightPlansURL = `${API_HOSTNAME}/flightplans`
export const ratingURL = `${API_HOSTNAME}/ratings`
export const thingsToDoURL = `${API_HOSTNAME}/content/get-thingstodos`
export const transitTextURL = `${API_HOSTNAME}/content/get-transit`

export const profileCreateURL = `${API_HOSTNAME}/userprofile/signup`
export const profileSignInURL = `${API_HOSTNAME}/userprofile/login`
export const profileSignOutURL = `${API_HOSTNAME}/userprofile/logout`
export const profileUpdateURL = `${API_HOSTNAME}/userprofile/profile`
export const profileUploadImageURL = `${API_HOSTNAME}/userprofile/UploadImage`
export const profileImageURL = `${API_HOSTNAME}/userprofile/image?id=`
export const profileChangePasswordURL = `${API_HOSTNAME}/userprofile/changepassword`
export const getProfileURL = `${API_HOSTNAME}/userprofile/profile`

export const deleteMessageURL = `${API_HOSTNAME}/userprofile/readmessage?path=`
export const surveyURL = `${API_HOSTNAME}/surveys`
export const feedbackURL = `${API_HOSTNAME}/surveys/feedback`

export const initiateResetPasswordURL = `${API_HOSTNAME}/userprofile/reset-initiate?emailAddress=`
export const resetPasswordURL = `${API_HOSTNAME}/userprofile/reset-password`
export const initiateVerifyEmailURL = `${API_HOSTNAME}/userprofile/verify-initiate?userId=`
export const verifyEmailURL = `${API_HOSTNAME}/userprofile/verify-email`

export const facebookURL = 'https://www.facebook.com/Malaysia-Airports-112926392232909/'
export const twitterURL = 'https://twitter.com/MY_Airports'
export const youtubeURL = 'https://www.youtube.com/user/malaysiaairportsMAHB'
export const instagramURL = 'https://www.instagram.com/malaysiaairports/'
export const weiboURL = 'https://weibo.com/malaysiaairports'

export const eVoucherRegisterURL = 'https://www.shoplah.com.my/freelys/api/merchant_register_users.php?auth=lk7Pkfs8%2FA3H6eW%2BSH2b6Q%3D%3D'
export const eVoucherAutoLoginURL = 'https://www.shoplah.com.my/freelys/login.php?auth='

export const convergence = 'https://convergence.malaysiaairports.com.my/'