import React from 'react';
import styled from 'styled-components';

// Create a styled div that changes the border color based on selectedItem
const StyledDiv = styled.div`
  padding: 20px;
  margin:10px;
  border: 2px solid;
  min-width:75vw;
  border-radius: 10px;
  background-color: #f1f1f1;
  border-color: black;
    box-shadow: 0 0 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px); /* Lift effect on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const AccountCard = ({ accountType, taxBracket, accountName, accountSummary }) => {
  return (
    <StyledDiv >
      <h1>Account name: {accountName} </h1>
      <p>Account type: {accountType}</p>
      <p>Summary: {accountSummary}</p>
      <p>{taxBracket ? `'Optimal' Tax Bracket: ${taxBracket}` : ''}</p>
    </StyledDiv>
  );
};
export default AccountCard;