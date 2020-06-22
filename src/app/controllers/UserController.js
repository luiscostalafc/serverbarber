import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import Point from '../models/Point';
import Appointment from '../models/Appointment';
import Phone from '../models/Phone';
import Category from '../models/Category';
import Card from '../models/Card';

import CRUD from '../repository/crud';

// import EnrollmentMail from '../jobs/EnrollmentMail';
// import Queue from '../../lib/Queue';

const emptyRegistry = { };
class UserController {
	async index(req, res) {
		const users = await CRUD.findAll(User);
		return res.json(users);
	}

	async providers(req, res) {
		const users = await CRUD.findAll(User,  {
			where: { provider: true },
		});
		return res.json(users);
	}

	async notProviders(req, res) {
		const users = await CRUD.findAll(User,  {
			where: { provider: false },
		});
		return res.json(users);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string()
				.email()
				.required(),
			password: Yup.string()
				.required()
				.min(6),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json(emptyRegistry);
		});

		const userExists = await CRUD.findOne(User, {
			where: { email: req.body.email },
		});
		if (userExists) {
			return res
				.status(400)
				.set({ error: 'User already exists' })
				.json(emptyRegistry);
		}

		const createUser = await CRUD.create(User, req.body);
		if (!createUser) res.json({ erro: 'User not created' });

		const { id, name, email, provider } = createUser;
		return res.json({
			id,
			name,
			email,
			provider,
		});

		// await Queue.add(EnrollmentMail.key, {
		// 	id,
		// 	name,
		// 	email
		// });
	}

	async show(req, res) {
		const user = await CRUD.findByPk(User, req.params.id, {
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['id', 'path', 'url'],
				},
				{
					model: Category,
					as: 'categories',
					attributes: ['id', 'name'],
				},
				{
					model: Point,
					as: 'points',
					attributes: ['id', 'name', 'latitude', 'longitude'],
				},
				{
					model: Appointment,
					as: 'appointments',
					attributes: ['id', 'date', 'user_id', 'provider_id', 'canceled_at'],
				},
				{
					model: Phone,
					as: 'phones',
					attributes: ['id','type', 'area_code', 'number'],
				},
				{
					model: Card,
					as: 'cards',
					attributes: ['id','card_token', 'holder_name', 'holder_cpf', 'holder_birth_date'],
				},
			],
		});

		return res.json(user);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string().min(6),
			password: Yup.string()
				.min(6)
				.when('oldPassword', (oldPassword, field) =>
					oldPassword ? field.required() : field
				),
			confirmPassword: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field
			),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json(emptyRegistry);
		});

		const { oldPassword } = req.body;
		const user = await CRUD.findByPk(User, req.params.id);

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match' });
		}

		const update = await user.update(req.body);
		if (!update) res.json({ error: 'User not updated' });

		const findUser = await CRUD.findByPk(User, req.params.id, {
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['id', 'path', 'url'],
				},
				{
					model: Category,
					as: 'categories',
					attributes: ['id', 'name'],
				},
			],
		});

		if (!findUser) res.json({ error: 'User not found' });
		const { id, name, email: NewEmail, avatar, category } = findUser;

		return res.json({
			id,
			name,
			email: NewEmail,
			avatar,
			category,
		});
	}

	async delete(req, res) {
		const findAndDelete = await CRUD.findByIdAndDestroy(User, req.params.id);
		return res.status(200).json(findAndDelete);
	}
}

export default new UserController();
