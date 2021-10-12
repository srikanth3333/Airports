import { handleActions } from 'redux-actions'
import { push as actionTypes } from '../actiontypes'

const initialState = {
  topics: {},
  deviceToken: ""
}

export default handleActions ({
    [actionTypes.GET_PUSH_SUCCEEDED]: (state, { payload }) => {
        console.log("Succesfully set Push")
        const newState = {
          ...state,
          deviceToken: payload
        }
        return newState || state
      },
      [actionTypes.REGISTER_DEVICE_SUCCEEDED]: (state, { payload }) => {
        console.log("Succesfully set Device Token")
        const newState = {
          ...state,
          deviceToken: payload
        }
        return newState || state
      },
      [actionTypes.GET_TOPICS_SUCCEEDED]: (state, { payload }) => {
        console.log("Succesfully set Topics Store")
        const newState = {
          ...state,
          topics: payload
        }
        return newState || state
      }
}, initialState)