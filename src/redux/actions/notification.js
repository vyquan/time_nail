import NotificationAPI from '../../api/notification';
import { isAuthenTicate } from '../../pages/Auth';
import { NOTIFICATION } from '../constants/ContansLogin';

export const notifiCation = (setNotifications) => async (dispatch) => {
  try {
    const { data } = await NotificationAPI.get(isAuthenTicate().user ? isAuthenTicate().user.id : isAuthenTicate().id);
    dispatch({
      type: NOTIFICATION,
      payload: data,
    });
    setNotifications(data);
  } catch (error) {
    console.log(error);
  }
};
