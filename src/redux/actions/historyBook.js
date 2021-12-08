import historyBookAPI from '../../api/historyBook';
import { HISTORY_BOOK_STAFF, HISTORY_BOOK_INFO } from '../constants/ContansLogin';

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
