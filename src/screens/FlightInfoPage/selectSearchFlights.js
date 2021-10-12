// TODO: move this to utils if need to share the selector somewhere else
import { createSelector } from 'reselect'
// import I18n from 'react-native-i18n'
import { isEmpty, get, set, forEach, isArray } from 'lodash'
import moment from 'moment'

import getFlightColorType from '../../utils/flights/getFlightColorType';
import getTailImage from '../../utils/reduxSelect/getTailImage'

const getFlightTime = (time) => {
  if (!time) {
      return '';
  }
  let date = moment(time);
  return date.format('HH:mm, DD/MM/YYYY')
}

const getLanguage = (state) => 'en'

const getFlights = (state) => {
  debugger;
  const flights = get(state, `search.flightSearchResults.flights`, {})
  const codeshareFlights = get(state, `search.flightSearchResults.codeshareFlights`, {})
  let result = []
  forEach(flights, (flight, key) => {
    const data = {
      id: key,
      status: getFlightColorType(get(flight, 'statusCode', '')),
      statusText: flight.status.toUpperCase(),
      statusCode: get(flight, 'statusCode', ''),
      time: getFlightTime(flight.flightTime),
      flightDateTimeForSorting: flight.flightTime,
      terminal: get(flight, 'terminal', null),
      leg: flight.leg
    }
    let kulAirport = null;
    let kulAirportOther = null;
    switch (flight.leg) {
      case 'D':
        set(data, 'location', get(flight, 'destination.city', ''))
        kulAirport =  get(flight, 'origin.kulAirport', null)
        kulAirportOther =  get(flight, 'destination.kulAirport', null)
        break;
      case 'A':
        set(data, 'location', get(flight, 'origin.city', ''))
        set(data, 'belt', get(flight, 'belt.name', ''))
        kulAirport =  get(flight, 'destination.kulAirport', null)
        kulAirportOther =  get(flight, 'origin.kulAirport', null)
        break;
      default:
        break;
    }
    if (!data.terminal) {
      if (kulAirport)
        set(data, 'terminal', kulAirport)
      else if (kulAirportOther)
        set(data, 'terminal', kulAirportOther)
    }
    const codeshareKeys = get(flight, 'codeShareFlights', [])
    codeshareKeys.forEach((codeshareKey) => {
      const codeshareFlight = get(codeshareFlights, codeshareKey, null)

      if (codeshareFlight) {
        const logo = get(codeshareFlight, 'airline.logoImage', '')
        const tailImage = getTailImage(state, codeshareFlight.flightNumber)
        const item = {
          ...data,
          flightNumber: codeshareFlight.flightNumber,
          codeshareId: codeshareKey,
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
  const chronologicalSortedFlights = sortData(result)
  return chronologicalSortedFlights
}

const sortData = (data) => {
  return !isEmpty(data) && isArray(data) ? data.sort((item1, item2) => {
    momentItem1 = moment(item1.flightDateTimeForSorting)
    momentItem2 = moment(item2.flightDateTimeForSorting)
    return (momentItem1.isValid() && momentItem2.isValid() && momentItem1.isAfter(momentItem2)) ? 1 : -1
  }) : data
}

const getFormattedFlights = createSelector(
  [getLanguage, getFlights],
  (language, flights) => flights.map(flight => {
    const { statusText } = flight

    return {
      ...flight,
    }
  })
)

export default getFormattedFlights