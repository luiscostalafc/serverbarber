class Payment {

  constructor () {
    const URLBASE = process.env.NODE_ENV === 'dev' ? 'https://ws.sandbox.pagseguro.uol.com.br' : 'https://ws.pagseguro.uol.com.br';
    const EMAIL_PAGSEGURO = process.env.EMAIL_PAGSEGURO || null;
    if (!EMAIL_PAGSEGURO) console.error('EMAIL_PAGSEGURO not found in .env');
    const TOKEN_PAGSEGURO = process.env.TOKEN_PAGSEGURO || null;
    if (!EMAIL_PAGSEGURO) console.error('TOKEN_PAGSEGURO not found in .env');
  }

  async createSession () {
    const functionName = 'createSession';
    const requestOptions = { method: 'POST', redirect: 'follow' };
    const URL = `${this.URLBASE}/v2/sessions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;

    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async getPaymentMethods (amount, sessionId) {
    const functionName = 'getPaymentMethods';
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1');

    const requestOptions = { method: 'GET', headers: myHeaders, redirect: 'follow' };
    const URL = `${this.URLBASE}/payment-methods?amount=${amount}&sessionId=${sessionId}`;

    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async getCardFlag (sessionId, bin) {
    const functionName = 'getCardFlag';
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const URL = `https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin?tk=${sessionId}&creditCard=${bin}`;

    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async getCardToken (sessionId, amount, cardData) {
    const functionName = 'getCardToken';
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const { cardNumber, cardBrand, cardCvv, cardExpirationMonth, cardExpirationYear } = cardData;
    const urlencoded = new URLSearchParams();
    urlencoded.append('sessionId', sessionId);
    urlencoded.append('amount', amount);
    urlencoded.append('cardNumber', cardNumber);
    urlencoded.append('cardBrand', cardBrand);
    urlencoded.append('cardCvv', cardCvv);
    urlencoded.append('cardExpirationMonth', cardExpirationMonth);
    urlencoded.append('cardExpirationYear', cardExpirationYear);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const URL = 'https://df.uol.com.br/v2/cards';

    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async installments (sessionId, amount, creditCardBrand) {
    const functionName = 'installments';
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const URL = `${this.URLBASE}/checkout/v2/installments.json?sessionId=${sessionId}&amount=${amount}&creditCardBrand=${creditCardBrand}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }
  
  async payment(receiverEmail, extraAmount=0.00, items) {
    const functionName = 'boleto';
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('paymentMode', 'default');
    urlencoded.append('paymentMethod', 'boleto'); // 'boleto'| 'eft' | 'creditCard'
    urlencoded.append('receiverEmail', receiverEmail);
    urlencoded.append('currency', 'BRL');
    urlencoded.append('extraAmount', extraAmount);

    let i = 1;
    for (const item of items) {
      urlencoded.append(`itemId${i}`, item.id);
      urlencoded.append(`itemDescription${i}`, item.description);
      urlencoded.append(`itemAmount${i}`, item.amount);
      urlencoded.append(`itemQuantity${i}`, item.quantitty);
    }

    urlencoded.append('notificationURL', 'https://sualoja.com.br/notifica.html');
    urlencoded.append('reference', 'REF1234');
    urlencoded.append('senderName', 'JoseComprador');
    urlencoded.append('senderCPF', '22111944785');
    urlencoded.append('senderAreaCode', '11');
    urlencoded.append('senderPhone', '56273440');
    urlencoded.append('senderEmail', 'comprador@uol.com.br');
    urlencoded.append('senderHash', '{{ADICIONE O HASH}}');
    urlencoded.append('shippingAddressStreet', 'Av.Brig.FariaLima');
    urlencoded.append('shippingAddressNumber', '1384');
    urlencoded.append('shippingAddressComplement', '5oandar');
    urlencoded.append('shippingAddressDistrict', 'JardimPaulistano');
    urlencoded.append('shippingAddressPostalCode', '01452002');
    urlencoded.append('shippingAddressCity', 'SaoPaulo');
    urlencoded.append('shippingAddressState', 'SP');
    urlencoded.append('shippingAddressCountry', 'BRA');
    urlencoded.append('shippingType', '1');
    urlencoded.append('shippingCost', '1.00');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const URL = `${URLBASE}/v2/transactions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async onlineDebit () {
    const functionName = 'onlineDebit';
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('paymentMode', 'default');
    urlencoded.append('paymentMethod', 'eft');
    urlencoded.append('receiverEmail', 'comprador@teste.com.br');
    urlencoded.append('currency', 'BRL');
    urlencoded.append('extraAmount', '1.00');

    let i = 1;
    for (const item of items) {
      urlencoded.append(`itemId${i}`, item.id);
      urlencoded.append(`itemDescription${i}`, item.description);
      urlencoded.append(`itemAmount${i}`, item.amount);
      urlencoded.append(`itemQuantity${i}`, item.quantitty);
    }

    urlencoded.append('notificationURL', 'https://sualoja.com.br/notifica.html');
    urlencoded.append('reference', 'REF1234');
    urlencoded.append('senderName', 'JoseComprador');
    urlencoded.append('senderCPF', '22111944785');
    urlencoded.append('senderAreaCode', '11');
    urlencoded.append('senderPhone', '56273440');
    urlencoded.append('senderEmail', 'comprador@uol.com.br');
    urlencoded.append('senderHash', '{{ADICIONE O HASH}}');
    urlencoded.append('shippingAddressStreet', 'Av.Brig.FariaLima');
    urlencoded.append('shippingAddressNumber', '1384');
    urlencoded.append('shippingAddressComplement', '5oandar');
    urlencoded.append('shippingAddressDistrict', 'JardimPaulistano');
    urlencoded.append('shippingAddressPostalCode', '01452002');
    urlencoded.append('shippingAddressCity', 'SaoPaulo');
    urlencoded.append('shippingAddressState', 'SP');
    urlencoded.append('shippingAddressCountry', 'BRA');
    urlencoded.append('shippingType', '1');
    urlencoded.append('shippingCost', '1.00');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const URL = `${URLBASE}/v2/transactions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }

  async creditCard () {
    const functionName = 'creditCard';
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('paymentMode', 'default');
    urlencoded.append('paymentMethod', 'creditCard');
    urlencoded.append('receiverEmail', 'comprador@teste.com.br');
    urlencoded.append('currency', 'BRL');
    urlencoded.append('extraAmount', '1.00');

    let i = 1;
    for (const item of items) {
      urlencoded.append(`itemId${i}`, item.id);
      urlencoded.append(`itemDescription${i}`, item.description);
      urlencoded.append(`itemAmount${i}`, item.amount);
      urlencoded.append(`itemQuantity${i}`, item.quantitty);
    }

    urlencoded.append('notificationURL', 'https://sualoja.com.br/notifica.html');
    urlencoded.append('reference', 'REF1234');
    urlencoded.append('senderName', 'JoseComprador');
    urlencoded.append('senderCPF', '22111944785');
    urlencoded.append('senderAreaCode', '11');
    urlencoded.append('senderPhone', '56273440');
    urlencoded.append('senderEmail', 'comprador@uol.com.br');
    urlencoded.append('senderHash', '{{ADICIONE O HASH}}');
    urlencoded.append('shippingAddressStreet', 'Av.Brig.FariaLima');
    urlencoded.append('shippingAddressNumber', '1384');
    urlencoded.append('shippingAddressComplement', '5oandar');
    urlencoded.append('shippingAddressDistrict', 'JardimPaulistano');
    urlencoded.append('shippingAddressPostalCode', '01452002');
    urlencoded.append('shippingAddressCity', 'SaoPaulo');
    urlencoded.append('shippingAddressState', 'SP');
    urlencoded.append('shippingAddressCountry', 'BRA');
    urlencoded.append('shippingType', '1');
    urlencoded.append('shippingCost', '1.00');
    urlencoded.append('creditCardToken', '{{TOKEN DE CARTÃO}}');
    urlencoded.append('installmentQuantity', '5');
    urlencoded.append('installmentValue', '125.22');
    urlencoded.append('noInterestInstallmentQuantity', '2');
    urlencoded.append('creditCardHolderName', 'JoseComprador');
    urlencoded.append('creditCardHolderCPF', '22111944785');
    urlencoded.append('creditCardHolderBirthDate', '27/10/1987');
    urlencoded.append('creditCardHolderAreaCode', '11');
    urlencoded.append('creditCardHolderPhone', '56273440');
    urlencoded.append('billingAddressStreet', 'Av.Brig.FariaLima');
    urlencoded.append('billingAddressNumber', '1384');
    urlencoded.append('billingAddressComplement', '5oandar');
    urlencoded.append('billingAddressDistrict', 'JardimPaulistano');
    urlencoded.append('billingAddressPostalCode', '01452002');
    urlencoded.append('billingAddressCity', 'SaoPaulo');
    urlencoded.append('billingAddressState', 'SP');
    urlencoded.append('billingAddressCountry', 'BRA');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const URL = `${URLBASE}/v2/transactions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;
    
    fetch(URL, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => {
        console.error(`${functionName} PagSeguro error`, error);
        return {};
      });
  }
}

export default new Payment();