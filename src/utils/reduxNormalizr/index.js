import { normalize, schema } from 'normalizr'

export const normalizeAlertsAndNotices = (data = []) => {
  try {
    const itemSchema = new schema.Entity('inbox', {}, {idAttribute: 'path'})
    const arraySchema = new schema.Array(itemSchema)
    return normalize(data, arraySchema)
  } catch (e) {
    console.log(e)
    return {}
  }
}

export const normalizeFlightStatuses = (flightStatuses = []) => {
  console.log('flightStatusesssss', flightStatuses)
  try {
    const codeshareFlightSchema = new schema.Entity('codeshareFlights', {}, {
      idAttribute: 'afsKey'
    })
    const flightSchema = new schema.Entity('flights', {
      codeShareFlights: [ codeshareFlightSchema ]
    }, {
      idAttribute: 'afsKey'
    })
    const flightListSchema = new schema.Array(flightSchema)
    return normalize(flightStatuses, flightListSchema)
  } catch (e) {
    console.log(e)
    return {}
  }
}