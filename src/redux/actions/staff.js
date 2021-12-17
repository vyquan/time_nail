import StaffAPI from '../../api/staffAPI';

export const getStaff = () => async (dispatch) => {
  try {
    const { data } = await StaffAPI.getAll();
    dispatch({ type: 'GET_STAFF', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const checkUnavailable = (checkUnavailable, setTimeUnavailable) => async (dispatch) => {
  try {
    const { data } = await StaffAPI.checkUnavailable(checkUnavailable);
    dispatch({ type: 'CHECK_UNAVAILABLE', payload: data });
    setTimeUnavailable(data);
  } catch (error) {
    console.log(error);
  }
};
