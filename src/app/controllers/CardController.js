import * as Yup from 'yup';
import Card from '../models/Card';
import User from '../models/User';
import CRUD from '../repository/crud';

class CardController {
	async index(req, res) {
		const categories = await CRUD.findAll(Card, {
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'provider', 'email'],
				},
			],
		});
		return res.json(categories);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			card_number: Yup.string().required(),
			brand: Yup.string().required(),
			cvv: Yup.string().required(),
			expiration_month: Yup.number()
				.integer()
				.required(),
			expiration_year: Yup.number()
				.integer()
				.required(),
			card_token: Yup.string().required(),
			holder_name: Yup.string().required(),
			holder_cpf: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const CardExists = await CRUD.findOne(Card, {
			where: { name: req.body.name },
		});
		if (CardExists) {
			return res
				.status(400)
				.set({ error: 'Card already exists' })
				.json({});
		}

		const categories = await CRUD.create(Card, req.body);
		return res.json(categories);
	}

	async show(req, res) {
		const Card = await CRUD.findAll(Card, {
			where: { id: req.params.show },
		});
		return res.json(Card);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			card_number: Yup.string().required(),
			brand: Yup.string().required(),
			cvv: Yup.string().required(),
			expiration_month: Yup.number()
				.integer()
				.required(),
			expiration_year: Yup.number()
				.integer()
				.required(),
			card_token: Yup.string().required(),
			holder_name: Yup.string().required(),
			holder_cpf: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const CardExists = await CRUD.findOne(Card, {
			where: { name: req.body.name },
		});
		if (CardExists) {
			return res
				.status(400)
				.set({ error: 'Card already exists' })
				.json({});
		}

		const Card = await CRUD.findByIdAndUpdate(
			Card,
			req.params.id,
			{ read: true },
			{ new: true }
		);
		return res.json(Card);
	}

	async delete(req, res) {
		const Card = await CRUD.findByPk(Card, req.params.id);
		await Card.destroy();
		return res.json(Card);
	}

	async sync(req, res) {
		const { CardId } = req.params;
		const { userId } = req.params;
		const Card = await CRUD.findByPk(Card, CardId);
		if (!Card) return res.json({ error: 'Card not found' });

		const user = await CRUD.findByPk(User, userId);
		if (!user) return res.json({ error: 'User not found' });

		try {
			const syncUser = await Card.addUser(user);
			console.log(syncUser);
			return res.json(syncUser);
		} catch (error) {
			const errorMsg = error.stack;
			// eslint-disable-next-line no-console
			console.error(`sync error: ${errorMsg}`);
			return res.json({});
		}
	}
}

export default new CardController();
