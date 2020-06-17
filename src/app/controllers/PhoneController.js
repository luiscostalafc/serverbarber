import * as Yup from 'yup';
import Phone from '../models/Phone';
import User from '../models/User';
import CRUD from '../repository/crud';

class PhoneController {
	async index(req, res) {
		const phones = await CRUD.findAll(Phone, {
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'provider', 'email'],
				},
			],
		});
		return res.json(phones);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			type: Yup.string().required(),
			area_code: Yup.string().required(),
			number: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const phoneExists = await CRUD.findOne(Phone, {
			where: { name: req.body.name },
		});
		if (phoneExists) {
			return res
				.status(400)
				.set({ error: 'Phone already exists' })
				.json({});
		}

		const phones = await CRUD.create(Phone, req.body);
		return res.json(phones);
	}

	async show(req, res) {
		const Phone = await CRUD.findAll(Phone, {
			where: { gender: req.params.id },
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'provider', 'email'],
				},
			],
		});
		return res.json(Phone);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			type: Yup.string().required(),
			area_code: Yup.string().required(),
			number: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const phoneExists = await CRUD.findOne(Phone, {
			where: { name: req.body.name },
		});
		if (phoneExists) {
			return res
				.status(400)
				.set({ error: 'Phone already exists' })
				.json({});
		}

		const Phone = await CRUD.findByIdAndUpdate(
			Phone,
			req.params.id,
			{ read: true },
			{ new: true }
		);
		return res.json(Phone);
	}

	async delete(req, res) {
		const Phone = await CRUD.findByPk(Phone, req.params.id);
		await Phone.destroy();
		return res.json(Phone);
	}

	async sync(req, res) {
		const { PhoneId } = req.params;
		const { userId } = req.params;
		const Phone = await CRUD.findByPk(Phone, PhoneId);
		if (!Phone) return res.json({ error: 'Phone not found' });

		const user = await CRUD.findByPk(User, userId);
		if (!user) return res.json({ error: 'User not found' });

		try {
			const syncUser = await Phone.addUser(user);
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

export default new PhoneController();
