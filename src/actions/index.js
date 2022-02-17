// import fetchCurrencies from '../services/fetchAPI';

// Coloque aqui suas actions
export const LOG_IN = 'LOG_IN';
export const GET_EXPENSES = 'GET_EXPENSES';

export default function user(payload) {
  return {
    type: LOG_IN,
    payload,
  };
}

export const getExpensesSuccess = (currencies, expenses) => ({
  type: GET_EXPENSES,
  payload: { expenses, currencies },
});

export const getExpenses = (payload) => async (dispatch) => {
  try {
    // const currency = await fetchCurrencies();
    dispatch(getExpensesSuccess(payload.exchangeRates, payload));
  } catch (error) {
    return error;
  }
};
