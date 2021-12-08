import { axiosClient } from './axiosClient';

const BookingAPI = {
  add(booking) {
    const url = `/bill`;
    return axiosClient.post(url, booking);
  },
};

export default BookingAPI;
