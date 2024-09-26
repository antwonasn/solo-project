import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/actions.js';

const App = () => {
    const greeting = useSelector((state) => state.greeting.greeting);
    const dispatch = useDispatch();

    const changeGreeting = () => {
        dispatch(actions.setGreeting('Hello, Redux is awesome!'));
    };

    return (
        <div>
            <h1>{greeting}</h1>
            <button onClick={changeGreeting}>Change Greeting</button>
        </div>
    );
};

export default App;