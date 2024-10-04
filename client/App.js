import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import { useSelector, useDispatch } from 'react-redux';
import store from './store'; // Import the store
import * as actions from './actions/actions.js';
import MainContainer from './containers/MainContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import AccountContainer from './containers/AccountContainer.jsx';
import styled from 'styled-components';

const Header = styled.header`
  /* Add your header styles here */
  background-color: rgb(0, 123, 255);
  padding: 20px;
  text-align: center;
  color:white;
`;

const App = () => {

  return (
    <Provider store={store}>
      <Router>
      <Header>
          <h1>Finance is kinda cool</h1>
          {/* Add navigation links if needed */}
        </Header>
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/accounts' element={<AccountContainer />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;  