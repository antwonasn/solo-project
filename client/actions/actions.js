import { SET_SELECTED_ITEM, SET_GREETING, ADD_CARD } from '../constants/actionTypes.js';
import { v4 as uuidv4 } from 'uuid';

export const setGreeting = (message) => ({
  type: SET_GREETING,
  payload: message,
});

export const selectValue = (selectedValue) => ({
  type: SET_SELECTED_ITEM,
  payload: selectedValue,
});

export const addNewCard = (cardData) => ({
  type: ADD_CARD,
  payload: { ...cardData, id: uuidv4() },
});