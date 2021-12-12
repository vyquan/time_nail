import BookingAPI from "../../api/bookingAPI";
import { BOOKING } from "../constants/ContansLogin";
import { toast } from 'react-toastify';

export const Booking = (booking) => async (dispatch) => {
  try {
    const { data } = await BookingAPI.add(booking)
    dispatch({ type: BOOKING, payload: data });
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
  }
};