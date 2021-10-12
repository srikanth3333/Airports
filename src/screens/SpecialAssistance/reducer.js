import { SPECIAL_ASSISTANCE} from './types';
const initialState = {
  dataSA: {},
  SpecialNeedSuccess: false,
  SAerror: null
}

 const SpecialNeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPECIAL_ASSISTANCE.TRAVELLING_WITH_CHILD_SUCCESS:
      return {
        SpecialNeedSuccess: true,
        dataSA: action.payload
      };
    case SPECIAL_ASSISTANCE.TRAVELLING_WITH_CHILD_ERROR:
      return {
        SpecialNeedSuccess: false,
        SAerror: action.payload
      };

    default:
      return state;
  }
};

export default SpecialNeedReducer;
