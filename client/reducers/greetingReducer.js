import { v4 as uuidv4 } from 'uuid';
const initialState = {
  greeting: 'Welcome and hello my freindorions',
  selectedItem: null,
  cards: [
    {
      selectedItem: null,
      taxBracket: 'Low',
      accountType: 'Retirement Account',
      accountName: 'Roth-IRA',
      accountSummary:'Variant of the tradional IRA where tax is paid upon investing not withdrawal. Good if expected to be in a higher tax bracket upon retirement',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: 'High',
      accountType: 'Retirement Account',
      accountName: 'Traditional-IRA',
      accountSummary:'Tradional IRA where tax burden is deferred to time of withdrawal. Good if expected to be in a lower tax bracket upon retirement',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: '',
      accountType: 'Retirement Account',
      accountName: '401k',
      accountSummary:'Contributions grow tax-deferred (traditional) or tax-free (Roth), depending on the type of account. Employers often match a percentage of employee contributions.',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: 'Middle',
      accountType: 'Derivative',
      accountName: 'Options',
      accountSummary:'Contracts that give the buyer the right (but not the obligation) to buy or sell an underlying asset (such as stocks) at a predetermined price before a specified date.',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: 'Middle',
      accountType: 'Derivative',
      accountName: 'Futures',
      accountSummary:'Contracts obligating the buyer to purchase, or the seller to sell, an asset (like commodities or financial instruments) at a predetermined future date and price.',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: '',
      accountType: 'Money Market',
      accountName: 'Certificates of Deposit (CDs)',
      accountSummary:'Time deposits offered by banks with a fixed interest rate and maturity date.',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: '',
      accountType: 'Treasury Securities',
      accountName: 'Government bonds',
      accountSummary:'Debt instruments issued by the U.S. government, considered among the safest investments: T-Bills less than a year, T-Notes 1-10 years, T-Bonds 10-30 years',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: '',
      accountType: 'Trust',
      accountName: 'Real Estate Investment Trusts (REITs)',
      accountSummary:'Companies that own, operate, or finance income-producing real estate. They offer investors the opportunity to invest in real estate without owning property directly and typically pay out high dividends.',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: '',
      accountType: 'Mutual Fund',
      accountName: 'Index Fund',
      accountSummary:'Low fee Mutual fund, designed to closely mirror and/or outperform the index it is based off of',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: 'Middle',
      accountType: 'Annuity',
      accountName: 'RILA (Registered Index-Linked Annuity)',
      accountSummary:'annuity that provides a balance between growth potential and downside protection. It allows investors to participate in market gains while limiting losses through predefined buffers or floors.',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: 'High',
      accountType: 'Life Insurance Policy',
      accountName: 'LIRP',
      accountSummary:'Funding a permanent life insurance policy for both protection and tax-advantaged cash value growth. The terms refer to structuring the policy to maximize benefits: B-to-A, Min Non Mec, Max Funded',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: 'High',
      accountType: 'Bond',
      accountName: 'Municpal Bonds',
      accountSummary:'Interest earned is often exempt from federal taxes, and sometimes from state and local taxes if you reside in the issuing state. Includes General Obligation (GO) bonds and Revenue bonds',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: 'High',
      accountType: 'Trust',
      accountName: 'CRAT (Charitable Remainder Annuity Trust)',
      accountSummary:'Estate planning tool that allows individuals to donate assets to a charitable organization while still receiving fixed income payments for a set period of time.',
      id: uuidv4(),
    },
    {
      selectedItem: null,
      taxBracket: '',
      accountType: 'Life Insurance Policy',
      accountName: 'Mortgage Protection Life Insurance',
      accountSummary:'Designed to pay off the remaining balance of your mortgage if you pass away during the policy term.',
      id: uuidv4(),
    },
  ],
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
