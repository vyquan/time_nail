import DiscountAPI from '../../api/discountAPI';
import { DISCOUNT } from '../constants/ContansLogin';

export const Discount = (discount,setErrorhandle,setData) => async (dispatch) => {
  try {
    const { data } = await DiscountAPI.add(discount);
    dispatch({ type: DISCOUNT, payload: data });
    setErrorhandle({error: true, message: data.msg})
    setData(data);
  } catch (error) {
    console.log(error);
  }
};
