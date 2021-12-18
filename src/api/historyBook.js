import { axiosClient } from './axiosClient';

const historyBookAPI = {
  getHistoryMember(id) {
    const url = `/bill/${id}`;
    return axiosClient.get(url);
  },
  getBillDetail(id) {
    const url = `/bill/show/${id}`;
    return axiosClient.get(url);
  },
  CancelBill(id) {
    const url = `/bill/cancel/${id}`;
    return axiosClient.get(url);
  }
};
export default historyBookAPI;
