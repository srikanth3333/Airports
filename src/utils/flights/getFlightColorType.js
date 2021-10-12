import { get } from 'lodash'

import { statusCodeToColorStatus, DEFAULT_COLOR_TYPE } from '../../general/constants/flightStatuses'

export default (code = '') => get(statusCodeToColorStatus, code, DEFAULT_COLOR_TYPE)