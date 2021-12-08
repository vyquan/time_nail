import { axiosClient } from './axiosClient';

const SettingAPI = {
  getAll() {
    const url = `/setting`;
    return axiosClient.get(url);
  },
};

export default SettingAPI;
