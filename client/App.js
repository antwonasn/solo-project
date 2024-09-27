import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './actions/actions.js';
import MainContainer from './containers/MainContainer.jsx';

const App = () => {
  const greeting = useSelector((state) => state.greeting.greeting);
  const dispatch = useDispatch();

  const changeGreeting = () => {
    dispatch(actions.setGreeting('Hello, Redux is awesome!'));
  };

  return (
    <div>
      <button onClick={changeGreeting}>Change Greeting</button>
      <h1>{greeting}</h1>
      <MainContainer /> 
    </div>
  );
};

export default App;
