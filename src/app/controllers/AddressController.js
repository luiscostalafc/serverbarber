import * as Yup from 'yup';
import Address from '../models/Address';
import User from '../models/User';
import CRUD from '../repository/crud';

class AddressController {
	async index(req, res) {
		const address = await CRUD.findAll(Address, {
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'provider', 'email', 'gender', 'is_admin'],
				},
			],
		});
		return res.json(address);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			user_id: Yup.number().required(),
			cep: Yup.string(),
			zone: Yup.string(),
			state: Yup.string(),
			city: Yup.string(),
			district: Yup.string(),
			street: Yup.string(),
			number: Yup.string(),
			complement: Yup.string(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const address = await CRUD.createOrUpdate(
			Address,
			{ user_id: req.body.user_id },
			req.body
		);
		return res.json(address);
	}

	async show(req, res) {
		const address = await CRUD.findOne(Address, {
			where: { id: req.params.id },
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'provider', 'email', 'gender', 'is_admin'],
				},
			],
		});
		return res.json(address);
	}

	async update(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
		// const schema = Yup.object().shape({
		// 	user_id: Yup.number().required(),
		// 	cep: Yup.string(),
		// 	zone: Yup.string(),
		// 	state: Yup.string(),
		// 	city: Yup.string(),
		// 	district: Yup.string(),
		// 	street: Yup.string(),
		// 	number: Yup.string(),
		// 	complement: Yup.string(),
		// });

		// schema.validate(req.body, { abortEarly: false }).catch(err => {
		// 	return res
		// 		.status(422)
		// 		.set({ error: err.errors.join(', ') })
		// 		.json({});
		// });

		// const address = await CRUD.findByIdAndUpdate(
		// 	Address,
		// 	req.params.id,
		// 	{ read: true },
		// 	{ new: true }
		// );
		// return res.json(address);
	}

	async delete(req, res) {
		const address = await CRUD.findByPk(Address, req.params.id);
		await address.destroy();
		return res.json(address);
	}
}

export default new AddressController();
