import * as Yup from 'yup';
import mercadopago from 'mercadopago';
import User from '../models/User';
import Orders from '../schemas/Orders';
import CRUD from '../repository/crud';

mercadopago.configure({
	sandbox: process.env.NODE_ENV === 'dev',
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	access_token: process.env.MP_ACCESS_TOKEN,
});


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
		const item = Yup.object().shape({
			id: Yup.number(),
			description: Yup.string(),
			title: Yup.string().default((description) => description),
			quantity: Yup.number(),
			currency_id: Yup.string(),
			unit_price: Yup.number(),
		});

		const schema = Yup.object().shape({
			items: Yup.array().of(item).required(),
			user_id: Yup.number().required(),
			// provider_id: Yup.number().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			console.log(err);
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});
		const {items, user_id, provider_id } = req.body;
		
		const user = await CRUD.findOne(User, {
			where: { id: user_id },
		});
		
		if (!user) {
			return res
				.status(400)
				.set({ error: 'User not exists' })
				.json({});
		}

		// const provider = await CRUD.findOne(User, {
		// 	where: { id: provider_id, provider: true },
		// });

		// if (!provider) {
		// 	return res
		// 		.status(400)
		// 		.set({ error: 'Provider not exists, or user not is provider' })
		// 		.json({});
		// }

		const reference = `JB-${Date.now()}`;
		
		const payment_data = {
			items,
			payer: {
				email: user.email,
			},
			external_reference: reference,
		};

		try {
			const payment = await mercadopago.preferences.create(payment_data);
			// eslint-disable-next-line no-console
			console.log('MercadoPago payment', payment);
			// const order = await CRUD.create(
			// 	Orders,{reference,user,provider,items},true
			// );
			const order = await CRUD.create(
				Orders,{reference,user,items},true
			);
			return res.send({ payment, order });
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log('MercadoPago error', err);
			return res.json(err);
		}
	}
}

export default new MercadoPagoController();
