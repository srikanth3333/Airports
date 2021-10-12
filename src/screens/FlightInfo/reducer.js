import { FlightInfoAction } from "./action_types";

const initialState = {
  loading: true,
  flightdata: [],
  flightdataError:false,
};

export const FlightInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FlightInfoAction.FLIGHTDATA_SUCCESS: 
      return {
        ...state,
        loading: false,
        flightdata: action.payload,
        flightdataError:false,
      };
      case FlightInfoAction.FLIGHTDATA_ERROR:
        return {
          ...state,
          loading: false,
          flightdataError:true,
        };
  
    default: {
      return state;
    }
  }
};

export const FlightDepartureInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FlightInfoAction.FLIGHT_DEPARTURE_SUCCESS:
      return {
        ...state,
        loading: false,
        flightdata: action.payload,
        flightdataError:false,
      };
      case FlightInfoAction.FLIGHT_DEPARTURE_ERROR:
        return {
          ...state,
          loading: false,
          flightdataError:true,
        };
  
    default: {
      return state;
    }
  }
};

// Exports
export default FlightInfoReducer;
