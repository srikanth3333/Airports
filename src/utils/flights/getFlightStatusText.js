import { isEmpty } from 'lodash'

import { DEFAULT_STATUS_TEXT } from '../../general/constants/flightStatuses'

export default (statusText) => isEmpty(statusText) ? DEFAULT_STATUS_TEXT : statusText
