import feedbackAPI from '../../api/feedback';
import { FEEDBACK, GET_FEEDBACK, GET_FEEDBACK_DETAIL } from '../constants/ContansLogin';
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
// get Feedback

 export const getFeedback = () => async (dispatch) => {
   try {
       const {data} = await feedbackAPI.get();
       dispatch({
         type: GET_FEEDBACK,
         payload: data
       })
   } catch (error) {
     console.log(error);
   }
 }

 //get FeedBack detail

 export const getFeedback_Detail = (id) => async (dispatch) => {
   try {
     const {data} = await feedbackAPI.getDetail(id);
     dispatch({
       type: GET_FEEDBACK_DETAIL,
       payload: data
     })
   } catch (error) {
     console.log(error)
   }
 }
