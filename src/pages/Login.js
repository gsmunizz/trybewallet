import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import user from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
    };
  }

  handleInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  // Para a validação do emil, busquei a regex no seguinte tópico:
  // https://pt.stackoverflow.com/questions/1386/express%c3%a3o-regular-para-valida%c3%a7%c3%a3o-de-e-mail#1389
  handleCheckInput = (email, pwd) => {
    const MIN_LENGTH = 6;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    const verifyEmail = emailRegex.test(email);
    const verifyPassword = pwd.length >= MIN_LENGTH;

    const verify = !(verifyEmail && verifyPassword);

    return verify;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { emailInput } = this.state;
    const { submitEmail, history } = this.props;

    submitEmail(emailInput);

    history.push('/carteira');
  }

  render() {
    const { emailInput, passwordInput } = this.state;

    return (
      <section>
        <input
          data-testid="email-input"
          type="text"
          name="emailInput"
          value={ emailInput }
          onChange={ this.handleInputChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="passwordInput"
          value={ passwordInput }
          onChange={ this.handleInputChange }
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          disabled={ this.handleCheckInput(emailInput, passwordInput) }
          onClick={ (e) => {
            this.handleSubmit(e);
          } }
        >
          Entrar
        </button>
      </section>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (email) => dispatch(user(email)),
});

Login.propTypes = {
  submitEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
