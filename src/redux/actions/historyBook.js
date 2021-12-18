import historyBookAPI from '../../api/historyBook';
import { HISTORY_BOOK_STAFF, HISTORY_BOOK_INFO, HISTORY_BILL_DETAIL } from '../constants/ContansLogin';

export const historyBookInfo = (id) => async (dispatch) => {
  try {
    const { data } = await historyBookAPI.getHistoryMember(id);
    dispatch({
      type: HISTORY_BOOK_INFO,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const historyBillDetail = (id) => async (dispatch) => {
  try {
    const {data} = await historyBookAPI.getBillDetail(id);
   // console.log(data.bill.total_bill)
    dispatch({
      type: HISTORY_BILL_DETAIL,
      payload: data
    })

  } catch (error) {
    console.log(error);
  }
}


export const historyBookStaff = (id) => async (dispatch) => {
  try {
    const { data } = await historyBookAPI.getHistoryMember(id);
    dispatch({
      type: HISTORY_BOOK_STAFF,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
