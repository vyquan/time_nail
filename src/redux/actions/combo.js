import ComboAPI from '../../api/comboAPI';

// Định nghĩa ra 1 action để fetch API combo-Product
export const getCombo = () => async (dispatch) => {
  try {
    const { data } = await ComboAPI.getAll();
    dispatch({ type: 'GET_COMBO', payload: data });
    //  console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getIdCombo = (id) => async (dispatch) => {
  try {
    const { data } = await ComboAPI.get(id);
    dispatch({ type: 'ID_COMBO', payload: data });
  } catch (error) {
    console.log(error);
  }
};
