import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Function to determine the border color based on selectedItem and taxBracket
const getBorderColor = (selectedItem, taxBracket) => {
  if (selectedItem === 'High' && taxBracket === 'Low') return 'red';
  if (selectedItem === 'Low' && taxBracket === 'High') return 'red';
  if (selectedItem === 'High' && taxBracket === 'High') return 'green';
  if (selectedItem === 'Low' && taxBracket === 'Low') return 'green';
  if (selectedItem === 'Middle' && taxBracket === 'Middle') return 'green';
  if (selectedItem === 'Middle' && taxBracket === 'Low') return 'green';
  if (taxBracket === 'Middle') return 'yellow';
  return 'black'; // Default color
};

// Create a styled div that changes the border color based on selectedItem and taxBracket
const StyledDiv = styled.div`
  padding: 20px;
  border: 1.5px solid;
  border-color: ${(props) => getBorderColor(props.selectedItem, props.taxBracket)};
`;

const Card = ({ accountType, taxBracket, accountName, accountSummary }) => {
  const selectedItem = useSelector((state) => state.state.selectedItem);
  
  return (
    <StyledDiv selectedItem={selectedItem} taxBracket={taxBracket}>
      <h1>Account Name: {accountName}</h1>
      <p>Account Type: {accountType}</p>
      <p>Summary: {accountSummary}</p>
      <p>Tax Bracket: {taxBracket}</p>
    </StyledDiv>
  );
};

export default Card;
