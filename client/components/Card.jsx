import React from 'react';
import styled from 'styled-components';

// Create a styled div that changes the border color based on selectedItem
const StyledDiv = styled.div`
  padding: 20px;
  border: 1.5px solid; // Keep the border defined here
  border-color: ${(props) => {
    switch (props.taxBracket) {
      case 'Low':
        return 'red';
      case 'Middle':
        return 'yellow';
      case 'High':
        return 'green';
      default:
        return 'black';
    }
  }};
`;

const Card = ({ accountType, taxBracket, accountName }) => {
  return (
    <StyledDiv taxBracket={taxBracket}>
      <h1>Account name: {accountName} </h1>
      <p>Account type: {accountType}</p>
      <p>Tax Bracket: {taxBracket}</p>
    </StyledDiv>
  );
};
export default Card;
