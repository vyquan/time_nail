const initialState = {
  services: [],
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SERVICE':
      return { ...state, services: action.payload };
    case 'ID-SERVICE':
      return { ...state, services: action.payload };  
      default: 
      return state
  }
};
export default serviceReducer;
