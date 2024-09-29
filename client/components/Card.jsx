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

const Card = (props) => {
 
  console.log(props)

  return (
    <StyledDiv taxBracket={props.taxBracket}>
      <h1>Hello!</h1>
      <p>Account type {props.accountType || 'No item selected'}</p>
    </StyledDiv>
  );
};

// const Card = ({ accountType, taxBracket }) => {
//     return (
//       <StyledDiv taxBracket={taxBracket}>
//         <h1>Hello!</h1>
//         <p>Account type: {accountType || 'No item selected'}</p>
//         <p>Tax Bracket: {taxBracket || 'No tax bracket selected'}</p>
//       </StyledDiv>
//     );
//   };
export default Card;