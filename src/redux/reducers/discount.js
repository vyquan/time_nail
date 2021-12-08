const initialState = {
    discount: [],
};

const discountReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_DISCOUNT':
        return { ...state, discount: [...state.discount, action.payload] };
        default: 
        return state;
    }
  };
  export default discountReducer;
  