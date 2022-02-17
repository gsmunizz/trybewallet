import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  updateTotal = () => {
    const { expenses } = this.props;
    let totalValue = 0;
    expenses.forEach((expense) => {
      totalValue += expense.value * expense.exchangeRates[expense.currency].ask;
    });
    return totalValue;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <p>Email:</p>
          <span
            data-testid="email-field"
          >
            { email }
          </span>
        </div>
        <div>
          <p>Total de Gastos:</p>
          <span
            data-testid="total-field"
          >
            { this.updateTotal().toFixed(2) }
          </span>
        </div>
        <div>
          <p>Moeda:</p>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
