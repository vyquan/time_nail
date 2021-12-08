import { axiosClient } from './axiosClient';

const NewsAPI = {
  getAll() {
    const url = `/blog`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/blog/show/${id}`;
    return axiosClient.get(url);
  },
};
export default NewsAPI;
