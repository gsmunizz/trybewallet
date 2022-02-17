import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import InputExpenses from '../components/InputExpenses';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { expenses } = this.props;
    return (
      <>
        <Header />
        <InputExpenses />

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.currency}</td>
                <td>
                  { Number((expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                </td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {
                    (expense.exchangeRates[expense.currency].ask
                       * expense.value).toFixed(2)
                  }
                </td>
                <td>
                  Real
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Wallet);
