import { createSelector } from 'reselect'
import { get, isEmpty } from 'lodash'

import { getAssestImages } from '../../services/api-end-points'

const isValidURL = (str) => {
  const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(str)
}

export const showsCTAButton = (details) => {
  return !isEmpty(get(details, 'callToAction.ctaLabel')) &&
    !isEmpty(get(details, 'callToAction.ctaTarget')) && isValidURL(get(details, 'callToAction.ctaTarget'))
}

export const formatPromotionDetails = (state, details) => {
  return {
    ...details,
    "description" : details.longDescription || details.shortDescription,
    photo: (isEmpty(details.bannerImage)) ?
      [] :
      [
        encodeURI(getAssestImages()+ get(details, 'bannerImage', '').replace(/\\/g, '')),
      ],
    "information": {
      "phone": get(details, 'contacts.0.phone', ''),
      "fax": get(details, 'contacts.0.fax', ''),
      "email": get(details, 'contacts.0.email', ''),
      "address": get(details, 'contacts.0.address', ''),
    },
    "extraInfo": {
      "opening_hours" : get(details, 'contacts.0.interval.0', '')
    }
  }
}

/* Location POIs for promotions */
const getAllLocationPOIs = state => state.terminal.placesAll || []

const getPromotionPOIPaths = createSelector(
  [formatPromotionDetails],
  ({ poiItemsList = [] }) => poiItemsList.map(poi => poi.name)
)

export const getLocationPOIsForPromotion = createSelector(
  [getAllLocationPOIs, getPromotionPOIPaths],
  (allPOIs, paths) => {
    const filteredPOIs = allPOIs.filter(poi => paths.includes(`/${poi.path}`))
    return filteredPOIs.map(poi => poi.path)
  }
)