import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/actions.js';

const MainContainer = () => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.greeting.selectedItem); 

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    dispatch(actions.selectValue(selectedValue)); 
    console.log(selectedItem);
  };

  return (
    <div>
      <select onChange={handleChange} value={selectedItem || ''}>
        <option value="">Select an item</option>
        <option value="item1">Item 1</option>
        <option value="item2">Item 2</option>
        <option value="item3">Item 3</option>
      </select>
      <p>You selected: {selectedItem}</p>
    </div>
  );
};

export default MainContainer;