import { axiosClient } from './axiosClient';

const feedbackAPI = {
  get() {
    const url = `/feedback`;
    return axiosClient.get(url);
  },
  add(feedback) {
    const url = `/feedback`;
    return axiosClient.post(url, feedback);
  },
  getDetail(id) {
    const url = `/feedback/show/${id}`;
    return axiosClient.get(url);
  }
};

export default feedbackAPI;
