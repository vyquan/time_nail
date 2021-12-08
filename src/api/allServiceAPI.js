import { axiosClient } from './axiosClient';

const AllServiceAPI = {
  getAll() {
    const url = '/service';
    return axiosClient.get(url);
  },
};
export default AllServiceAPI;
