import { TransportType} from './types';
const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TransportType.TRANSPORT_SUCCESS:
      return { TransportSuccess: true, data: action.payload };

    case TransportType.TRANSPORT_ERROR:
      return { TransportSuccess: false, error: action.payload };

    case TransportType.GET_RATE_SUCCESS:
      return { GetRateSuccess: true, data: action.payload };
    
    case TransportType.GET_RATE_ERROR:
      return { GetRateSuccess: false, error: action.payload };

      case TransportType.POST_RATE_SUCCESS:
        return { PostRateSuccess: true, data: action.payload };
      
      case TransportType.POST_RATE_ERROR:
        return { PostRateSuccess: false, error: action.payload };
    default:
      return state;
  }
};