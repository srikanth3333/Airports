const prefix = 'plans'

export const SET_STATE = `${prefix}/setState`

export const CLEAR_SEARCH = `${prefix}/clearSearch`
export const ON_BARCODE_RECEIVED = `${prefix}/handleBarcode`
export const SET_SELECTED =`${prefix}/setSelected`
export const SEARCH_FLIGHT = `${prefix}/searchFlight`
export const SEARCH_FLIGHT_SUCCEEDED = `${prefix}/searchFlightSucceeded`
export const SEARCH_FLIGHT_FAILED = `${prefix}/searchFlightFailed`

export const GET_PLANS = `${prefix}/getAll`
export const GET_PLANS_SUCCEEDED = `${prefix}/getAll_Succeeded`
export const GET_PLANS_FAILED = `${prefix}/getAll_Failed`
export const GET_PLAN = `${prefix}/get`
export const CREATE_PLAN = `${prefix}/create`
export const CREATE_PLAN_SUCCEEDED = `${prefix}/create_succeeded`
export const CREATE_PLAN_FAILED = `${prefix}/create_failed`
export const REMOVE_CURRENT_PLAN = `${prefix}/remove_current_plan`
export const REFRESH_PLAN = `${prefix}/refresh`
export const REFRESH_PLAN_EXPIRED = `${prefix}/refreshPlanExpired`
export const REFRESH_PLAN_SUCCEEDED = `${prefix}/refresh_succeeded`
export const REFRESH_PLAN_FAILED = `${prefix}/refresh_failed`

export const SET_CHECK_IN_MODE = `${prefix}/setCheckInMode`
export const SET_COLLECT_BAGGAGE = `${prefix}/setCollectBaggage`
export const SET_SELF_CHECK_IN = `${prefix}/setSelfCheckIn`

export const GET_TRANSPORT_TRAVELING_OPTIONS = `${prefix}/getTransportTravelingOptions`
export const SET_TRANSPORT_TRAVELING_OPTIONS = `${prefix}/setTransportTravelingOptions`
export const SET_GETTING_THERE_ORIGIN = `${prefix}/setGettingThereOrigin`
export const SET_GETTING_THERE_DESTINATION = `${prefix}/setGettingThereDestination`
export const SET_GETTING_THERE_OPTION = `${prefix}/setGettingThereOption`
export const UNSET_GETTING_THERE_OPTION = `${prefix}/unsetGettingThereOption`
export const SET_GETTING_THERE_SUPPORT_DATA = `${prefix}/setGettingThereSupportData`

export const POST_SURVEY = `${prefix}/postSurvey`
export const POST_SURVEY_SUCCEEDED = `${prefix}/postSurveySucceeded`
export const POST_SURVEY_FAILED = `${prefix}/postSurveyFailed`

export const RATE_CHECKIN = `${prefix}/rateCheckIn`
export const RATE_IMMIGRATION = `${prefix}/rateImmigration`
export const RATE_BOARDING_GATE = `${prefix}/rateBoarding`
export const RATE_SUCCEEDED = `${prefix}/rateSucceeded`
export const RATE_FAILED = `${prefix}/rateFailed`

export const ADD_CHECK_IN_TIME = `${prefix}/addCheckInTime`
export const ASKED_FOR_SIGNUP = `${prefix}/askedForSignUp`

export const CREATE_TRANSIT_PLAN = `${prefix}/createTransitPlan`
export const CREATE_TRANSIT_PLAN_SUCCEEDED = `${prefix}/createTransitPlanSucceeded`
export const CREATE_TRANSIT_PLAN_FAILED = `${prefix}/createTransitPlanFailed`

export const UPDATE_TRANSIT_BAGS = `${prefix}/updateTransitCheckedInBags`

export const ANSWER_CONNECTING_FLIGHT_QUESTION = `${prefix}/answerConnectingFlightQuestion`