import { axiosClient } from './axiosClient';

const ServiceCategoryAPI = {
  getAll() {
    const url = `/cate-service`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/cate-service/show/${id}`;
    return axiosClient.get(url);
  },
};
export default ServiceCategoryAPI;
