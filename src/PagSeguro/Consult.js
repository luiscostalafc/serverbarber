import validations from './Validations';

const URLBASE = process.env.NODE_ENV === 'dev' ? 'https://ws.sandbox.pagseguro.uol.com.br' : 'https://ws.pagseguro.uol.com.br';
const EMAIL_PAGSEGURO = process.env.EMAIL_PAGSEGURO || null;
const TOKEN_PAGSEGURO = process.env.TOKEN_PAGSEGURO || null;

class Consult {

  async referenceCode (reference) {
    const functionName = 'referenceCode';
    if (!EMAIL_PAGSEGURO) return validations.mountReturn(`EMAIL_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!TOKEN_PAGSEGURO) return validations.mountReturn(`TOKEN_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!reference) return validations.mountReturn(validations.errorMsg(errorMsg (functionName, 'reference')));

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v2/transactions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&reference=${reference}`;
    
    fetch(URL, requestOptions)
      .then(response => { return validations.mountReturn(`success ${functionName}`, 'success', response.json()) })
      .catch(error => { return validations.mountReturn(error) });
  }

  async dateInterval (initialDate, finalDate, page=1, maxPageResults=50) {
    const functionName = 'dateInterval';
    if (!EMAIL_PAGSEGURO) return validations.mountReturn(`EMAIL_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!TOKEN_PAGSEGURO) return validations.mountReturn(`TOKEN_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!initialDate) return validations.mountReturn(validations.errorMsg(errorMsg (functionName, 'initialDate')));
    if (!finalDate) return validations.mountReturn(validations.errorMsg(errorMsg (functionName, 'finalDate')));

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
    if (!EMAIL_PAGSEGURO) return validations.mountReturn(`EMAIL_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!TOKEN_PAGSEGURO) return validations.mountReturn(`TOKEN_PAGSEGURO not defined in .env called in ${functionName}`);

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v3/transactions/${transactionCode}?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;
    
    fetch(URL, requestOptions)
      .then(response => { return validations.mountReturn(`success ${functionName}`, 'success', response.json()) })
      .catch(error => { return validations.mountReturn(error) });
  }

  async notificationCode (notificationCode) {
    const functionName = 'notificationCode';
    if (!EMAIL_PAGSEGURO) return validations.mountReturn(`EMAIL_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!TOKEN_PAGSEGURO) return validations.mountReturn(`TOKEN_PAGSEGURO not defined in .env called in ${functionName}`);
    if (!notificationCode) return validations.mountReturn(validations.errorMsg(errorMsg (functionName, 'notificationCode')));

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const URL = `${URLBASE}/v3/transactions/notifications/${notificationCode}?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;
    
    fetch(URL, requestOptions)
      .then(response => { return validations.mountReturn(`success ${functionName}`, 'success', response.json()) })
      .catch(error => { return validations.mountReturn(error) });
  }
}

export default new Consult();