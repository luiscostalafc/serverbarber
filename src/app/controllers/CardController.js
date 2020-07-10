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
			holder_birth_date: Yup.date().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const cardExists = await CRUD.findOne(Card, {
			where: { card_number: req.body.card_number },
		});
		if (cardExists) {
			return res
				.status(400)
				.set({ error: 'Card already exists' })
				.json({});
		}

		const card = await CRUD.create(Card, req.body);
		return res.json(card);
	}

	async show(req, res) {
		const reg = await CRUD.findByPk(Card, req.params.id, {
			include: [
				{
					model: User,
					attributes: ['name', 'email', 'gender', 'provider', 'is_admin'],
				},
			],
		});

		return res.json(reg);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
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
			holder_birth_date: Yup.date().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const card = await CRUD.findByIdAndUpdate(Card, req.params.id, req.body);
		return res.json(card);
	}

	async delete(req, res) {
		const card = await CRUD.findByIdAndDestroy(Card, req.params.id);
		return res.json(card);
	}

	async sync(req, res) {
		const { CardId } = req.params;
		const { userId } = req.params;
		const card = await CRUD.findByPk(Card, CardId);
		if (!card) return res.json({ error: 'Card not found' });

		const user = await CRUD.findByPk(User, userId);
		if (!user) return res.json({ error: 'User not found' });

		try {
			const syncUser = await Card.addUser(user);
			// eslint-disable-next-line no-console
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
