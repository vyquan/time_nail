import feedbackAPI from '../../api/feedback';
import { FEEDBACK } from '../constants/ContansLogin';
import { toast } from 'react-toastify';

export const feedback = (Feedback) => async (dispatch) => {
  try {
    const { data } = await feedbackAPI.add(Feedback);
    console.log(data);
    dispatch({
      type: FEEDBACK,
      payload: data,
    });
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
    toast.error(error.data.msg);
  }
};
