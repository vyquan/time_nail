import GalleryAPI from '../../api/galleryAPI';

export const Gallery = () => async (dispatch) => {
  try {
    const { data } = await GalleryAPI.getAll();
    dispatch({ type: 'GET_GALLERY', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getIdGallery = (id) => async (dispatch) => {
  try {
    const { data } = await GalleryAPI.get(id);
    dispatch({ type: 'ID-GALLERY', payload: data });
  } catch (error) {
    console.log(error);
  }
};
