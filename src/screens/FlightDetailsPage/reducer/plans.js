import { handleActions } from 'redux-actions'
import moment from 'moment'
import { get, set, isEmpty, mergeWith, isNumber } from 'lodash'

import { plans as actionTypes } from '../actiontypes'

import { terminalMap } from '../../../general/constants/maps'

const initialState = {
  list: {},
  selected: null,
  isAtFirstStep: false,
  searchResult: {},
  searchMeta: {},
  searchError: null,
  transportOptions: null,
  askedForSignUp: false,
  isSearching: false
}

export const getDefaultPlan = (flightInfo) => {
  const id = moment().unix().toString()
  const leg = get(flightInfo, 'flight.leg', '');
  let destination = '';
  let origin = '';
  let terminal='';
  if (leg=='D') {
    terminal = get(flightInfo, 'flight.origin.kulAirport', '');
  } else if (leg=='A') {
    terminal = get(flightInfo, 'flight.destination.kulAirport', '');
  }
  terminal = terminal.toUpperCase();
  if (terminal=='KLIA' || terminal=='KLIA2') {
    const place = terminalMap[terminal];
    if (leg=='D') {
      destination = place;
    } else if (leg=='A') {
      origin = place
    }
  }
  return {
    id: id,
    flightInfo: flightInfo,
    type: null,
    checkInMode: null,
    ratings: null,
    sync: false,
    answeredConnectingFlight: false,
    terminal: terminal,
    gettingThere: {
      option: null, //['bus-n-train','ride-hailing','my-car','car-rental']
      optionId: null,
      origin: origin,
      destination: destination,
      supportData: {
        transit: null,
        parking: null,
        driving: null,
        carRental: null
      }
    }
  }
}

const mergeRatings = (objValue, srcValue) => {
  if (isNumber(srcValue)){
    return (srcValue === 0) ? objValue : srcValue
  }
  return srcValue
}

export default handleActions({
  [actionTypes.SET_STATE]: (state, { payload }) => {
    const newState = {
      ...initialState,
      ...payload
    }
    return newState || state
  },
  [actionTypes.CLEAR_SEARCH]: (state) => ({
    ...state,
    searchResult: {},
    searchMeta: {},
    searchError: null,
    isSearching: false
  }),
  [actionTypes.SEARCH_FLIGHT]: (state) => {
    return {
      ...state,
      isSearching: true,
    }
  },
  [actionTypes.SEARCH_FLIGHT_SUCCEEDED]: (state, { payload, meta }) => {
    return {
      ...state,
      searchResult: payload,
      searchMeta: meta || {},
      searchError: null,
      isSearching: false
    }
  },
  [actionTypes.SEARCH_FLIGHT_FAILED]: (state, { error, payload }) => {
    return {
      ...state,
      searchResult: {},
      searchMeta: {},
      searchError: payload.toString(),
      isSearching: false
    }
  },
  [actionTypes.REFRESH_PLAN_SUCCEEDED]: (state, { error, payload }) => {
    const { id, flightInfo } = payload
    const plan = get(state.list, id)
    const lastUpdate = new Date()
    if (plan) {
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...plan,
            flightInfo: flightInfo,
            lastUpdate: lastUpdate
          }
        }
      }
    }
    return state
  },
  [actionTypes.REFRESH_PLAN_EXPIRED]: (state, { payload }) => {
      const key = payload.toString()
      let selected = state.selected
      const list = { ...state.list }
      delete list[key]
      if (selected==key) {
        selected = null
      }
      return {
          ...state,
          list: list,
          selected: selected
      }
  },
  [actionTypes.CREATE_PLAN_SUCCEEDED]: (state, { payload, meta }) => {
    const { id } = payload
    if (id) {
      const newPlan = {
        ...payload
      }
      newPlan.lastUpdate = new Date()
      if (!isEmpty(meta)) {
        const {
          firstName = '',
          lastName = '',
          seatClass = '',
          seatNumber = ''
        } = meta
        set(newPlan, 'passengerInfo', {
          firstName: firstName,
          lastName: lastName,
          name: `${firstName} ${lastName}`,
          seatClass: seatClass,
          seatNumber: seatNumber
        })
      }
      
      //to ensure that the same asf key won't be added twice
      //this couldn't be done by removing 'id' because 'id' is different from 'asfKey'
      //therefore 'asfKey' is checked
      const asfKey = get(newPlan,'flightInfo.flight.asfKey',null);
      const list = { ...state.list }
      const planKeysToDelete = []
      Object.keys(list).map(function(key,index) {
        const planRecord = list[key]
        const extAsfKey = get(planRecord,'flightInfo.flight.asfKey',null);
        if (extAsfKey) {
          if (extAsfKey==asfKey) {
            planKeysToDelete.push(key)
          }
        } else {
          planKeysToDelete.push(key)
        }
      })
      for (var i=0;i<planKeysToDelete.length;i++) {
        const key = planKeysToDelete[i]
        delete list[key]
      }

      return {
        ...state,
        list: {
          ...list,
          [id]: newPlan
        },
        selected: id,
        searchResult: {},
        searchMeta: {},
        searchError: null
      }
    }
    return state
  },
  [actionTypes.CREATE_TRANSIT_PLAN_SUCCEEDED]: (state, { payload, meta, bagsInfo }) => {
    const { id } = payload
    const previousPlanId = get(state, 'selected', '')
    if (id) {
      const newPlan = {
        ...payload
      }
      newPlan.lastUpdate = new Date()
      if (!isEmpty(meta)) {
        const {
          firstName = '',
          lastName = '',
          seatClass = '',
          seatNumber = ''
        } = meta
        set(newPlan, 'passengerInfo', {
          firstName: firstName,
          lastName: lastName,
          name: `${firstName} ${lastName}`,
          seatClass: seatClass,
          seatNumber: seatNumber
        })
      }

      //to ensure that the same asf key won't be added twice
      //this couldn't be done by removing 'id' because 'id' is different from 'asfKey'
      //therefore 'asfKey' is checked
      const asfKey = get(newPlan,'flightInfo.flight.asfKey',null);
      const list = { ...state.list }
      const planKeysToDelete = []
      Object.keys(list).map(function(key,index) {
        const planRecord = list[key]
        const extAsfKey = get(planRecord,'flightInfo.codeshareFlight.asfKey',null);
        if (extAsfKey) {
          if (extAsfKey==asfKey) {
            planKeysToDelete.push(key)
          }
        } else {
          planKeysToDelete.push(key)
        }
      })

      return {
        ...state,
        list: {
          ...list,
          [id]: newPlan
        },
        selected: id,
        searchResult: {},
        searchMeta: {},
        searchError: null,
        transitBags: bagsInfo,
        previousPlanId: previousPlanId
      }
    }
    return state
  },
  [actionTypes.SET_SELECTED]: (state, { payload = false }) => {
    return {
      ...state,
      isAtFirstStep: payload
    }
  },
  [actionTypes.REMOVE_CURRENT_PLAN]: (state) => {
    const selected = state.selected
    const previousPlanId = state.previousPlanId
    const list = { ...state.list }

    if (selected && !isEmpty(list[selected])) {
      delete list[selected]
    }

    if(previousPlanId && !isEmpty(list[previousPlanId])) {
      delete list[previousPlanId]
    }
    
    return {
      ...initialState,
      list: {
        ...list
      },
      searchResult: {},
      searchError: null
    }
  },
  [actionTypes.SET_CHECK_IN_MODE]: (state, { payload }) => {
    const { id, checkInMode } = payload
    const plan = get(state.list, id)
    if (plan) {
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...plan,
            checkInMode: checkInMode
          }
        }
      }
    }
    return state
  },
  [actionTypes.SET_COLLECT_BAGGAGE]: (state, { payload }) => {
    const { id, collectBaggage } = payload
    const plan = get(state.list, id)
    if (plan) {
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...plan,
            collectBaggage: collectBaggage
          }
        }
      }
    }
    return state
  },
  [actionTypes.SET_GETTING_THERE_ORIGIN]: (state, { payload }) => {
    const { id, origin } = payload
    const plan = get(state.list, id)
    if (plan) {
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...plan,
            gettingThere: {
              ...plan.gettingThere,
              origin: origin
            }
          }
        }
      }
    }
    return state
  },
  [actionTypes.SET_GETTING_THERE_DESTINATION]: (state, { payload }) => {
    const { id, destination } = payload
    const plan = get(state.list, id)
    if (plan) {
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...plan,
            gettingThere: {
              ...plan.gettingThere,
              destination: destination,
            }
          }
        }
      }
    }
    return state
  },
  [actionTypes.SET_GETTING_THERE_OPTION]: (state, { payload }) => {
    const { id, data } = payload
    const plan = get(state.list, id)
    if (plan) {
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...plan,
            gettingThere: {
              ...plan.gettingThere,
              ...data
            }
          }
        }
      }
    }
    return state
  },
  [actionTypes.SET_TRANSPORT_TRAVELING_OPTIONS]: (state, { payload }) => {
    return {
      ...state,
      transportOptions: payload
    }
  },
  [actionTypes.UNSET_GETTING_THERE_OPTION]: (state, { payload }) => {
    const { id } = payload
    const plan = get(state.list, id)
    if (plan) {
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...plan,
            gettingThere: {
              ...plan.gettingThere,
              option: '',
            }
          }
        }
      }
    }
    return state
  },
  [actionTypes.SET_GETTING_THERE_SUPPORT_DATA]: (state, { payload }) => {
    const { id, supportData } = payload
    const plan = get(state.list, id)
    if (plan) {
      return {
        ...state,
        transportOptions: null,
        list: {
          ...state.list,
          [id]: {
            ...plan,
            gettingThere: {
              ...plan.gettingThere,
              supportData: {
                ...plan.gettingThere.supportData,
                ...supportData
              }
            }
          }
        }
      }
    }
    return state
  },
  [actionTypes.POST_SURVEY_SUCCEEDED]: (state, { payload, meta }) => {
    const { planId } = meta
    const plan = get(state.list, planId)
    if (plan) {
      return {
        ...state,
        list: {
          ...state.list,
          [planId]: {
            ...plan,
            ratings: payload
          }
        }
      }
    }
    return state
  },
  [actionTypes.RATE_SUCCEEDED]: (state, { payload, meta }) => {
    const { planId } = meta
    const plan = get(state.list, planId)
    if (plan) {
      const ratings = get(plan, 'ratings', {}) || {}
      return {
        ...state,
        list: {
          ...state.list,
          [planId]: {
            ...plan,
            ratings: Object.assign({}, mergeWith(ratings, payload, mergeRatings))
          }
        }
      }
    }
    return state
  },
  [actionTypes.ADD_CHECK_IN_TIME]: (state, { payload }) => {
    const { id, duration } = payload
    const plan = get(state.list, id)
    if (plan) {
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...plan,
            checkInAddedDuration: duration || null
          }
        }
      }
    }
    return state
  },
  [actionTypes.ASKED_FOR_SIGNUP]: (state, {payload}) => {
    return {
      ...state,
      askedForSignUp: payload
    }
  },
  [actionTypes.GET_THINGS_TODO_SUCCEEDED]: (state, {payload}) => {
    return {
      ...state,
      thingsToDo: payload
    }
  },
  [actionTypes.GET_THINGS_TODO_FAILED]: (state, {payload}) => {
    return {
      ...state,
      thingsToDo: []
    }
  },
  [actionTypes.UPDATE_TRANSIT_BAGS]: (state, {payload}) => {
    return {
      ...state,
      transitBags: payload
    }
  },
  [actionTypes.ANSWER_CONNECTING_FLIGHT_QUESTION]: (state, { payload }) => {
    if (!isEmpty(state.list[payload])) {
      return {
        ...state,
        list: {
          ...state.list,
          [payload]: {
            ...state.list[payload],
            answeredConnectingFlight: true
          }
        }
      }
    }
    return state
  }
}, initialState)