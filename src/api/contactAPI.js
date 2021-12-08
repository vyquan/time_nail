import { axiosClient } from './axiosClient';

const ContactAPI = {
  add(contact) {
    const url = `/contact`;
    return axiosClient.post(url, contact);
  },
};

export default ContactAPI;
