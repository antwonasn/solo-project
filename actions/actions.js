import {SET_GREETING} from '../constants/actionTypes.js';

export const setGreeting = (message) => ({
    type: SET_GREETING,
    payload: message,
});