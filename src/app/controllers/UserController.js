import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import Point from '../models/Point';
import Appointment from '../models/Appointment';
import Address from '../models/Address';
import Phone from '../models/Phone';
import Category from '../models/Category';
import Card from '../models/Card';

import CRUD from '../repository/crud';
import SYNC from '../repository/sync';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

const emptyRegistry = {};
class UserController {
	async index(req, res) {
		const users = await CRUD.findAll(User);
		return res.json(users);
	}

	async providers(req, res) {
		const users = await CRUD.findAll(User, {
			where: { provider: true },
			include: [
				{
					model: Phone,
					as: 'phones',
					attributes: ['id', 'area_code', 'number'],
				},
				{
					model: File,
					as: 'avatar',
					attributes: ['id', 'path', 'url'],
				},
				{
					model: Address,
					as: 'address',
					attributes: [
						'id',
						'cep',
						'zone',
						'state',
						'city',
						'district',
						'street',
						'number',
						'complement',
					],
				},
			],
		});
		return res.json(users);
	}

	async notProviders(req, res) {
		const users = await CRUD.findAll(User, {
			where: { provider: false },
			include: [
				{
					model: Phone,
					as: 'phones',
					attributes: ['id', 'area_code', 'number'],
				},
				{
					model: Address,
					as: 'address',
					attributes: [
						'id',
						'cep',
						'zone',
						'state',
						'city',
						'district',
						'street',
						'number',
						'complement',
					],
				},
			],
		});
		return res.json(users);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required('Preencha seu nome completo!'),
			email: Yup.string(' O e-mail é obrigatório!')
				.email()
				.required(),
			password: Yup.string('Senha dever ter no mínimo de 6 caracteres!')
				.required()
				.min(6),
			phone: Yup.string('Preencha seu número com o DDD!').required(),
			provider: Yup.boolean(),
			gender: Yup.number().when('provider', {
				is: provider => provider,
				then: Yup.number().required(),
			}),
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

		const userData = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			provider: !!req.body.provider,
		};

		const createUser = await CRUD.create(User, userData);
		if (!createUser) res.json({ erro: 'User not created' });

		const { phone } = req.body;
		const phone_parts = phone.split(' ');

		const area_code = phone_parts[0].replace(/[()]/g, '');
		const number = phone_parts[1].replace(/[()]/g, '');

		const createPhone = await CRUD.create(Phone, { area_code, number });
		if (!createPhone) res.json({ erro: 'Phone not created' });

		const sync = await SYNC.phoneAddUser(createPhone.id, createUser.id);
		if (!sync) res.json({ erro: 'Phone and User not sync' });

		const { id, name, email, provider, gender } = createUser;

		try {
			await Queue.add(EnrollmentMail.key, {
				id,
				name,
				email,
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}

		return res.json({
			id,
			name,
			email,
			provider,
			phone: createPhone,
			sync,
			gender,
		});
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
					attributes: ['id', 'area_code', 'number'],
				},
				{
					model: Card,
					as: 'cards',
					attributes: [
						'id',
						'card_token',
						'holder_name',
						'holder_cpf',
						'holder_birth_date',
					],
				},
				{
					model: Address,
					as: 'address',
					attributes: [
						'id',
						'cep',
						'zone',
						'state',
						'city',
						'district',
						'street',
						'number',
						'complement',
					],
				},
			],
		});

		return res.json(user);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string().email(),
			oldPassword: Yup.string()
				.min(6)
				.required(),
			password: Yup.string()
				.min(6)
				.when('oldPassword', (oldPassword, field) =>
					oldPassword ? field.required() : field
				),
			confirmPassword: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field
			),
			provider: Yup.boolean(),
			gender: Yup.number().when('provider', {
				is: provider => provider,
				then: Yup.number().required(),
			}),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json(emptyRegistry);
		});

		const { email } = req.body;

		const user = await User.findByPk(req.userId);

		if (email && email !== user.email) {
			const userExists = await User.findOne({
				where: { email },
			});

			if (userExists) {
				return res.status(400).json({ error: 'User already exists' });
			}
		}

		const update = await user.update(req.body);
		if (!update) res.json({ error: 'User not updated' });

		const findUser = await CRUD.findByPk(User, req.userId, {
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
					model: Address,
					as: 'address',
					attributes: [
						'id',
						'cep',
						'zone',
						'state',
						'city',
						'district',
						'street',
						'number',
						'complement',
					],
				},
			],
		});

		if (!findUser) res.json({ error: 'User not found' });
		const {
			id,
			name,
			email: NewEmail,
			avatar,
			category,
			gender,
			provider,
		} = findUser;

		return res.json({
			id,
			name,
			email: NewEmail,
			avatar,
			category,
			gender,
			provider,
		});
	}

	async delete(req, res) {
		const findAndDelete = await CRUD.findByIdAndDestroy(User, req.params.id);
		return res.status(200).json(findAndDelete);
	}
}

export default new UserController();
