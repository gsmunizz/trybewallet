import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExpenses } from '../actions';
import fetchCurrencies from '../services/fetchAPI';

class InputExpenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseValue: '',
      expenseDescription: '',
      expenseCurrency: 'USD',
      paymentMethod: 'Dinheiro',
      expenseCategory: 'Lazer',
      allCurrencies: [],
    };
  }

  componentDidMount() {
    this.getCurrencyKeys();
  }

  getCurrencyKeys = async () => {
    const coins = await fetchCurrencies();
    delete coins.USDT;
    this.setState({ allCurrencies: Object.keys(coins) });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { setExpense } = this.props;
    const currencies = await fetchCurrencies();
    setExpense(this.saveExpense(currencies));
    this.resetState();
  }

  resetState = () => {
    this.setState({
      expenseValue: '',
      expenseDescription: '',
      expenseCurrency: 'USD',
      paymentMethod: 'Dinheiro',
      expenseCategory: 'Lazer',
    });
  }

  saveExpense = (currencies) => {
    const { expenses } = this.props;
    const {
      expenseValue,
      expenseDescription,
      expenseCurrency,
      expenseCategory,
      paymentMethod,
    } = this.state;

    return {
      id: expenses.length,
      value: expenseValue,
      description: expenseDescription,
      currency: expenseCurrency,
      method: paymentMethod,
      tag: expenseCategory,
      exchangeRates: currencies,
    };
  }

  render() {
    const {
      expenseValue,
      expenseDescription,
      expenseCurrency,
      paymentMethod,
      expenseCategory,
      allCurrencies,
    } = this.state;

    return (
      <section>
        <form>
          <label htmlFor="expenseValue">
            Valor da despesa
            <input
              data-testid="value-input"
              type="number"
              name="expenseValue"
              value={ expenseValue }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="expenseDescription">
            Descrição da despesa
            <input
              data-testid="description-input"
              type="text"
              name="expenseDescription"
              value={ expenseDescription }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="expenseCurrency">
            Moeda
            <select
              id="expenseCurrency"
              data-testid="currency-input"
              name="expenseCurrency"
              value={ expenseCurrency }
              onChange={ this.handleChange }
            >
              {allCurrencies.map((coin) => (
                <option
                  value={ coin }
                  key={ coin }
                >
                  {coin}
                </option>
              ))}
            </select>
          </label>

          <select
            data-testid="method-input"
            name="paymentMethod"
            value={ paymentMethod }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            data-testid="tag-input"
            name="expenseCategory"
            value={ expenseCategory }
            onChange={ this.handleChange }
          >
            <option value="Lazer">Lazer</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button
            type="button"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(getExpenses(expense)),
});

InputExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  setExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputExpenses);
