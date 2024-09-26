import { configureStore } from 'redux';
import rootReducer from './reducers'; // Import your root reducer

const store = configureStore(rootReducer);

export default store;