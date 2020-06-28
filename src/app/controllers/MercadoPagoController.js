import * as Yup from 'yup';
import mercadopago from 'mercadopago';
// import CRUD from '../repository/crud';

mercadopago.configure({
	sandbox: process.env.NODE_ENV === 'dev',
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	access_token: process.env.MP_ACCESS_TOKEN,
});

// mercadopago.configurations.setAccessToken(config.access_token);

class MercadoPagoController {
	async getAcessToken(req, res) {
		try {
			const accessToken = await mercadopago.getAccessToken();
			// eslint-disable-next-line no-console
			console.log('MercadoPago accessToken', accessToken);
			return res.json(accessToken);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
			return res.json('MercadoPago error', err);
		}
	}

	async payment(req, res) {
		// const schema = Yup.object().shape({
		// 	id: Yup.number().required(),
		// 	email: Yup.email().required(),
		// 	description: Yup.string().required(),
		// 	amount: Yup.number().required(),
		// });

		// schema.validate(req.body, { abortEarly: false }).catch(err => {
		// 	return res
		// 		.status(422)
		// 		.set({ error: err.errors.join(', ') })
		// 		.json({});
		// });

		const { id, email, description, amount } = req.body;

		const payment_data = {
			items: [
				{
					id,
					title: description,
					description,
					quantity: 1,
					currency_id: 'BRL',
					unit_price: parseFloat(amount),
				},
			],
			payer: {
				email,
			},
			external_reference: 'teste',
		};

		try {
			const response = await mercadopago.preferences.create(payment_data);
			// eslint-disable-next-line no-console
			console.log('MercadoPago payment', response);
			return res.send(response);
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log('MercadoPago error', err);
			return res.json(err);
		}
	}
}

export default new MercadoPagoController();
