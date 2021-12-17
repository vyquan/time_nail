import axios from 'axios';
import NotificationAPI from '../../api/notification';
import { isAuthenTicate } from '../../pages/Auth';
import {NOTIFICATION, NOTIFICATION_ONE, NOTIFICATION_ALL} from '../constants/ContansLogin';


export const notifiCation = () => async (dispatch) => {
    try {
        const {data} = await NotificationAPI.All(isAuthenTicate().user ? isAuthenTicate().user.id : isAuthenTicate().id);
        dispatch({
            type: NOTIFICATION,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
} 

export const notifiCateOne = (id) => async (dispatch) => {
    try {
      const {data} = await axios.get(`http://localhost:8000/api/read-client-notifi/${isAuthenTicate().user ? isAuthenTicate().user.id : isAuthenTicate().id}/${id}`)   
      dispatch({
          type: NOTIFICATION_ONE,
          payload: data
      })
    } catch (error) {
        console.log(error);
    }
}

export const notifiCateAll = () => async (dispatch) => {
    try {
        const {data} = await axios.get(`http://localhost:8000/api/read-client-all-notifi/${isAuthenTicate().user ? isAuthenTicate().user.id : isAuthenTicate().id}`);
        console.log(data);
        dispatch({
            type: NOTIFICATION_ALL,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}
