import SettingAPI from '../../api/settingAPI';

export const setting = () => async (dispatch) => {
  try {
    const { data } = await SettingAPI.getAll();
    dispatch({ type: 'GET_SETTING', payload: data });
  } catch (error) {
    console.log(error);
  }
};
