import { createSelector } from 'reselect'
import { get, isEmpty } from 'lodash'

import getTailImage from '../../utils/reduxSelect/getTailImage'

const getMessage = state => "<strong>Note:</strong> [airline] is a codeshare partner of [main_airline]. Please proceed to board flight <strong>[main_flight_number].</strong>"


const getCurrentFlight = ({ flightInfo }, id, codeshareId) => {
  return get(flightInfo.codeshare_departure, codeshareId) || get(flightInfo.codeshare_arrival, codeshareId) || null
}

// main codeshare flight must have same afsKey as its parental
const getMainCodeshareFlight = ({ flightInfo }, id) => {
  return get(flightInfo.codeshare_departure, id) || get(flightInfo.codeshare_arrival, id) || null
}

const getMainCodeshareTailImage  = (state, id) => {
  const flight = get(state.flightInfo.codeshare_departure, id) || get(state.flightInfo.codeshare_arrival, id) || null
  return getTailImage(state, get(flight, 'flightNumber'))}

export default createSelector([getCurrentFlight, getMainCodeshareFlight, getMessage, getMainCodeshareTailImage],
  (currentFlight, mainCodeshareFlight, message, tailImage) => {
    if (isEmpty(currentFlight) || isEmpty(mainCodeshareFlight)) {
      return null
    }

    if (get(currentFlight, 'afsKey') === get(mainCodeshareFlight, 'afsKey')) {
      return null
    }

    message = message.replace('[airline]', get(currentFlight, 'airline.name', ''))
    message = message.replace('[main_airline]', get(mainCodeshareFlight, 'airline.name', ''))
    message = message.replace('[main_airline]', get(mainCodeshareFlight, 'airline.name', ''))
    message = message.replace('[main_flight_number]', get(mainCodeshareFlight, 'flightNumber', ''))
    return {
      message: message,
      image: tailImage
    }
  }
)