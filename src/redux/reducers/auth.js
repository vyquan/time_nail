
import {
  FETCH_LOGIN_REQEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_ERROR,
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

const initialState = {
  requesting: false,
  succsess: false,
  message: '',
  login: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        requesting: false,
        succsess: true,
        login: action.payload,
      };
    case FETCH_LOGIN_ERROR:
      return {
        ...state,
        requesting: false,
        succsess: false,
        message: action.payload,
      };
    case CHANGE_PASSWORD_SUCCSES:
      return {
        ...state,
        requesting: false,
        succsess: true,
        login: action.payload,
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        requesting: false,
        succsess: false,
        message: action.payload,
      };
    case FETCH_LOGIN_GOOGLE:
      return {
        ...state,
        requesting: false,
        succsess: true,
        login: action.payload,
      };
    case PASSWORD_STAFF_SUCCESS:
      return {
        ...state,
        requesting: false,
        succsess: true,
        login: action.payload,
      };
    case PASSWORD_STAFF_ERROR:
      return {
        ...state,
        requesting: false,
        succsess: false,
        message: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        requesting: false,
        succsess: true,
        message: action.payload,
      };
    case CHANGE_PASSWORD_RESET:
      return {
        ...state,
        requesting: false,
        succsess: true,
        login: action.payload,
      };
    case CHANGE_INFOR_USER_SUCCESS:
      return {
        ...state,
        requesting: false,
        succsess: true,
        message: action.payload,
      };
    case CHANGE_INFOR_USER_ERROR:
      return {
        ...state,
        requesting: false,
        succsess: false,
        message: action.payload,
      };
    case CHANGE_INFOR_STAFF_SUCCESS:
      return {
        ...state,
        requesting: false,
        succsess: true,
        message: action.payload,
      };
    case CHANGE_INFOR_STAFF_ERROR:
      return {
        ...state,
        requesting: false,
        succsess: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
