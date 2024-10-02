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
  const cards = useSelector((state) => state.state.cards);
  console.log('Selected item from Redux:', cards);
  // set react states
  const [formData, setFormData] = useState({
    accountType: '',
    taxBracket: '',
    accountName:'',
    accountSummary: '',
  });


  const addCard = (e) => {
    e.preventDefault();
    {
      dispatch(actions.addNewCard({
        selectedItem,
        taxBracket: formData.taxBracket,
        accountType: formData.accountType,
        accountName: formData.accountName,
        accountSummary: formData.accountSummary,
      }));
      setFormData({ accountType: '', taxBracket: '' , accountName: '', accountSummary:''});
    };
  };

  const navigateToAnotherPage = () => {
    navigate('/login'); // Use the navigate function to go to another page
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
      <label htmlFor='accountType:'>Enter account name:</label>
        <input
          type='text'
          id='accountName' required
          name='accountName'
          value={formData.accountName}
          onChange={handleInputChange}
        />
        <label htmlFor='accountType:'>Enter account type:</label>
        <input
          type='text'
          id='accountType' required
          name='accountType'
          value={formData.accountType}
          onChange={handleInputChange}
        />
        <label htmlFor='accountSummary:'>Enter a brief summary:</label>
        <input
          type='text'
          id='accountSummary' required
          name='accountSummary'
          value={formData.accountSummary}
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

      <button onClick={navigateToAnotherPage}>Login</button>
      <StyledDiv>{cards.map((card) => (
        <Card
          key={card.id} // Use the unique ID here
          accountType={card.accountType}
          taxBracket={card.taxBracket}
          accountName={card.accountName}
          accountSummary={card.accountSummary}
        />
      ))}</StyledDiv>
    </div>
  );
};

export default MainContainer;
