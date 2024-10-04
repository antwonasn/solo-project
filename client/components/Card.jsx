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
  if (taxBracket === 'Middle' && taxBracket === 'High') return 'yellow';
  return 'black'; // Default color
};
const getBoxShadowColor = (selectedItem, taxBracket) => {
  if (selectedItem === 'High' && taxBracket === 'Low') return 'rgba(255, 0, 0, 0.2)'; // Red with reduced opacity
  if (selectedItem === 'Low' && taxBracket === 'High') return 'rgba(255, 0, 0, 0.2)'; // Red with reduced opacity
  if (selectedItem === 'High' && taxBracket === 'High') return 'rgba(0, 255, 0, 0.2)'; // Green with reduced opacity
  if (selectedItem === 'Low' && taxBracket === 'Low') return 'rgba(0, 255, 0, 0.2)'; // Green with reduced opacity
  if (selectedItem === 'Middle' && taxBracket === 'Middle') return 'rgba(0, 255, 0, 0.2)'; // Green with reduced opacity
  if (selectedItem === 'Middle' && taxBracket === 'Low') return 'rgba(0, 255, 0, 0.2)'; // Green with reduced opacity
  if (taxBracket === 'Middle' && taxBracket === 'High') return 'rgba(255, 255, 0, 0.2)'; // Yellow with reduced opacity
  return 'rgba(0, 0, 0, 0.05)'; // Very light black shadow (almost transparent)
};

// Create a styled div that changes the border color based on selectedItem and taxBracket
const StyledDiv = styled.div`
  padding: 20px;
  margin:10px;
  border: 2px solid;
  min-width:75vw;
  border-radius: 10px;
  background-color: #f1f1f1;
  border-color: ${(props) => getBorderColor(props.selectedItem, props.taxBracket)};
    box-shadow: 0 4px 8px ${(props) => getBoxShadowColor(props.selectedItem, props.taxBracket)};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px); /* Lift effect on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Card = ({ accountType, taxBracket, accountName, accountSummary }) => {
  const selectedItem = useSelector((state) => state.state.selectedItem);
  console.log(selectedItem)
  return (
    <StyledDiv selectedItem={selectedItem} taxBracket={taxBracket}>
      <h1>{accountName}</h1>
      <p>Account Type: {accountType}</p>
      <p>Summary: {accountSummary}</p>
      <p>{taxBracket ? `'Optimal' Tax Bracket: ${taxBracket}` : ''}</p>
    </StyledDiv>
  );
};

export default Card;
