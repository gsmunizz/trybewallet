// Coloque aqui suas actions
export const LOG_IN = 'LOG_IN';
export const GET_WALLET = 'GET_WALLET';

export default function loginAction(payload) {
  return {
    type: LOG_IN,
    payload,
  };
}

export const getWallet = () => ({
  type: GET_WALLET,
});
