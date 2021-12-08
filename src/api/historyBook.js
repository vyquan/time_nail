import { axiosClient } from './axiosClient';

const historyBookAPI = {
  getHistoryMember(id) {
    const url = `/bill/${id}`;
    return axiosClient.get(url);
  },
};
export default historyBookAPI;
