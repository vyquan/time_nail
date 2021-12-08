import DiscountAPI from '../../api/discountAPI';
import { DISCOUNT } from '../constants/ContansLogin';

export const Discount = (discount) => async (dispatch) => {
  try {
    const { data } = await DiscountAPI.add(discount).then((res) =>{

    });
    dispatch({ type: DISCOUNT, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
