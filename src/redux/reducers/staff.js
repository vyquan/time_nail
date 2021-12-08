const initialState = {
    staff: [],
  };
  
  const staffReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_STAFF':
        return { ...state, staff: action.payload };
        default: 
        return state
    }
  };
  export default staffReducer;