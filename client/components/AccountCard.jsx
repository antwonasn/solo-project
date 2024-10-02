import React from 'react';
import styled from 'styled-components';

// Create a styled div that changes the border color based on selectedItem
const StyledDiv = styled.div`
  padding: 20px;
  border: 1.5px solid;
`;

const AccountCard = ({ accountType, taxBracket, accountName, accountSummary }) => {
  return (
    <StyledDiv >
      <h1>Account name: {accountName} </h1>
      <p>Account type: {accountType}</p>
      <p>Summary: {accountSummary}</p>
      <p>Tax Bracket: {taxBracket}</p>
    </StyledDiv>
  );
};
export default AccountCard;