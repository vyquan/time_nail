import NewsAPI from '../../api/newsAPI';

export const getNews = () => async (dispatch) => {
  try {
    const { data } = await NewsAPI.getAll();
    dispatch({ type: 'GET_BLOG', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getIdNews = (id) => async (dispatch) => {
  try {
    const { data } = await NewsAPI.get(id);
    dispatch({ type: 'ID-BLOG', payload: data });
  } catch (error) {
    console.log(error);
  }
};