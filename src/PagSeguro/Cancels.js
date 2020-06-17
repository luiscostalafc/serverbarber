import validations from './Validations';

const URLBASE = process.env.NODE_ENV === 'dev' ? 'https://ws.sandbox.pagseguro.uol.com.br' : 'https://ws.pagseguro.uol.com.br';
const EMAIL_PAGSEGURO = process.env.EMAIL_PAGSEGURO || null;
const TOKEN_PAGSEGURO = process.env.TOKEN_PAGSEGURO || null;

class Cancels {

  async cancel (transactionCode) {
    const functionName = 'cancel';
    if (!EMAIL_PAGSEGURO) return validations.mountReturn(`EMAIL_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!TOKEN_PAGSEGURO) return validations.mountReturn(`TOKEN_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!transactionCode) return validations.mountReturn(validations.errorMsg(errorMsg (functionName, 'transactionCode')));

    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v2/transactions/cancels?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&transactionCode=${transactionCode}`;
    
    fetch(URL, requestOptions)
      .then(response => { return validations.mountReturn(`success ${functionName}`, 'success', response.json()) })
      .catch(error => { return validations.mountReturn(error) });
  }

  async refunds (transactionCode) {
    const functionName = 'refunds';
    if (!EMAIL_PAGSEGURO) return validations.mountReturn(`EMAIL_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!TOKEN_PAGSEGURO) return validations.mountReturn(`TOKEN_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!transactionCode) return validations.mountReturn(validations.errorMsg(errorMsg (functionName, 'transactionCode')));

    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v2/transactions/refunds?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&transactionCode=${transactionCode}`;
    
    fetch(URL, requestOptions)
      .then(response => { return validations.mountReturn(`success ${functionName}`, 'success', response.json()) })
      .catch(error => { return validations.mountReturn(error) });
  }

  async parcialRefunds (transactionCode, refundValue) {
    const functionName = 'parcialRefunds';
    if (!EMAIL_PAGSEGURO) return validations.mountReturn(`EMAIL_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!TOKEN_PAGSEGURO) return validations.mountReturn(`TOKEN_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!transactionCode) return validations.mountReturn(validations.errorMsg(errorMsg (functionName, 'transactionCode')));
    if (!refundValue) return validations.mountReturn(validations.errorMsg(errorMsg (functionName, 'refundValue')));

    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v2/transactions/refunds?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&transactionCode=${transactionCode}&refundValue=${refundValue}`;
    
    fetch(URL, requestOptions)
      .then(response => { return validations.mountReturn(`success ${functionName}`, 'success', response.json()) })
      .catch(error => { return validations.mountReturn(error) });
  }
}

export default new Cancels();