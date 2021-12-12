import { axiosClient } from './axiosClient';

const NotificationAPI = {
  get(id) {
    const url = `/all-notification/${id}`;
    return axiosClient.get(url);
  },
};
export default NotificationAPI;