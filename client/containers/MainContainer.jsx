import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/actions.js';
import styled from 'styled-components';
import Card from '../components/Card.jsx';
import { useNavigate } from 'react-router-dom';

// Create a styled select component
const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const StyledDiv = styled.div`
  padding: 20px;
  border: 1.5px solid; // Keep the border defined here
`;

const MainContainer = () => {
  // Set up routing
  const navigate = useNavigate(); // Use useNavigate to create navigate function

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    dispatch(actions.selectValue(selectedValue));
  };

  const selectedItem = useSelector((state) => state.state.selectedItem);
  console.log('Selected item from Redux:', selectedItem);
  // set react states
  const [formData, setFormData] = useState({
    accountType: '',
    taxBracket: '',
  });

  const [cards, setCards] = useState([]);

  const addCard = (e) => {
    // {
    //   dispatch(actions.addNewCard({
    //     selectedItem,
    //     taxBracket: formData.taxBracket,
    //     accountType: formData.accountType,
    //   }));
    //   setFormData({ accountType: '', taxBracket: '' });
    // };

    e.preventDefault();
    setCards((prevCards) => [
      ...prevCards,
      <Card
        key={prevCards.length}
        selectedItem={selectedItem}
        taxBracket={formData.taxBracket}
        accountType={formData.accountType}
      />, // Pass selectedItem to new Card
    ]);
    setFormData({ accountType: '', taxBracket: '' });
  };

  const navigateToAnotherPage = () => {
    navigate('/accounts'); // Use the navigate function to go to another page
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <StyledSelect onChange={handleChange} value={selectedItem || ''}>
        <option value=''>Select Tax Bracket</option>
        <option value='Low'>Low</option>
        <option value='Middle'>Middle</option>
        <option value='High'>High</option>
      </StyledSelect>

      <StyledForm onSubmit={(e) => addCard(e)}>
        <label htmlFor='accountType:'>Enter account type:</label>
        <input
          type='text'
          id='accountType'
          name='accountType'
          value={formData.accountType}
          onChange={handleInputChange}
        />
        <label htmlFor='taxBracket'>Enter Tax Bracket:</label>
        <StyledSelect
          id='taxBracket'
          name='taxBracket'
          value={formData.taxBracket} // Use formData for form-controlled select
          onChange={handleInputChange}
        >
          <option value=''>Select Tax Bracket</option>
          <option value='Low'>Low</option>
          <option value='Middle'>Middle</option>
          <option value='High'>High</option>
        </StyledSelect>
        <br />
        <br />
        <input type='submit' value='Create Card' />
      </StyledForm>

      <button onClick={navigateToAnotherPage}>Accounts</button>
      <StyledDiv>{cards}</StyledDiv>
    </div>
  );
};

export default MainContainer;
