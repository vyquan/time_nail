import { axiosClient } from './axiosClient';

const GalleryAPI = {
  getAll() {
    const url = `/gallery-category`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/gallery/show/${id}`;
    return axiosClient.get(url);
  },
};
export default GalleryAPI;
