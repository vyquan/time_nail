import { HISTORY_BOOK_STAFF, HISTORY_BOOK_INFO, HISTORY_BILL_DETAIL } from '../constants/ContansLogin';

const initialState = {
  listbookHistory: [],
  billDetail: []
};

const hisToryBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_BOOK_INFO:
      return {
        ...state,
        listbookHistory: action.payload,
      };
     case HISTORY_BILL_DETAIL:
       return {
         ...state,
         billDetail: action.payload
       }
    case HISTORY_BOOK_STAFF:
      return {
        ...state,
        listbookHistory: action.payload,
      };
    default:
      return state;
  }
};
export default hisToryBookReducer;
