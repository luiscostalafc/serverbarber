class Cancels {

  constructor () {
    const URLBASE = process.env.NODE_ENV === 'dev' ? 'https://ws.sandbox.pagseguro.uol.com.br' : 'https://ws.pagseguro.uol.com.br';
    const EMAIL_PAGSEGURO = process.env.EMAIL_PAGSEGURO || null;
    if (!EMAIL_PAGSEGURO) console.error('EMAIL_PAGSEGURO not found in .env');
    const TOKEN_PAGSEGURO = process.env.TOKEN_PAGSEGURO || null;
    if (!EMAIL_PAGSEGURO) console.error('TOKEN_PAGSEGURO not found in .env');
  }

  async cancel (transactionCode) {
    const functionName = 'cancel';
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v2/transactions/cancels?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&transactionCode=${transactionCode}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async refunds (transactionCode) {
    const functionName = 'refunds';
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v2/transactions/refunds?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&transactionCode=${transactionCode}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async parcialRefunds (transactionCode, refundValue) {
    const functionName = 'parcialRefunds';
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v2/transactions/refunds?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&transactionCode=${transactionCode}&refundValue=${refundValue}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }
}

export default new Cancels();