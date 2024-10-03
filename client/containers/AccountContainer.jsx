import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountCard from '../components/AccountCard.jsx';

const StyledDiv = styled.div`
  padding: 20px;
  border: 1.5px solid; // Keep the border defined here
`;

const StyledForm = styled.form`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
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
      <h1>Accounts</h1>
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
      <button onClick={navigateToAnotherPage}>Return</button>
    </StyledDiv>
  );
};
export default AccountContainer;
