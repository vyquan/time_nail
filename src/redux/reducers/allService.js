const initialState = {
    services: [],
  };
  
  const AllServiceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_SERVICE':
        return { ...state, services: action.payload };
        default: 
        return state
    }
  };
  export default AllServiceReducer;