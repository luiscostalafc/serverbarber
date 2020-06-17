class Validations {
  mountReturn (msg, type='error', returnData) {

    if (type == 'error') {
      console.log(msg);
      return {
        data: null,
        error: msg
      }
    } 

    console.log(msg);
    return {
      data: returnData,
      error: null
    }
  }

  errorMsg (functionName, field, type='required', complement='') {
    if (type == 'invalid') return `${field} must be ${complement} in ${functionName}`;
    return `${field} not defined in ${functionName}`
  }

  isValidCpf (CPF) {
    const CPFsum;
    const CPFrest;
    CPFsum = 0;
    if (CPF == "00000000000") return false;  
    for (i=1; i<=9; i++) CPFsum = CPFsum + parseInt(CPF.substring(i-1, i)) * (11 - i);
    CPFrest = (CPFsum * 10) % 11;
  
    if ((CPFrest == 10) || (CPFrest == 11))  CPFrest = 0;
    if (CPFrest != parseInt(CPF.substring(9, 10)) ) return false;
  
    CPFsum = 0;
    for (i = 1; i <= 10; i++) CPFsum = CPFsum + parseInt(CPF.substring(i-1, i)) * (12 - i);
    CPFrest = (CPFsum * 10) % 11;
  
    if ((CPFrest == 10) || (CPFrest == 11))  CPFrest = 0;
    if (CPFrest != parseInt(CPF.substring(10, 11) ) ) return false;
    return true;
  }

  validateCardData (functionName, payment) {
    const errors = [];
    const requireds = ['cardNumber', 'cardBrand', 'cardCvv', 'cardExpirationMonth', 'cardExpirationYear'];

    requireds.forEach(required => {
      if (!payment[required]) errors.push(this.errorMsg(functionName, `cardData.${required}`));
    });

    return {
      hasErrors: errors.length,
      errors: errors
    }
  }

  validatePayment (functionName, payment) {
    const errors = [];
    const requireds = ['paymentMethod', 'reference'];

    requireds.forEach(required => {
      if (!payment[required]) errors.push(this.errorMsg(functionName, `payment.${required}`));
    });

    if (!['boleto','eft','creditCard'].includes(payment.paymentMethod)) this.errorMsg(functionName, 'payment.paymentMethod', 'invalid', 'boleto or eft or creditCard');

    return {
      hasErrors: errors.length,
      errors: errors
    }
  }

  validateSender (functionName, sender) {
    const errors = [];
    const requireds = ['name', 'cpf', 'areaCode', 'phone', 'email', 'hash'];

    requireds.forEach(required => {
      if (!sender[required]) errors.push(this.errorMsg(functionName, `sender.${required}`));
    });

    if (!this.isValidCpf(sender.cpf)) this.errorMsg(functionName, 'sender.senderMethod', 'invalid', 'valid');

    return {
      hasErrors: errors.length,
      errors: errors
    }
  }

  validateItem (functionName, item) {
    const errors = [];
    const requireds = ['id', 'description', 'amount', 'quantitty'];

    requireds.forEach(required => {
      if (!item[required]) errors.push(this.errorMsg(functionName, `item.${required}`));
    });
    return {
      hasErrors: errors.length,
      errors: errors
    }
  }

  validateCard (functionName, card) {
    const errors = [];

    if (!card.installmentQuantity) this.mountReturn(`card.installmentQuantity must be defined in ${functionName}`);
    if (!card.installmentValue) this.mountReturn(`card.installmentValue must be defined in ${functionName}`);

    const requireds = ['token', 'holderName', 'holderCPF', 'holderBirthDate', 'holderAreaCode', 'holderPhone'];

    requireds.forEach(required => {
      if (!card[required]) errors.push(this.errorMsg(functionName, `card.${required}`));
    });

    if (card.installmentValue && !card.installmentQuantity) errors.push(this.errorMsg(functionName, 'card.installmentQuantity'));
    if (!card.installmentValue && card.installmentQuantity) errors.push(this.errorMsg(functionName, 'card.installmentValue'));

    return {
      hasErrors: errors.length,
      errors: errors
    }
  }

  validateShipping (functionName, shipping) {
    const errors = [];
    if (![1,2,3].includes(payment.type)) this.mountReturn(`shipping.type must be defined in ${functionName}`);
    const requireds = ['street', 'number', 'complement', 'district', 'postalCode', 'city', 'state', 'cost'];

    requireds.forEach(required => {
      if (!shipping[required]) errors.push(this.errorMsg(functionName, `shipping.${required}`));
    });

    if (![1,2,3].includes(shipping.type)) this.errorMsg(functionName, 'shipping.type', 'invalid', '1, 2 or 3');

    return {
      hasErrors: errors.length,
      errors: errors
    }
  }
}

export default new Validations();