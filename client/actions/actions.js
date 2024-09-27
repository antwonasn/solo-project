import { SET_SELECTED_ITEM, SET_GREETING } from '../constants/actionTypes.js';

export const setGreeting = (message) => ({
  type: SET_GREETING,
  payload: message,
});

export const selectValue = (selectedValue) => ({
  type: SET_SELECTED_ITEM,
  payload: selectedValue,
});