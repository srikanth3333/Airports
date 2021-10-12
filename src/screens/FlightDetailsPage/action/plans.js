import { createAction } from 'redux-actions'
import { isEmpty } from 'lodash'

import { plans as actionTypes } from '../actiontypes'

export const setState = createAction(actionTypes.SET_STATE)
export const clearSearch = createAction(actionTypes.CLEAR_SEARCH)
export const handleBarcode = createAction(actionTypes.ON_BARCODE_RECEIVED)
export const setSelected= createAction(actionTypes.SET_SELECTED)
export const searchFlight = createAction(actionTypes.SEARCH_FLIGHT,
  (number, barcodeData) => number,
  (number, barcodeData) => {
    return {
      isBarcode: !isEmpty(barcodeData),
      barcodeData: barcodeData
    }
  }
)
export const searchFlightSucceeded = createAction(actionTypes.SEARCH_FLIGHT_SUCCEEDED,
  (payload, meta) => payload,
  (payload, meta) => meta
)
export const searchFlightFailed = createAction(actionTypes.SEARCH_FLIGHT_FAILED)
export const getPlans = createAction(actionTypes.GET_PLANS)
export const getPlansSucceeded = createAction(actionTypes.GET_PLANS_SUCCEEDED)
export const getPlansFailed = createAction(actionTypes.GET_PLANS_FAILED)
export const getPlan = createAction(actionTypes.GET_PLAN)
export const createPlan = createAction(actionTypes.CREATE_PLAN,
  (id, codeshareId, planData) => ({
    id: id,
    codeshareId: codeshareId,
    planData: planData
  })
)
export const createPlanSucceeded = createAction(actionTypes.CREATE_PLAN_SUCCEEDED,
  (payload, meta) => payload,
  (payload, meta) => meta
)
export const createPlanFailed = createAction(actionTypes.CREATE_PLAN_FAILED)
export const refreshPlan = createAction(actionTypes.REFRESH_PLAN)
export const refreshPlanExpired = createAction(actionTypes.REFRESH_PLAN_EXPIRED)
export const refreshPlanSucceeded = createAction(actionTypes.REFRESH_PLAN_SUCCEEDED)
export const refreshPlanFailed = createAction(actionTypes.REFRESH_PLAN_FAILED)
export const removeCurrentPlan = createAction(actionTypes.REMOVE_CURRENT_PLAN)

export const getTransportTravelingOptions = createAction(actionTypes.GET_TRANSPORT_TRAVELING_OPTIONS)
export const setTransportTravelingOptions = createAction(actionTypes.SET_TRANSPORT_TRAVELING_OPTIONS)

export const setCheckInMode = createAction(actionTypes.SET_CHECK_IN_MODE,
  (planId, mode) => ({
    id: planId,
    checkInMode: mode
  })
)
export const setCollectBaggage = createAction(actionTypes.SET_COLLECT_BAGGAGE,
  (planId, mode) => ({
    id: planId,
    collectBaggage: mode
  })
)
export const unsetGettingThereOption = createAction(actionTypes.UNSET_GETTING_THERE_OPTION,
  (planId) => ({
    id: planId
  })
)

export const setGettingThereOption = createAction(actionTypes.SET_GETTING_THERE_OPTION,
  (planId,data) => ({
    id: planId,
    data: data
  })
)

export const setGettingThereSupportData = createAction(actionTypes.SET_GETTING_THERE_SUPPORT_DATA,
  (planId,supportData) => ({
    id: planId,
    supportData: supportData
  })
)

export const setGettingThereOrigin = createAction(actionTypes.SET_GETTING_THERE_ORIGIN,
  (id, origin) => ({
    id: id,
    origin: origin
  })
)

export const setGettingThereDestination = createAction(actionTypes.SET_GETTING_THERE_DESTINATION,
  (id, destination) => ({
    id: id,
    destination: destination
  })
)

export const postSurvey = createAction(actionTypes.POST_SURVEY,
  (planId, survey) => survey,
  (planId, survey) => ({ planId: planId })
)

export const postSurveySucceeded = createAction(actionTypes.POST_SURVEY_SUCCEEDED,
  (planId, survey) => survey,
  (planId, survey) => ({ planId: planId })
)

export const postSurveyFailed = createAction(actionTypes.POST_SURVEY_FAILED,
  (planId, error) => error,
  (planId, survey) => ({ planId: planId })
)

export const rateCheckIn = createAction(actionTypes.RATE_CHECKIN, 
  (planId, rating, description, afsKey, flightNumber) => ({
    checkIn: rating,
    immigration: 0,
    boarding: 0,
    description: description,
    afsKey: afsKey,
    flightNumber: flightNumber
  }),
  (planId) => ({ planId: planId })
)

export const rateImmigration = createAction(actionTypes.RATE_IMMIGRATION, 
  (planId, rating, description, afsKey, flightNumber) => ({
    checkIn: 0,
    immigration: rating,
    boarding: 0,
    description: description,
    afsKey: afsKey,
    flightNumber: flightNumber
  }),
  (planId) => ({ planId: planId })
)
export const rateBoardingGate = createAction(actionTypes.RATE_BOARDING_GATE, 
  (planId, rating, description, afsKey, flightNumber) => ({
    checkIn: 0,
    immigration: 0,
    boarding: rating,
    description: description,
    afsKey: afsKey,
    flightNumber: flightNumber
  }),
  (planId) => ({ planId: planId })
)
export const rateSucceeded = createAction(actionTypes.RATE_SUCCEEDED,
  (planId, survey) => survey,
  (planId, survey) => ({ planId: planId })
)

export const rateFailed = createAction(actionTypes.RATE_FAILED,
  (planId, error) => error,
  (planId, survey) => ({ planId: planId })
)

export const addCheckInTime = createAction(actionTypes.ADD_CHECK_IN_TIME,
  (planId, duration) => ({ id: planId, duration: duration })
)

export const askedForSignUp = createAction(actionTypes.ASKED_FOR_SIGNUP)

export const createTransitPlan = createAction(actionTypes.CREATE_TRANSIT_PLAN)
export const createTransitPlanSucceeded = createAction(actionTypes.CREATE_TRANSIT_PLAN_SUCCEEDED)
export const createTransitPlanFailed = createAction(actionTypes.CREATE_TRANSIT_PLAN_FAILED)

export const updateTransitCheckedInBags = createAction(actionTypes.UPDATE_TRANSIT_BAGS)

export const answerConnectingFlightQuestion = createAction(actionTypes.ANSWER_CONNECTING_FLIGHT_QUESTION)