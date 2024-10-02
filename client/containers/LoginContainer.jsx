import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
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

      if (response.ok) {
        // If login/signup is successful, redirect to the accounts page
        navigate('/accounts');
      } else {
        // If login/signup fails, show an error message
        setError(data.message || 'Error during login/signup');
      }

      setFormData({ password: '', userName: '' }); // Clear form
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
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
        localStorage.setItem('user', data.userId);
        
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

export default LoginContainer;