import { axiosClient } from './axiosClient';

const feedbackAPI = {
  add(feedback) {
    const url = `/feedback`;
    return axiosClient.post(url, feedback);
  },
};

export default feedbackAPI;
