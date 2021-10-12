// TODO: move this to utils if need to share the selector somewhere else
import { createSelector } from 'reselect'
import I18n from '../../localization/language';
import { isEmpty, get, set, forEach, isString, filter } from 'lodash'
import moment from 'moment'

import getFlightColorType from '../../utils/flights/getFlightColorType';
import getFlightStatusText from '../../utils/flights/getFlightStatusText'

import getTailImage from '../../utils/reduxSelect/getTailImage'

const getFlightTime = (time) => {
  if (!time) {
      return '';
  }
  let date = moment(time);
  return date.format('HH:mm, DD/MM/YYYY')
}

const getTerminal = (state) => {
  const terminal = state.flightInfo.terminal.toUpperCase()
  return terminal
}

const getLanguage = (state) => I18n.locale

const getMatchedFlightsWithSearchTerm = (flight, searchTerm) => {
  return (get(flight, 'location', '').replace(/\s+/g, "").toLowerCase().includes(searchTerm)) ||
      (get(flight, 'airline', '').replace(/\s+/g, "").toLowerCase().includes(searchTerm)) ||
      (get(flight, 'flightNumber', '').replace(/\s+/g, "").toLowerCase().includes(searchTerm))
}

const compareFlightTime = (flight1, flight2) => {
  return (new Date(flight1.flightTime) <= new Date(flight2.flightTime)) ? -1 : 1
}

const getFlights = (state, flightType, searchTerm) => {
  const flights = get(state, `flightInfo.${flightType}`, {})
  const codeshareFlights = get(state, `flightInfo.codeshare_${flightType}`, {})
  
  let result = []

  forEach(flights, (flight, key) => {
    const data = {
      id: key,
      status: getFlightColorType(get(flight, 'statusCode', '')),
      statusCode: get(flight, 'statusCode', ''),
      statusText: getFlightStatusText(flight.status),
      time: getFlightTime(flight.flightTime),
      flightTime: flight.flightTime
    }
    switch (flightType) {
      case 'departure':
        set(data, 'location', get(flight, 'destination.city', ''))
        set(data, 'terminal', get(flight, 'origin.kulAirport', ''))
        set(data, 'gate', get(flight, 'gate.name', ''))
        break;
      case 'arrival':
        set(data, 'location', get(flight, 'origin.city', ''))
        set(data, 'gate', get(flight, 'gate.name', ''))
        set(data, 'belt', get(flight, 'belt.name', ''))
        set(data, 'terminal', get(flight, 'destination.kulAirport', ''))
        break;
      default:
        break;
    }
    const codeshareKeys = get(flight, 'codeShareFlights', [])
    codeshareKeys.forEach((codeshareKey) => {
      const codeshareFlight = get(codeshareFlights, codeshareKey, null)

      if (codeshareFlight) {
        const logo = get(codeshareFlight, 'airline.logoImage', '')
        const tailImage = getTailImage(state, codeshareFlight.flightNumber)
        const item = {
          ...data,
          codeshareId: codeshareKey,
          flightNumber: codeshareFlight.flightNumber,
          airline: get(codeshareFlight, 'airline.name'),
          apiImageSource: tailImage
        }
        if (!isEmpty(logo)) {
          set(item, 'imageSource', { uri: logo })
        }
        result.push(item)
      }
    })
  })

  if (isString(searchTerm)) {
    if (searchTerm.length === 0) {
      return []
    }
    result = filter(result, (flight) => getMatchedFlightsWithSearchTerm(flight, searchTerm))
  }
  result = result.sort(compareFlightTime)
  return result
}

const getFormattedFlights = (state, flightType, searchTerm) => {
  const terminal = getTerminal(state)
  const flights = getFlights(state, flightType, searchTerm)
  console.log(terminal)
  return flights.filter(flight => {
    return flight.terminal === terminal
  })
}

export default getFormattedFlights