import {FEEDBACK, GET_FEEDBACK, GET_FEEDBACK_DETAIL} from '../constants/ContansLogin';
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
      case  GET_FEEDBACK_DETAIL:
        return {...state,
          feedback: action.payload
        }
        default: 
        return state;
    }
  };
  export default FeedbackReducer;
  