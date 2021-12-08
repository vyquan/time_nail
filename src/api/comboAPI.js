import { axiosClient } from './axiosClient';

const ComboAPI = {
  getAll() {
    const url = `/combo`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/combo/show/${id}`;
    return axiosClient.get(url);
  },
};
export default ComboAPI;
