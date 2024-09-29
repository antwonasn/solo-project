import { combineReducers } from 'redux';
import greetingReducer from './greetingReducer'; // Create this file next

const rootReducer = combineReducers({
    state: greetingReducer,
});

export default rootReducer;