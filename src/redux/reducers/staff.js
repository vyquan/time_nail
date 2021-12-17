const initialState = {
    staff: [],
    unavailable: {},
  };
  
  const staffReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_STAFF':
        return { ...state, staff: action.payload };
      case 'CHECK_UNAVAILABLE':
        return { ...state, unavailable: action.payload };
        default: 
        return state
    }
  };
  export default staffReducer;