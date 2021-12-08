import AllServiceAPI from '../../api/allServiceAPI';

export const getAllService = () => async (dispatch) => {
  try {
    const { data } = await AllServiceAPI.getAll();
    dispatch({ type: 'GET_SERVICE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
