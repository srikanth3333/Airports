import { createSelector } from 'reselect'
import { get, isEmpty } from 'lodash'
import moment from 'moment'

import getFlightColorType from '../../utils/flights/getFlightColorType';
import getFlightStatusText from '../../utils/flights/getFlightStatusText'

const getLanguage = (state) => state.i18n.currentLanguage

const getFlight = ({ flightInfo }, id, codeshareId) => {
  const flight = get(flightInfo.departure, ((id && id != 0) ? id : codeshareId)) || get(flightInfo.arrival, ((id && id != 0) ? id : codeshareId)) || null
  return flight
}

const getCodeshareFlight = ({ flightInfo }, id, codeshareId) => {
  const codeshareFlight = get(flightInfo.codeshare_departure, codeshareId) || get(flightInfo.codeshare_arrival, codeshareId) || null
  return codeshareFlight
}

const formatTime = (time) => {
  const m = moment(time)
  if (!isEmpty(time) && moment.isMoment(m)) {
    return m.format('HH:mm') + ' hrs'
  }
  return ''
}

const formatDate = (time) => {
  const m = moment(time)
  if (!isEmpty(time) && moment.isMoment(m)) {
    return m.format('ddd, DD MMM YYYY')
  }
  return ''
}

const getEndTime = (time, duration) => {
  if (!isEmpty(duration)) {

  }
  return undefined
}

const getFlightDuration = (duration) => {
  const d = moment.duration(duration)
  if (!isEmpty(duration) && moment.isDuration(d)) {
    return ''
  }
  return ''
}

export default createSelector(
  [getFlight, getCodeshareFlight],
  (flight, codeshareFlight) => {
    if (!flight || !codeshareFlight) { return null; }
    return ({
      id: get(flight, 'afsKey', ''),
      codeshareId: get(codeshareFlight, 'afsKey', ''),
      status: getFlightColorType(get(flight, 'statusCode', '')),
      statusCode: get(flight, 'statusCode', ''),
      statusText: getFlightStatusText(flight.status),
      flightNumber: codeshareFlight.flightNumber,
      flightTime: flight.flightTime,
      originCountry: flight.origin.country.toUpperCase(),
      originCode: flight.origin.code,
      originCity: flight.origin.city,
      originAirport: flight.origin.kulAirport,
      destinationCountry: flight.destination.country.toUpperCase(),
      destinationCode: flight.destination.code,
      destinationCity: flight.destination.city,
      destinationAirport: flight.destination.kulAirport,
      flightDuration: getFlightDuration(flight.duration),
      startTime: flight.leg == 'D' ? formatTime(flight.flightTime) : null,
      startDate: flight.leg == 'D' ? formatDate(flight.flightTime) : null,
      endTime: flight.leg == 'A' ? formatTime(flight.flightTime) : null,
      endDate: flight.leg == 'A' ? formatDate(flight.flightTime) : null,
      flightType: flight.flightType,
      airline: codeshareFlight.airline.name,
      gate: get(flight, 'gate.name', ''),
      finalCallTime: get(flight, 'gate.finalCallTime', null),
      belt: get(flight, 'belt.name', ''),
      checkInCounters: get(flight, 'checkin.counters', ''),
      isArrival: (flight.leg === 'A'),
      imageSource: isEmpty(codeshareFlight.airline.logo) ? null : { uri: codeshareFlight.airline.logo },
      planData: {
        flight: flight,
        codeshareFlight: codeshareFlight
      }
    })
  }
)