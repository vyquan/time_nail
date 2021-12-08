import { axiosClient } from './axiosClient';

const authAPI = {
  signin(user) {
    const url = `/login`;
    return axiosClient.post(url, user);
  },
  signup(regiter) {
    const url = `/register`;
    return axiosClient.post(url, regiter);
  },
  loginGoogle(logingg) {
    const url = `/login-google`;
    return axiosClient.post(url, logingg);
  },
  changePassword(changePass) {
    const url = `/user-info/password`;
    return axiosClient.post(url, changePass);
  },
  changePassWordStaff(changePassStaff) {
    const url = `/staff-info/password`;
    return axiosClient.post(url, changePassStaff);
  },
  userInfor(infoUser) {
    const url = `/user-info/info`;
    return axiosClient.post(url, infoUser);
  },
  staffInfor(inforStaff) {
    const url = `/staff-info/info`;
    return axiosClient.post(url, inforStaff);
  },
};
export default authAPI;
