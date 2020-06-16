class Consult {

  constructor () {
    const URLBASE = process.env.NODE_ENV === 'dev' ? 'https://ws.sandbox.pagseguro.uol.com.br' : 'https://ws.pagseguro.uol.com.br';
    const EMAIL_PAGSEGURO = process.env.EMAIL_PAGSEGURO || null;
    if (!EMAIL_PAGSEGURO) console.error('EMAIL_PAGSEGURO not found in .env');
    const TOKEN_PAGSEGURO = process.env.TOKEN_PAGSEGURO || null;
    if (!EMAIL_PAGSEGURO) console.error('TOKEN_PAGSEGURO not found in .env');
  }

  async referenceCode (reference) {
    const functionName = 'referenceCode';
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v2/transactions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&reference=${reference}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async dateInterval (initialDate, finalDate, page=1, maxPageResults=50) {
    const functionName = 'dateInterval';
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v2/transactions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&initialDate=${initialDate}&finalDate=${finalDate}&page=${page}&maxPageResults=${maxPageResults}`;
    fetch(URL, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async transactionsDetails (transactionCode) {
    const functionName = 'transactionsDetails';
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v3/transactions/${transactionCode}?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async notificationCode (notificationCode) {
    const functionName = 'notificationCode';
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v3/transactions/notifications/${notificationCode}?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }
}

export default new Consult();