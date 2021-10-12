import { PromotionAction } from "./action_types";

const initialState = {
  loading: false,
  PromotionData: "",
  PromotionDataError: "",
  TerminalState: "KLIA",
};

const PromotionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PromotionAction.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PromotionAction.GET_PROMOTIONS_SUCESS:
      return {
        ...state,
        loading: false,
        PromotionData: action.payload,
        PromotionDataError: "",
      };
    case PromotionAction.GET_PROMOTIONS_ERROR:
      return {
        ...state,
        loading: false,
        PromotionDataError: action.payload,
      };
    case PromotionAction.TERMINAL_STATE:
      return {
        ...state,
        TerminalState: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default PromotionReducer;
