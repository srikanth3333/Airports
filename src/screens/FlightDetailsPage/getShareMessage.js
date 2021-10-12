//TODO: move this to utils/reduxSelect if needed by other class
import { createSelector } from 'reselect'
import { has } from 'lodash'

const getTextOptions = state => {
  return 'flight_details.share_message'
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
    let message =''+textOptions.prefix;
    if (isArrivalFlight) {
      message= message+textOptions.arrival
      message = message.replace('[date]','[end-date]')
      message = message.replace('[time]','[end-time]')
    } else if (isDepartureFlight) {
      message=message+textOptions.departure
      message = message.replace('[date]','[start-date]')
      message = message.replace('[time]','[start-time]')
    }
    message =message+textOptions.suffix;
    return message;
  }
)