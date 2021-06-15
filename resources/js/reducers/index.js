import { combineReducers } from 'redux';
import app from './appReducer';
import auth from './authReducer';
import chat from './chatReducer';
const appStore = combineReducers({
    app,
    auth,
    chat,
});
export default appStore;
