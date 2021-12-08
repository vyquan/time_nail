import { axiosClient } from './axiosClient';

const StaffAPI = {
  getAll() {
    const url = `/list-staff`;
    return axiosClient.get(url);
  },
};
export default StaffAPI;
