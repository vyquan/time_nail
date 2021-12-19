import { axiosClient } from './axiosClient';

const SlideAPI = {
  getAll() {
    const url = `/slide`;
    return axiosClient.get(url);
  },
};
export default SlideAPI;
