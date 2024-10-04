import { SET_SELECTED_ITEM, ADD_CARD } from '../constants/actionTypes.js';
import { v4 as uuidv4 } from 'uuid';


export const selectValue = (selectedValue) => ({
  type: SET_SELECTED_ITEM,
  payload: selectedValue,
});

export const addNewCard = (cardData) => ({
  type: ADD_CARD,
  payload: { ...cardData, id: uuidv4() },
});