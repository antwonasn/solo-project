import { combineReducers } from 'redux';
import greetingReducer from './greetingReducer'; // Create this file next

const rootReducer = combineReducers({
    greeting: greetingReducer,
});

export default rootReducer;