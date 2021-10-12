import { KayAction } from "./action_types";

const initialState = {
  loading: true,
  kayData: "",
  QA:''
};

const KeyInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case KayAction.GET_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
        kayData: action.payload,
      };
      case KayAction.PUT_FAQ_QA:
        return {
          ...state,
          QA:action.payload
        };
    default: {
      return state;
    }
  }
};

export default KeyInfoReducer;
