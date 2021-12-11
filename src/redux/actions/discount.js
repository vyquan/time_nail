import DiscountAPI from '../../api/discountAPI';
import { DISCOUNT } from '../constants/ContansLogin';

export const Discount = (discount,setErrorhandle) => async (dispatch) => {
  try {
    const { data } = await DiscountAPI.add(discount).then({
      
    })
    dispatch({ type: DISCOUNT, payload: data });
    setErrorhandle({error: true, message: data.msg})
  } catch (error) {
    console.log(error);
  }
};
