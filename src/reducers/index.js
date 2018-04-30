import { combineReducers } from 'redux';
import { uiReducer } from './ui';
import { authReducer } from './auth';
import { ajaxReducer } from './ajax';

export default combineReducers({
    ui: uiReducer,
    auth: authReducer,
    ajax: ajaxReducer
});