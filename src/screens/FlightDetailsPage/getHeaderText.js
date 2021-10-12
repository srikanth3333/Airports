//TODO: move this to utils/reduxSelect if needed by other class
import { createSelector } from 'reselect'
import { has } from 'lodash'

const getTextOptions = state => {
  return'flight_details.header_text'
}

const isDepartureFlight = (state, id, codeshareId) => {
  return has(state.flightInfo.departure, id)
}
const isArrivalFlight = (state, id) => {
  return has(state.flightInfo.arrival, id)
}

export default createSelector(
  [isArrivalFlight, isDepartureFlight, getTextOptions],
  (isArrivalFlight, isDepartureFlight, textOptions) => {
    if (isArrivalFlight) {
      return textOptions.arrival
    } else if (isDepartureFlight) {
      return textOptions.departure
    } else {
      return textOptions.default || ''
    }
  }
)