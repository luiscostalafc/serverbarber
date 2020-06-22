import validations from './Validations';

const URLBASE =
	process.env.NODE_ENV === 'dev'
		? 'https://ws.sandbox.pagseguro.uol.com.br'
		: 'https://ws.pagseguro.uol.com.br';
const EMAIL_PAGSEGURO = process.env.EMAIL_PAGSEGURO || null;
const TOKEN_PAGSEGURO = process.env.TOKEN_PAGSEGURO || null;

class Payment {
	async createSession() {
		const functionName = 'createSession';
		if (!EMAIL_PAGSEGURO)
			return validations.mountReturn(
				`EMAIL_PAGSEGURO not defined in .env called in ${functionName}`
			);
		if (!TOKEN_PAGSEGURO)
			return validations.mountReturn(
				`TOKEN_PAGSEGURO not defined in .env called in ${functionName}`
			);

		const requestOptions = { method: 'POST', redirect: 'follow' };

		const URL = `${URLBASE}/v2/sessions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;
		fetch(URL, requestOptions)
			.then(response => {
				return validations.mountReturn(
					`success ${functionName}`,
					'success',
					response.json()
				);
			})
			.catch(error => {
				return validations.mountReturn(error);
			});
	}

	async getPaymentMethods(amount, sessionId) {
		const functionName = 'getPaymentMethods';
		if (!amount)
			return validations.mountReturn(`amount not defined in ${functionName}`);
		if (!sessionId)
			return validations.mountReturn(
				`sessionId not defined in ${functionName}`
			);

		const myHeaders = new Headers();
		myHeaders.append(
			'Accept',
			'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1'
		);

		const requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};
		const URL = `${URLBASE}/payment-methods?amount=${amount}&sessionId=${sessionId}`;

		fetch(URL, requestOptions)
			.then(response => {
				return validations.mountReturn(
					`success ${functionName}`,
					'success',
					response.json()
				);
			})
			.catch(error => {
				return validations.mountReturn(error);
			});
	}

	async getCardFlag(sessionId, bin) {
		const functionName = 'getCardFlag';
		if (!sessionId)
			return validations.mountReturn(
				`sessionId not defined in ${functionName}`
			);
		if (!bin)
			return validations.mountReturn(`bin not defined in ${functionName}`);

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};
		const URL = `https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin?tk=${sessionId}&creditCard=${bin}`;

		fetch(URL, requestOptions)
			.then(response => {
				return validations.mountReturn(
					`success ${functionName}`,
					'success',
					response.json()
				);
			})
			.catch(error => {
				return validations.mountReturn(error);
			});
	}

	async getCardToken(sessionId, amount, cardData) {
		const functionName = 'getCardToken';
		if (!sessionId)
			return validations.mountReturn(
				`sessionId not defined in ${functionName}`
			);
		if (!amount)
			return validations.mountReturn(`amount not defined in ${functionName}`);
		if (!cardData)
			return validations.mountReturn(`cardData not defined in ${functionName}`);

		const cardDataValidated = validations.validateCardData(
			functionName,
			cardData
		);
		if (cardDataValidated.hasErrors)
			return validations.mountReturn(cardDataValidated.errors.join(', '));

		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

		const {
			cardNumber,
			cardBrand,
			cardCvv,
			cardExpirationMonth,
			cardExpirationYear,
		} = cardData;
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
			redirect: 'follow',
		};

		const URL = 'https://df.uol.com.br/v2/cards';

		fetch(URL, requestOptions)
			.then(response => {
				return validations.mountReturn(
					`success ${functionName}`,
					'success',
					response.json()
				);
			})
			.catch(error => {
				return validations.mountReturn(error);
			});
	}

	async getInstallments(sessionId, amount, creditCardBrand) {
		const functionName = 'installments';
		if (!sessionId)
			return validations.mountReturn(
				`sessionId not defined in ${functionName}`
			);
		if (!amount)
			return validations.mountReturn(`amount not defined in ${functionName}`);
		if (!creditCardBrand)
			return validations.mountReturn(
				`creditCardBrand not defined in ${functionName}`
			);
		// maxInstallmentNoInterest

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		const URL = `${URLBASE}/checkout/v2/installments.json?sessionId=${sessionId}&amount=${amount}&creditCardBrand=${creditCardBrand}`;

		fetch(URL, requestOptions)
			.then(response => {
				return validations.mountReturn(
					`success ${functionName}`,
					'success',
					response.json()
				);
			})
			.catch(error => {
				return validations.mountReturn(error);
			});
	}

	async payment(payment, sender, items, receiver, shipping) {
		const shippingAddressRequired = !!shipping;

		const functionName = 'payment';
		if (!EMAIL_PAGSEGURO || !TOKEN_PAGSEGURO) return {};
		if (!payment)
			return validations.mountReturn(`payment not defined in ${functionName}`);
		if (!sender)
			return validations.mountReturn(`sender not defined in ${functionName}`);
		if (!receiver)
			return validations.mountReturn(`receiver not defined in ${functionName}`);

		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

		const paymentValidated = validations.validatePayment(functionName, payment);
		if (paymentValidated.hasErrors)
			return validations.mountReturn(paymentValidated.errors.join(', '));

		const senderValidated = validations.validateSender(functionName, sender);
		if (senderValidated.hasErrors)
			return validations.mountReturn(senderValidated.errors.join(', '));

		const urlencoded = new URLSearchParams();
		urlencoded.append('paymentMode', 'default');
		urlencoded.append('paymentMethod', payment.paymentMethod);
		urlencoded.append('receiverEmail', process.env.RECEIVER_EMAIL);
		urlencoded.append('currency', 'BRL');
		urlencoded.append('extraAmount', payment.extraAmount || 0.0);

		const i = 1;
		for (const item of items) {
			const itemValidated = validations.validateItem(functionName, item);
			if (itemValidated.hasErrors)
				return validations.mountReturn(itemValidated.errors.join(', '));

			urlencoded.append(`itemId${i}`, item.id);
			urlencoded.append(`itemDescription${i}`, item.description);
			urlencoded.append(`itemAmount${i}`, item.amount);
			urlencoded.append(`itemQuantity${i}`, item.quantitty);
		}

		// urlencoded.append('notificationURL', 'https://sualoja.com.br/notifica.html');
		urlencoded.append('reference', payment.reference);
		urlencoded.append('senderName', sender.name);
		urlencoded.append('senderCPF', sender.cpf);
		urlencoded.append('senderAreaCode', sender.areaCode);
		urlencoded.append('senderPhone', sender.phone);
		urlencoded.append('senderEmail', sender.email);
		urlencoded.append('senderHash', sender.hash);

		urlencoded.append('shippingAddressRequired', shippingAddressRequired);
		if (shippingAddressRequired) {
			const shippingValidated = validations.validateShipping(
				functionName,
				shipping
			);
			if (shippingValidated.hasErrors)
				return validations.mountReturn(shippingValidated.errors.join(', '));

			urlencoded.append('shippingAddressStreet', shipping.street);
			urlencoded.append('shippingAddressNumber', shipping.number);
			urlencoded.append('shippingAddressComplement', shipping.complement);
			urlencoded.append('shippingAddressDistrict', shipping.district);
			urlencoded.append('shippingAddressPostalCode', shipping.postalCode);
			urlencoded.append('shippingAddressCity', shipping.city);
			urlencoded.append('shippingAddressState', shipping.state);
			urlencoded.append('shippingAddressCountry', 'BRA');
			urlencoded.append('shippingType', shipping.type);
			urlencoded.append('shippingCost', shipping.cost);
		}

		if (payment.paymentMethod == 'creditCard') {
			const cardValidated = validations.validateCard(functionName, card);
			if (cardValidated.hasErrors)
				return validations.mountReturn(cardValidated.errors.join(', '));

			urlencoded.append('creditCardToken', card.token);
			urlencoded.append('installmentQuantity', card.installmentQuantity || 0);
			urlencoded.append('installmentValue', card.installmentValue);
			urlencoded.append(
				'noInterestInstallmentQuantity',
				process.env.NO_INTEREST_INSTALLMENT_QUANTITY || 2
			);
			urlencoded.append('creditCardHolderName', card.holderName);
			urlencoded.append('creditCardHolderCPF', card.holderCPF);
			urlencoded.append('creditCardHolderBirthDate', card.holderBirthDate);
			urlencoded.append('creditCardHolderAreaCode', card.holderAreaCode);
			urlencoded.append('creditCardHolderPhone', card.holderPhone);

			if (shippingAddressRequired) {
				urlencoded.append('billingAddressStreet', shipping.street);
				urlencoded.append('billingAddressNumber', shipping.number);
				urlencoded.append('billingAddressComplement', shipping.complement);
				urlencoded.append('billingAddressDistrict', shipping.district);
				urlencoded.append('billingAddressPostalCode', shipping.postalCode);
				urlencoded.append('billingAddressCity', shipping.city);
				urlencoded.append('billingAddressState', shipping.state);
				urlencoded.append('billingAddressCountry', 'BRA');
			}
		}

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow',
		};

		const URL = `${URLBASE}/v2/transactions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;

		fetch(URL, requestOptions)
			.then(response => {
				return validations.mountReturn(
					`success ${functionName}`,
					'success',
					response.json()
				);
			})
			.catch(error => {
				return validations.mountReturn(error);
			});
	}
}

export default new Payment();
