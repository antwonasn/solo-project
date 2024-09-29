import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './actions/actions.js';
import MainContainer from './containers/MainContainer.jsx';
import AccountContainer from './containers/AccountContainer.jsx';

const App = () => {
  const greeting = useSelector((state) => state.state.greeting);
  const dispatch = useDispatch();

  const changeGreeting = () => {
    dispatch(actions.setGreeting('Hello, Redux is awesome!'));
  };

  return (
    <Router> {/* Wrap everything in Router */}
      <div>
        <button onClick={changeGreeting}>Change Greeting</button>
        <h1>{greeting}</h1>
        
        {/* Set up routing */}
        <Routes>
          <Route path="/" element={<MainContainer />} /> {/* Use element prop */}
          <Route path="/accounts" element={<AccountContainer />} /> Use element prop
        </Routes>
      </div>
    </Router>
  );
};

export default App;