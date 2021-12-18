const initialState = {
  gallery: [],
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GALLERY':
      return { ...state, gallery: action.payload };
    case 'ID_GALLERY':
      return { ...state, gallery: action.payload };
    default:
      return state;
  }
};
export default galleryReducer;
