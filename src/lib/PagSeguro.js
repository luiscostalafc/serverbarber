
const URLBASE = 'https://ws.pagseguro.uol.com.br';
class PagSeguro {
  async CreateSession () {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(`${this.URLBASE}/v2/sessions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`, requestOptions)
      .then(response => { return response.json() })
      .then(result => console.log(result))
      .catch(error => console.error('CreateSession PagSeguro error', error));
  }

  async GetPaymentMethods (sessionId) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${this.URLBASE}/payment-methods?amount={{ADICIONE O VALOR}}&sessionId=${sessionId}`, requestOptions)
      .then(response => {return response.json()})
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}

export default new PagSeguro();