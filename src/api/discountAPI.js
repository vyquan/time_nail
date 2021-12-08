import { axiosClient } from './axiosClient';

const DiscountAPI = {
  add(discount) {
    const url = `/discount`;
    return axiosClient.post(url, discount);
  },
};

export default DiscountAPI;
