import {FEEDBACK, GET_FEEDBACK} from '../constants/ContansLogin';
const initialState = {
    message: "",
    feedback: []
};

const FeedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FEEDBACK: 
       return {
         ...state,
         feedback: action.payload
       }
      case FEEDBACK:
        return { ...state, message: action.payload};
        default: 
        return state;
    }
  };
  export default FeedbackReducer;
  