import { combineReducers } from 'redux';
import { uiReducer } from '../ducks/ui';

export default combineReducers({
    ui: uiReducer
});