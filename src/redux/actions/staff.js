import StaffAPI from '../../api/staffAPI';

export const getStaff = () => async (dispatch) => {
  try {
    const { data } = await StaffAPI.getAll();
    dispatch({ type: 'GET_STAFF', payload: data });
  } catch (error) {
    console.log(error);
  }
};