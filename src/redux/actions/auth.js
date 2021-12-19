import axios from 'axios';
import authAPI from '../../api/authAPI';
import { authenticate } from '../../pages/Auth';
import { toast } from 'react-toastify';
import {
  FETCH_LOGIN_REQEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_ERROR,
  FETCH_REGISTER_SUCCESS,
  FETCH_LOGIN_GOOGLE,
  CHANGE_PASSWORD_SUCCSES,
  CHANGE_PASSWORD_ERROR,
  PASSWORD_STAFF_SUCCESS,
  PASSWORD_STAFF_ERROR,
  RESET_PASSWORD,
  CHANGE_PASSWORD_RESET,
  CHANGE_INFOR_USER_SUCCESS,
  CHANGE_INFOR_USER_ERROR,
  CHANGE_INFOR_STAFF_SUCCESS,
  CHANGE_INFOR_STAFF_ERROR,
} from '../constants/ContansLogin';
import { useHistory } from 'react-router-dom';

export const loginAuth = (logins, setRedirectToRef, setLoading) => async (dispatch) => {
  dispatch({ type: FETCH_LOGIN_REQEST });
  await authAPI
    .signin(logins)
    .then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
        dispatch({
          type: FETCH_LOGIN_ERROR,
          payload: response.data.error,
        });
        toast.error(response.data.error);
        setLoading(false);
      } else {
        authenticate(response.data, () => {
          setRedirectToRef(true);
          dispatch({
            type: FETCH_LOGIN_SUCCESS,
            payload: response.data,
          });
          toast.success(response.data.success);
          setLoading(true);
        });
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

// RESGITTER
export const regiterAuth = (regiter, setSusscces) => async (dispatch) => {
  await authAPI
    .signup(regiter)
    .then((response) => {
      dispatch({ type: FETCH_REGISTER_SUCCESS, payload: response.data });
      toast.success(response.data.msg);
      setSusscces(true);
    })
    .catch((error) => {
      toast.error(error.response.data.msg);
      setSusscces(false);
    });
};

// ChangePassword
export const changePassWord = (changePass) => async (dispatch) => {
  try {
    await authAPI.changePassword(changePass).then((response) => {
      if (response.data.error) {
        dispatch({
          type: CHANGE_PASSWORD_ERROR,
          payload: response.data.error,
        });
        toast.error(response.data.error);
      } else if (response.data) {
        dispatch({
          type: CHANGE_PASSWORD_SUCCSES,
          payload: response.data,
        });
        toast.success(response.data.success);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// ChangePasSWordStaff
export const changePassWordStaff = (changePassStaff) => async (dispatch) => {
  try {
    await authAPI.changePassWordStaff(changePassStaff).then((response) => {
      if (response.data.error) {
        dispatch({
          type: PASSWORD_STAFF_ERROR,
          payload: response.data.error,
        });
        toast.error(response.data.error);
      } else if (response.data) {
        dispatch({
          type: PASSWORD_STAFF_SUCCESS,
          payload: response.data,
        });
        toast.success(response.data.success);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Reset Password
export const resetPassWord = (passNew, setLoading) => async (dispatch) => {
  try {
    const { data } = await axios.post(`http://localhost:8000/api/forgot-password`, passNew);
    dispatch({
      type: RESET_PASSWORD,
      payload: data.status,
    });
    if (data.status) {
      toast.success(data.status);
      setLoading(true);
      setLoading(false);
    } else {
      toast.error(data.error);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

// Reset Password ChanpassWord
export const resetPasswordChangePass = (resetPass) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8000/api/reset-password`, resetPass).then((response) => {
      dispatch({
        type: CHANGE_PASSWORD_RESET,
        payload: response.data,
      });
      toast.success(response.data.message);
      setTimeout(() => {
      window.location = '/login'
      }, 2000);
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
// Login google
export const loginGoogle = (googleLogin, setRedirectToRef) => async (dispatch) => {
  try {
    const data = await authAPI.loginGoogle(googleLogin);
    localStorage.setItem('token', JSON.stringify(data.data.user));
    setRedirectToRef(true);
    dispatch({ type: FETCH_LOGIN_GOOGLE, payload: data.data.user });
  } catch (error) {
    console.log(error);
  }
};

// User change Info
export const userInfo = (userInfoChange) => async (dispatch) => {
  try {
    const data = await authAPI.userInfor(userInfoChange);
    localStorage.setItem('token', JSON.stringify(data.data));
    dispatch({
      type: CHANGE_INFOR_USER_SUCCESS,
      payload: data.data,
    });
    toast.success(data.data.msg);
  } catch (error) {
    dispatch({
      type: CHANGE_INFOR_USER_ERROR,
      payload: error.data.msg,
    });
  }
};

// Staff change Info
export const staffInfo = (staffInfoChange) => async (dispatch) => {
  try {
    const data = await authAPI.staffInfor(staffInfoChange);
    localStorage.setItem('token', JSON.stringify(data.data));
    dispatch({
      type: CHANGE_INFOR_STAFF_SUCCESS,
      payload: data.data,
    });
    toast.success(data.data.msg);
  } catch (error) {
    dispatch({
      type: CHANGE_INFOR_STAFF_ERROR,
      payload: error.data.msg,
    });
    toast.error(error.data.msg);
  }
};
