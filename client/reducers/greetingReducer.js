const initialState = {
  greeting: 'Welcome and hello my freindorions',
  selectedItem: null,
  cards: [],
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
      case 'ADD_CARD': // Handle adding a card
      return {
        ...state,
        cards: [...state.cards, action.payload], // Add new card to the cards array
      };
    default:
      return state;
  }
};

export default greetingReducer;
