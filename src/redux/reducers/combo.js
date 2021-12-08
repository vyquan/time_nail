const initialState = {
    combos: [],
  };
  
  const comboReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_COMBO':
        return { ...state, combos: action.payload };
      case 'ID_COMBO':
        return {...state, combos: action.payload}; 

        default: 
        return state
    }
  };
  export default comboReducer;