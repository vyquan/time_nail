import historyBookAPI from '../../api/historyBook';
import { HISTORY_BOOK_STAFF, HISTORY_BOOK_INFO, HISTORY_BILL_DETAIL , Cancel_Bill } from '../constants/ContansLogin';

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

export const cancelBill = (id) => async (dispatch) => {
  try {
    const {data} = await historyBookAPI.CancelBill(id);
    console.log(data);
    dispatch({
      type: Cancel_Bill,
      payload: data
    })
  } catch (error) {
    console.log(error);
  }
}
