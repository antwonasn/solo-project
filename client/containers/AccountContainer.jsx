import React from 'react';
import { useNavigate } from 'react-router-dom';


const AccountContainer = () => {
  const navigate = useNavigate();
  const navigateToAnotherPage = () => {
    navigate('/'); // Use the navigate function to go to another page
  };
    return (
      <div>
        <h1>I Work!</h1>
        <button onClick={navigateToAnotherPage}>Return</button>
      </div>
    );
  };
  
  export default AccountContainer;