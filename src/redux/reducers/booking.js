const initialState = {
    booking: [],
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BOOKING':
        return { ...state, booking: [...state.booking, action.payload] };
        default: 
        return state;
    }
  };
  export default bookingReducer;