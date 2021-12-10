
import { FETCH_REGISTER_SUCCESS } from '../constants/ContansLogin';

const initialState = {
  message: '',
  regiter: [],
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGISTER_SUCCESS:
      return {
        ...state,
        regiter: action.payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
