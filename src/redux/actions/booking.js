import BookingAPI from "../../api/bookingAPI";
import { BOOKING } from "../constants/ContansLogin";

export const Booking = (booking) => async (dispatch) => {
  try {
    const { data } = await BookingAPI.add(booking)
    dispatch({ type: BOOKING, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};