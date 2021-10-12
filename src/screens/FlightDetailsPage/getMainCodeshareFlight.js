import { createSelector } from 'reselect'
import { get, isEmpty } from 'lodash'

const getFlight = ({ flightInfo }, id) => {
  const flight = get(flightInfo.departure, ((id && id != 0) ? id : id)) || get(flightInfo.arrival, ((id && id != 0) ? id : id)) || null
  return flight
}

const getCodeshareFlight = ({ flightInfo }, id) => {
  const codeshareFlight = get(flightInfo.codeshare_departure, id) || get(flightInfo.codeshare_arrival, id) || null
  return codeshareFlight
}

export default createSelector([getFlight, getCodeshareFlight],
  (flight, codeshareFlight) => {
    return {
      id: get(flight, 'afsKey', ''),
      codeshareId: get(codeshareFlight, 'afsKey', ''),
      airline: get(codeshareFlight, 'airline.name', ''),
      flightNumber: get(codeshareFlight, 'flightNumber', '')
    }
  }
)