import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions/actions.js';
import styled from 'styled-components';
import Card from '../components/Card.jsx';
import { useNavigate } from 'react-router-dom';

// Create a styled select component

const StyledSelect = styled.select`
  padding: 12px;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 23px;
  margin-bottom: 10px;
  max-width: 32%;
  background-color: #f1f1f1;

  display: flex;
  justify-content: center;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const HeaderTitle = styled.h1`
  color: black; /* Change the text color to your preference */
  text-align: center; /* Center the text */
  margin: 20px auto; /* Center the header and add some margin */
  max-width: 600px; /* Set a max-width to control the size */
`;

const StyledForm = styled.form`
  padding: 20px;
  border-radius: 8px;
  background-color: #fafafa;
  margin-top: 10px;
  margin-bottom: 20px;
  margin: auto;
  width: 100%;
  text-align: center;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  label {
    margin: auto;
  }

  input[type='text'],
  input[type='submit'] {
    display: block;
    width: 40%;
    padding: 12px;
    margin: 10px 0;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    border: 2px solid #ddd;
    background-color: #f1f1f1;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }

  input[type='submit'] {
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; // Center cards horizontally
  align-items: flex-start; // Align cards at the top
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // Center the buttons horizontally
  margin: 20px 0; // Optional: Add vertical margin to space out from form
`;

const StyledButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  width: 30%;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 5px; // Reduced margin to decrease space between buttons

  &:hover {
    background-color: #0056b3;
  }
`;

const MainContainerDiv = styled.div`

  
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
    selectedItem: '',
    accountType: '',
    taxBracket: '',
    accountName: '',
    accountSummary: '',
  });

  const addCard = (e) => {
    e.preventDefault();
    {
      dispatch(
        actions.addNewCard({
          selectedItem: selectedItem,
          taxBracket: formData.taxBracket,
          accountType: formData.accountType,
          accountName: formData.accountName,
          accountSummary: formData.accountSummary,
        })
      );
      console.log('Card dispatched:', {
        selectedItem: selectedItem,
        taxBracket: formData.taxBracket,
        accountType: formData.accountType,
        accountName: formData.accountName,
        accountSummary: formData.accountSummary,
      });
      setFormData({
        accountType: '',
        taxBracket: '',
        accountName: '',
        accountSummary: '',
      });
    }
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
    <MainContainerDiv>
      <ButtonContainer>
        <StyledButton onClick={navigateToAnotherPage}>
          Login/Signup
        </StyledButton>
      </ButtonContainer>

      <StyledForm onSubmit={(e) => addCard(e)}>
        <label htmlFor='accountType:'>Enter account name:</label>
        <input
          type='text'
          id='accountName'
          required
          name='accountName'
          value={formData.accountName}
          onChange={handleInputChange}
        />
        <label htmlFor='accountType:'>Enter account type:</label>
        <input
          type='text'
          id='accountType'
          required
          name='accountType'
          value={formData.accountType}
          onChange={handleInputChange}
        />
        <label htmlFor='accountSummary:'>Enter a brief summary:</label>
        <input
          type='text'
          id='accountSummary'
          required
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
      <HeaderTitle>Learn about Accounts!</HeaderTitle>
      <StyledSelect onChange={handleChange} value={selectedItem || ''}>
        <option value=''>Select Tax Bracket</option>
        <option value='Low'>Low</option>
        <option value='Middle'>Middle</option>
        <option value='High'>High</option>
      </StyledSelect>

      <StyledDiv>
        {cards.map((card) => (
          <Card
            key={card.id} // Use the unique ID here
            accountType={card.accountType}
            taxBracket={card.taxBracket}
            accountName={card.accountName}
            accountSummary={card.accountSummary}
          />
        ))}
      </StyledDiv>
      <h4>
        *Created by a washed Ex-Rookie Financial Advisor, take with a bucket of
        salt*
      </h4>
    </MainContainerDiv>
  );
};

export default MainContainer;
