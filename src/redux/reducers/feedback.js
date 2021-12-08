import {FEEDBACK} from '../constants/ContansLogin';
const initialState = {
    message: ""
};

const FeedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case FEEDBACK:
        return { ...state, message: action.payload};
        default: 
        return state;
    }
  };
  export default FeedbackReducer;
  