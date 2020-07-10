import * as Yup from 'yup';
import Phone from '../models/Phone';
import User from '../models/User';
import CRUD from '../repository/crud';
import SYNC from '../repository/sync';

class PhoneController {
	async index(req, res) {
		const phones = await CRUD.findAll(Phone, {
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'provider', 'email', 'gender', 'is_admin'],
				},
			],
		});
		return res.json(phones);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
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
			where: { number: req.body.number },
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
		const phone = await CRUD.findOne(Phone, {
			where: { id: req.params.id },
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'provider', 'email', 'gender', 'is_admin'],
				},
			],
		});
		return res.json(phone);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			area_code: Yup.string().required(),
			number: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const phone = await CRUD.findByIdAndUpdate(Phone, req.params.id, req.body);
		return res.json(phone);
	}

	async delete(req, res) {
		const reg = await CRUD.findByIdAndDestroy(Phone, req.params.id);
		return res.json(reg);
	}

	async sync(req, res) {
		const { phoneId, userId } = req.params;
		const sync = await SYNC.phoneAddUser(phoneId, userId);
		return res.json(sync);
	}
}

export default new PhoneController();
