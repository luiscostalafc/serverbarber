import * as Yup from 'yup';

const parser = require('xml2json');
const fetch = require('node-fetch');

const URLBASE =
	process.env.NODE_ENV === 'dev'
		? 'https://ws.sandbox.pagseguro.uol.com.br'
		: 'https://ws.pagseguro.uol.com.br';
const EMAIL_PAGSEGURO = process.env.EMAIL_PAGSEGURO || null;
const TOKEN_PAGSEGURO = process.env.TOKEN_PAGSEGURO || null;

class PagSeguroController {
	async createSession(req, res) {
		const requestOptions = { method: 'POST', redirect: 'follow' };
		const URL = `${URLBASE}/v2/sessions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async getPaymentMethods(req, res) {
		const schema = Yup.object().shape({
			amount: Yup.number().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { amount } = req.body;
		const sessionId = this.createSession;
		// eslint-disable-next-line no-undef
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
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async getCardFlag(req, res) {
		const schema = Yup.object().shape({
			bin: Yup.number().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { bin } = req.body;
		const sessionId = this.createSession;

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};
		const URL = `https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin?tk=${sessionId}&creditCard=${bin}`;

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async getCardToken(req, res) {
		const schema = Yup.object().shape({
			cardNumber: Yup.number().required(),
			cardBrand: Yup.string().required(),
			cardCvv: Yup.number().required(),
			cardExpirationMonth: Yup.number().required(),
			cardExpirationYear: Yup.number().required(),
			amount: Yup.number().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		// eslint-disable-next-line no-undef
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

		const sessionId = this.createSession;
		const {
			cardNumber,
			cardBrand,
			cardCvv,
			cardExpirationMonth,
			cardExpirationYear,
			amount,
		} = req.body;

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
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async getInstallments(req, res) {
		const schema = Yup.object().shape({
			creditCardBrand: Yup.number().required(),
			amount: Yup.number().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const sessionId = this.createSession;
		const { creditCardBrand, amount } = req.body;

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		const URL = `${URLBASE}/checkout/v2/installments.json?sessionId=${sessionId}&amount=${amount}&creditCardBrand=${creditCardBrand}`;

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async payment(req, res) {
		const schema = Yup.object().shape({
			paymentMethod: Yup.string().required(),
			extraAmount: Yup.number(),
			items: Yup.array().required(),
			reference: Yup.string().required(),
			senderName: Yup.string().required(),
			senderCPF: Yup.string().required(),
			senderAreaCode: Yup.string().required(),
			senderPhone: Yup.string().required(),
			senderEmail: Yup.string().required(),
			senderHash: Yup.string().required(),

			shippingAddressRequired: Yup.string(),
			street: Yup.string().when('shippingAddressRequired', {
				is: true,
				then: Yup.string().required(),
			}),
			number: Yup.string().when('shippingAddressRequired', {
				is: true,
				then: Yup.string().required(),
			}),
			complement: Yup.string().when('shippingAddressRequired', {
				is: true,
				then: Yup.string().required(),
			}),
			district: Yup.string().when('shippingAddressRequired', {
				is: true,
				then: Yup.string().required(),
			}),
			postalCode: Yup.string().when('shippingAddressRequired', {
				is: true,
				then: Yup.string().required(),
			}),
			city: Yup.string().when('shippingAddressRequired', {
				is: true,
				then: Yup.string().required(),
			}),
			state: Yup.string().when('shippingAddressRequired', {
				is: true,
				then: Yup.string().required(),
			}),
			type: Yup.string().when('shippingAddressRequired', {
				is: true,
				then: Yup.string().required(),
			}),
			cost: Yup.string().when('shippingAddressRequired', {
				is: true,
				then: Yup.string().required(),
			}),

			creditCardToken: Yup.string().when('paymentMethod', {
				is: paymentMethod => paymentMethod === 'creditCard',
				then: Yup.string().required(),
			}),
			installmentValue: Yup.string().when('paymentMethod', {
				is: paymentMethod => paymentMethod === 'creditCard',
				then: Yup.string().required(),
			}),
			creditCardHolderName: Yup.string().when('paymentMethod', {
				is: paymentMethod => paymentMethod === 'creditCard',
				then: Yup.string().required(),
			}),
			creditCardHolderCPF: Yup.string().when('paymentMethod', {
				is: paymentMethod => paymentMethod === 'creditCard',
				then: Yup.string().required(),
			}),
			creditCardHolderBirthDate: Yup.string().when('paymentMethod', {
				is: paymentMethod => paymentMethod === 'creditCard',
				then: Yup.string().required(),
			}),
			creditCardHolderAreaCode: Yup.string().when('paymentMethod', {
				is: paymentMethod => paymentMethod === 'creditCard',
				then: Yup.string().required(),
			}),
			creditCardHolderPhone: Yup.string().when('paymentMethod', {
				is: paymentMethod => paymentMethod === 'creditCard',
				then: Yup.string().required(),
			}),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const shippingAddressRequired = req.body.shippingAddressRequired || false;
		const installmentQuantity = req.body.installmentQuantity || 0;
		const noInterestInstallmentQuantity =
			process.env.NO_INTEREST_INSTALLMENT_QUANTITY || 2;

		const {
			paymentMethod,
			items,
			reference,
			senderName,
			senderCPF,
			senderAreaCode,
			senderPhone,
			senderEmail,
			senderHash,
		} = req.body;

		// eslint-disable-next-line no-undef
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

		const extraAmount = req.body.extraAmount || 0.0;
		const urlencoded = new URLSearchParams();
		urlencoded.append('paymentMode', 'default');
		urlencoded.append('paymentMethod', paymentMethod);
		urlencoded.append('receiverEmail', process.env.RECEIVER_EMAIL);
		urlencoded.append('currency', 'BRL');
		urlencoded.append('extraAmount', extraAmount);

		const i = 1;
		items.forEach(item => {
			urlencoded.append(`itemId${i}`, item.id);
			urlencoded.append(`itemDescription${i}`, item.description);
			urlencoded.append(`itemAmount${i}`, item.amount);
			urlencoded.append(`itemQuantity${i}`, item.quantitty);
		});

		// urlencoded.append('notificationURL', 'https://sualoja.com.br/notifica.html');
		urlencoded.append('reference', reference);
		urlencoded.append('senderName', senderName);
		urlencoded.append('senderCPF', senderCPF);
		urlencoded.append('senderAreaCode', senderAreaCode);
		urlencoded.append('senderPhone', senderPhone);
		urlencoded.append('senderEmail', senderEmail);
		urlencoded.append('senderHash', senderHash);

		urlencoded.append('shippingAddressRequired', shippingAddressRequired);
		if (shippingAddressRequired) {
			const {
				street,
				number,
				complement,
				district,
				postalCode,
				city,
				state,
				type,
				cost,
			} = req.body;

			urlencoded.append('shippingAddressStreet', street);
			urlencoded.append('shippingAddressNumber', number);
			urlencoded.append('shippingAddressComplement', complement);
			urlencoded.append('shippingAddressDistrict', district);
			urlencoded.append('shippingAddressPostalCode', postalCode);
			urlencoded.append('shippingAddressCity', city);
			urlencoded.append('shippingAddressState', state);
			urlencoded.append('shippingAddressCountry', 'BRA');
			urlencoded.append('shippingType', type);
			urlencoded.append('shippingCost', cost);
		}

		if (paymentMethod === 'creditCard') {
			const {
				creditCardToken,
				installmentValue,
				creditCardHolderName,
				creditCardHolderCPF,
				creditCardHolderBirthDate,
				creditCardHolderAreaCode,
				creditCardHolderPhone,
			} = req.body;

			urlencoded.append('creditCardToken', creditCardToken);
			urlencoded.append('installmentQuantity', installmentQuantity);
			urlencoded.append('installmentValue', installmentValue);
			urlencoded.append(
				'noInterestInstallmentQuantity',
				noInterestInstallmentQuantity
			);
			urlencoded.append('creditCardHolderName', creditCardHolderName);
			urlencoded.append('creditCardHolderCPF', creditCardHolderCPF);
			urlencoded.append('creditCardHolderBirthDate', creditCardHolderBirthDate);
			urlencoded.append('creditCardHolderAreaCode', creditCardHolderAreaCode);
			urlencoded.append('creditCardHolderPhone', creditCardHolderPhone);

			if (shippingAddressRequired) {
				const {
					street,
					number,
					complement,
					district,
					postalCode,
					city,
					state,
				} = req.body;

				urlencoded.append('billingAddressStreet', street);
				urlencoded.append('billingAddressNumber', number);
				urlencoded.append('billingAddressComplement', complement);
				urlencoded.append('billingAddressDistrict', district);
				urlencoded.append('billingAddressPostalCode', postalCode);
				urlencoded.append('billingAddressCity', city);
				urlencoded.append('billingAddressState', state);
				urlencoded.append('billingAddressCountry', 'BRA');
			}
		}

		const URL = `${URLBASE}/v2/sessions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;
		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: urlencoded,
			redirect: 'follow',
		};

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async getByReferenceCode(req, res) {
		const schema = Yup.object().shape({
			referenceCode: Yup.number().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { referenceCode } = req.body;

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		const URL = `${URLBASE}/v2/transactions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&reference=${referenceCode}`;

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async getByDateInterval(req, res) {
		const schema = Yup.object().shape({
			initialDate: Yup.date().required(),
			finalDate: Yup.date().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { initialDate, finalDate } = req.body;
		const page = req.body.page || 1;
		const maxPageResults = req.body.maxPageResults || 50;

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		const URL = `${URLBASE}/v2/transactions?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&initialDate=${initialDate}&finalDate=${finalDate}&page=${page}&maxPageResults=${maxPageResults}`;

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async getTransactionsDetails(req, res) {
		const schema = Yup.object().shape({
			transactionCode: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { transactionCode } = req.body;

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		const URL = `${URLBASE}/v3/transactions/${transactionCode}?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async getNotificationCode(req, res) {
		const schema = Yup.object().shape({
			notificationCode: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { notificationCode } = req.body;

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		const URL = `${URLBASE}/v3/transactions/notifications/${notificationCode}?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}`;

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async cancelTransaction(req, res) {
		const schema = Yup.object().shape({
			transactionCode: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { transactionCode } = req.body;

		const requestOptions = {
			method: 'POST',
			redirect: 'follow',
		};

		const URL = `${URLBASE}/v2/transactions/cancels?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&transactionCode=${transactionCode}`;

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async refundTransaction(req, res) {
		const schema = Yup.object().shape({
			transactionCode: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { transactionCode } = req.body;

		const requestOptions = {
			method: 'POST',
			redirect: 'follow',
		};

		const URL = `${URLBASE}/v2/transactions/refunds?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&transactionCode=${transactionCode}`;

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}

	async parcialRefunds(req, res) {
		const schema = Yup.object().shape({
			transactionCode: Yup.string().required(),
			refundValue: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { transactionCode, refundValue } = req.body;
		const URL = `${URLBASE}/v2/transactions/refunds?email=${EMAIL_PAGSEGURO}&token=${TOKEN_PAGSEGURO}&transactionCode=${transactionCode}&refundValue=${refundValue}`;

		const requestOptions = {
			method: 'POST',
			redirect: 'follow',
		};

		fetch(URL, requestOptions)
			.then(response => response.text())
			.then(result => {
				const reg = JSON.parse(parser.toJson(result));
				return res.json(reg);
			})
			.catch(error => {
				// eslint-disable-next-line no-console
				console.log(error);
				return res.json({});
			});
	}
}

export default new PagSeguroController();
