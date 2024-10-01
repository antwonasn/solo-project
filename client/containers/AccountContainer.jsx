import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const AccountContainer = () => {
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

      if (response.ok) {
        const data = await response.json();
        console.log('User processed:', data);
        setFormData({ password: '', userName: '' }); // Clear form
      } else {
        console.error('Failed to process user');
      }
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

      if (response.ok) {
        const data = await response.json();
        console.log('User verified:', data);
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
    <div>
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
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Signup' : 'Login'}
      </button>
      <button onClick={navigateToAnotherPage}>Return</button>
    </div>
  );
};

export default AccountContainer;