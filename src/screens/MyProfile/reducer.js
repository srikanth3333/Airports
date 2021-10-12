import { ProfileAction } from "./action_types";

const initialState = {
  loading: false,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProfileAction.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default ProfileReducer;
