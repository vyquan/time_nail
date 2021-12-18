import { HISTORY_BOOK_STAFF, HISTORY_BOOK_INFO, HISTORY_BILL_DETAIL, Cancel_Bill } from '../constants/ContansLogin';

const initialState = {
  listbookHistory: [],
  billDetail: []
};

const hisToryBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_BOOK_INFO:
      return {
        ...state,
        listbookHistory: [...state.listbookHistory, action.payload]
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
    case Cancel_Bill:
      return {
        ...state,
        listbookHistory: state.listbookHistory.findIndex(item => item.status_bill !== action.payload.status_bill)
      }  
    default:
      return state;
  }
};
export default hisToryBookReducer;
