import {NOTIFICATION} from '../constants/ContansLogin'

const initialState = {
    notifiCation: []
}

const notifiCationReducer = (state = initialState, action) => {
  switch(action.type) {
      case NOTIFICATION:
      return {
          ...state,
          notifiCation: action.payload
      }
      default:
          return state
  }
}
export default notifiCationReducer