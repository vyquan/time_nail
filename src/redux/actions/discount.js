import DiscountAPI from '../../api/discountAPI';
import { DISCOUNT } from '../constants/ContansLogin';

export const Discount = (discount, setErrorhandle, setDataDiscount) => async (dispatch) => {
  try {
    const { data } = await DiscountAPI.add(discount);
    dispatch({ type: DISCOUNT, payload: data });
    setErrorhandle({ error: true, message: data.msg });
    setDataDiscount(data);
  } catch (error) {
    console.log(error);
  }
};
