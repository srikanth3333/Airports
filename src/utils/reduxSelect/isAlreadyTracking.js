import { createSelector } from 'reselect'
import { get, last, find } from 'lodash'

const getTrackedFlights = state => get(state, 'push.topics.rel.topics', {})

const getAfsKey = (state, id) => id.toString()

const isAlreadyTracking = createSelector([
    getTrackedFlights,
    getAfsKey
  ],
  (trackedFlights, id) => {
    return (trackedFlights && Object.keys(trackedFlights).includes(id.toString()))
  }
)

export default isAlreadyTracking