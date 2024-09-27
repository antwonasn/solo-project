const initialState = {
  greeting: 'Welcome and hello my freindorions',
  selectedItem: null,
};

const greetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GREETING':
      return { ...state, greeting: action.payload };
    case 'SET_SELECTED_ITEM':
      return {
        ...state,
        selectedItem: action.payload,
      };
    default:
      return state;
  }
};

export default greetingReducer;
