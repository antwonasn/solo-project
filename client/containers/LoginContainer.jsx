import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 20px;
  border-radius: 8px;
  background-color: #fafafa;
  margin-top: 20px;
  margin-bottom: 20px;
  margin: auto;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  input[type="text"], input[type="password"] {
    display: block;
    width: 85%;
    padding: 12px;
    margin: 10px 0;
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

  input[type="submit"] {
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
  form {
    margin-top: 20px; // Apply margin-top to form inside this div
  }
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
  margin: 20px 0; // Optional: Add vertical margin to space out from form
`;

const LoginContainer = () => {
  const [formData, setFormData] = useState({
    password: '',
    userName: '',
  });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const navigateToAnotherPage = () => {
    navigate('/'); // Use the navigate function to go to another page
  };
//add user event handler
  const addUser = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/signup';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.userName,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // If login/signup is successful, redirect to the accounts page
        console.log('User created 1:', data);
        localStorage.setItem('user', data.id);
        navigate('/accounts');
      } else {
        // If login/signup fails, show an error message
        setError(data.message || 'Error during login/signup');
      }

      setFormData({ password: '', userName: '' }); // Clear form
    } catch (error) {
      console.error('Error:', error);
    }
  };

// verify user event handler
  const verifyUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.userName,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('User verified:', data);
        localStorage.setItem('user', data.id);
        
        navigate('/accounts');
        setFormData({ password: '', userName: '' }); // Clear form
        // Add any additional logic for successful login here (e.g., redirecting)
      } else {
        console.error('Failed to verify user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <StyledDiv>
      <StyledForm onSubmit={isLogin ? verifyUser : addUser}>
        <label htmlFor='userName'>Enter User Name:</label>
        <input
          type='text'
          id='userName'
          required
          name='userName'
          value={formData.userName}
          onChange={handleInputChange}
        />
        <label htmlFor='password'>Enter Password:</label>
        <input
          type='password'
          id='password'
          required
          name='password'
          value={formData.password}
          onChange={handleInputChange}
        />
        <input type='submit' value={isLogin ? 'Login' : 'Create User'} />
      </StyledForm>
      <ButtonContainer>
        <StyledButton onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </StyledButton>
        <StyledButton onClick={navigateToAnotherPage}>Return</StyledButton>
      </ButtonContainer>
    </StyledDiv>
  );
};

export default LoginContainer;