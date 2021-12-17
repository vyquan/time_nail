import { axiosClient } from './axiosClient';

const StaffAPI = {
  getAll() {
    const url = `/list-staff`;
    return axiosClient.get(url);
  },
  checkUnavailable(data){
    const url = '/unavailable';
    return axiosClient.post(url,data)
  }
};
export default StaffAPI;
