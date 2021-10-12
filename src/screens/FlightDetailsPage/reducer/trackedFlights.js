import { handleActions } from 'redux-actions'
import { get, size } from 'lodash'

import { trackedFlights } from '../actiontypes';

const intialState = {
    list: {},
}

export default handleActions({
    [trackedFlights.REFRESH_TRACKED_FLIGHT_SUCCEEDED]: (state, { payload }) => {
        const list = { ...state.list }
        if (payload.id in list) {
            const data = payload
            data.lastUpdate = new Date()
            list[payload.id.toString()] = data
        }
        return {
            ...state,
            list: list
        }
    },
    [trackedFlights.REFRESH_TRACKED_FLIGHT_EXPIRED]: (state, { payload }) => {
        const list = { ...state.list }
        delete list[payload.toString()]
        return {
            ...state,
            list: list
        }
    },

    [trackedFlights.GET_MY_FLIGHTS_SUCCEEDED]: (state, {payload}) => {
        const list = { ...state.list }
        return {
            ...state,
            list: payload.flightPlans
        }
    },
    [trackedFlights.GET_MY_FLIGHTS_FAILED]: (state, {payload}) => state,
    [trackedFlights.SAVE_MY_FLIGHT_SUCCEEDED]: (state, {payload}) => state,
    [trackedFlights.SAVE_MY_FLIGHT_FAILED]: (state, {payload}) => state,
    [trackedFlights.EDIT_MY_FLIGHT_SUCCEEDED]: (state, {payload}) => state,
    [trackedFlights.EDIT_MY_FLIGHT_FAILED]: (state, {payload}) =>state,
    [trackedFlights.DELETE_MY_FLIGHT_SUCCEEDED]: (state, {payload}) =>state,
    [trackedFlights.DELETE_MY_FLIGHT_FAILED]: (state, {payload}) =>state,
    [trackedFlights.RESET]: (state, {payload}) => {
        return intialState
    }
}, intialState)