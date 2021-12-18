import {NOTIFICATION, NOTIFICATION_ONE, NOTIFICATION_ALL} from '../constants/ContansLogin'

const initialState = {
    notifiCation: []
}

const notifiCationReducer = (state = initialState, action) => {
  switch(action.type) {
      case NOTIFICATION:
      return {
            ...state,
            notifiCation:  [...action.payload]
      }
      case NOTIFICATION_ONE:
          return { 
              ...state,
            notifiCation: [...action.payload]
          }
       case NOTIFICATION_ALL:
         return {
          ...state,
          notifiCation: [...action.payload]
         }   
      default:
          return state
  }
}
export default notifiCationReducer