const initialState = {
    news: [],
  };
  
  const newsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_BLOG':
        return { ...state, news: action.payload };
      case 'ID_BLOG':
        return {...state, news: action.payload}; 

        default: 
        return state
    }
  };
  export default newsReducer;