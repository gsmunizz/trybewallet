import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpenses: 0,
    };
  }

  render() {
    const { totalExpenses } = this.state;
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
            { totalExpenses }
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

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
