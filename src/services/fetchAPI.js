const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencies = async () => {
  try {
    const data = await (await fetch(URL)).json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchCurrencies;
