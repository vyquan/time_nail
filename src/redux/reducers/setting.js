const initialState = {
    setting: [],
  };
  
  const settingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_SETTING':
        return { ...state, setting: action.payload };
        default: 
        return state
    }
  };
  export default settingReducer;
  