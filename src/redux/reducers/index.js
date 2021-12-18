import {combineReducers} from 'redux';
import serviceReducer from './service';
import comboReducer from './combo';
import settingReducer from './setting';
import contactReducer from './contact';
import galleryReducer from './gallery';
import authReducer from './auth';
import registerReducer from './authRegister';
import newsReducer from './news';
import staffReducer from './staff';
import AllServiceReducer from './allService';
import bookingReducer from './booking';
import FeedbackReducer from './feedback';
import hisToryBookReducer from './historyBook';
import notifiCationReducer from './notifiCation'
const rootReducer = combineReducers({
    services: serviceReducer,
    AllService: AllServiceReducer,
    combos: comboReducer,
    setting: settingReducer,
    contact: contactReducer,
    gallery: galleryReducer,
    login: authReducer,
    register: registerReducer,
    news: newsReducer,
    staff: staffReducer,
    booking: bookingReducer,
    feedback: FeedbackReducer,
    listbookHistory: hisToryBookReducer,
    notifiCation: notifiCationReducer
});

export default rootReducer;