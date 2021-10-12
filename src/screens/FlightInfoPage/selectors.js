import { createSelector } from 'reselect'

import { TIME_BOUND_BY_MINUTES } from './reducer/flightInfo';

const getPrevArrivalfFromBound = ({ flightInfo }) => flightInfo.prevArrivalBounds.from
const getPrevDepartureFromBound = ({ flightInfo }) => flightInfo.prevDepartureBounds.from

export const showPrevFlightBtn = createSelector(
  [getPrevDepartureFromBound, getPrevArrivalfFromBound],
  (departureFrom, arrivalFrom) => {
    return {
      departure: departureFrom >= TIME_BOUND_BY_MINUTES.MIN_DEPARTURE_FROM,
      arrival: arrivalFrom >= TIME_BOUND_BY_MINUTES.MIN_ARRIVAL_FROM
    }
  }
)