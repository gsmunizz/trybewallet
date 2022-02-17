// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: {},
};

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload.expenses],
      currencies: payload.currencies,
    };
  default:
    return state;
  }
}

export default wallet;
