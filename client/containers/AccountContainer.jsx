import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountCard from '../components/AccountCard.jsx';

const StyledSelect = styled.select`
  padding: 12px;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 23px;
  margin-bottom: 10px;
  max-width: 33%;
  background-color: #f1f1f1;
  border: 2px solid #ddd;
  display: flex;
  justify-content: center;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const StyledForm = styled.form`
  padding: 20px;
  border-radius: 8px;
  background-color: #fafafa;
  margin-top: 20px;
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
    width: 85%;
    padding: 12px;
    margin: 10px 0;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    font-size: 16px;
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

const HeaderTitle = styled.h1`
  color: black; /* Change the text color to white */
  margin: auto; /* Remove default margin for better alignment */
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column; // Align children in a column
  align-items: center; // Center align items horizontally
  gap: 20px; // Space between elements
  padding: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 5px; // Reduced margin to decrease space between buttons

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // Center the buttons horizontally
  margin: 20px 0; // Space above and below the button container
`;

const AccountContainer = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  console.log('userID from accounts', user);
  const navigateToAnotherPage = () => {
    navigate('/'); // Use the navigate function to go to another page
  };

  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    accountType: '',
    taxBracket: '',
    accountName: '',
    accountSummary: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // handler for account creation submit button
  const addAccount = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:3000/accounts/${user}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountName: formData.accountName,
          accountType: formData.accountType,
          accountSummary: formData.accountSummary,
          taxBracket: formData.taxBracket,
          userId: user,
        }),
      });

      if (response.ok) {
        const data = await response.json(); // Extract the response data
        console.log('Account created:', data); // Log the created account details
        setFormData({
          accountName: '',
          accountType: '',
          accountSummary: '',
          taxBracket: '',
        }); // Clear form only on success
        fetchAccounts();
      } // Get error message from response if available
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //use effect to render associated user's accounts
  const fetchAccounts = async () => {
    const endpoint = `http://localhost:3000/accounts/${user}`; // Adjust the endpoint based on your API
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        console.log('response from fetch call', data);
        setAccounts(data);
      } else {
        const errorData = await response.json();
        console.error('Error fetching accounts:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAccounts(); // Fetch accounts when the component mounts
    }
  }, [user]);
  console.log('accounts array', accounts);
  return (
    <StyledDiv>
      <StyledForm onSubmit={(e) => addAccount(e)}>
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
        <input type='submit' value='Create Account' />
      </StyledForm>
      <HeaderTitle>User Accounts</HeaderTitle>
      <ButtonContainer>
        <StyledButton onClick={navigateToAnotherPage}>Return</StyledButton>
      </ButtonContainer>

      <StyledDiv>
        {accounts.map((account) => (
          <AccountCard
            key={account.id} // Use the unique ID here
            accountType={account.account_type}
            taxBracket={account.tax_bracket}
            accountName={account.account_name}
            accountSummary={account.account_summary}
          />
        ))}
      </StyledDiv>
    </StyledDiv>
  );
};
export default AccountContainer;
