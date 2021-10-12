import { get, isArray } from 'lodash'

import {getAssestImages} from '../../services/api-end-points'

const getTailImages = state => state.flightInfo.tailImages

export default (state, flightNumber) => {
  const tailImages = getTailImages(state)
  if(flightNumber && isArray(tailImages)) {
    const code = flightNumber.split(" ", 1)
    let tail = tailImages.find(function(item){
      return (item.code==code)
    })
    return tail ? {uri: getAssestImages() + get(tail, 'image', '').replace(/\\/g, '/')} : require('../../assets/Images/Icons/_DefaultFlight_KLIA.png')
  } else {
    return require('../../assets/Images/Icons/_DefaultFlight_KLIA.png')
  }
}
