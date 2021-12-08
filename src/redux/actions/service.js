import ServiceCategoryAPI from '../../api/serviceAPI';

// Định nghĩa ra 1 action để fetch API service-Product
export const getService = () => async (dispatch) => {
  try {
    const { data } = await ServiceCategoryAPI.getAll();
    dispatch({ type: 'GET_SERVICE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getIdService = (id) => async (dispatch) => {
  try {
    const { data } = await ServiceCategoryAPI.get(id);
    dispatch({ type: 'ID-SERVICE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
