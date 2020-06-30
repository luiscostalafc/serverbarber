import * as Yup from 'yup';
import moment from 'moment';
import User from '../models/User';
import Forgot from '../schemas/Forgot';
import CRUD from '../repository/crud';

import ForgotMail from '../jobs/ForgotMail';
import Queue from '../../lib/Queue';

class ForgotController {
	async index(req, res) {
		const forgot = await CRUD.find(Forgot, {}, true);

		return res.json(forgot);
	}

	async create(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string()
				.email()
				.required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const user = await CRUD.findOne(User, {
			where: { email: req.body.email },
		});
		if (!user) {
			return res
				.status(400)
				.set({ error: 'User not exists' })
				.json({});
		}
		const randompass = Math.random()
			.toString(36)
			.slice(-8);

		const update = await user.update({
			password: randompass,
			password_request: true,
		});

		if (!update) res.json({ error: 'User not updated' });

		const forgot = await CRUD.create(
			Forgot,
			{
				password_hash: user.password_hash,
				user_id: user.id,
			},
			true
		);

		try {
			await Queue.add(ForgotMail.key, {
				user,
				randompass,
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}

		return res.json({ user, forgot });
	}

	async changepass(req, res) {
		const schema = Yup.object().shape({
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
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { oldPassword } = req.body;

		const user = await CRUD.findOne(User, {
			where: { email: req.body.email },
		});
		if (!user) {
			return res
				.status(400)
				.set({ error: 'User not exists' })
				.json({});
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match' });
		}

		const forgot = await CRUD.findOne(
			Forgot,
			{ user_id: user.id },
			{},
			{ created_at: -1 }
		);

		const now = moment();
		const diff = now.diff(forgot.createdAt, 'minutes');

		if (diff > process.env.CHANGEPASS_VALID_TIME) {
			return res.status(401).json({ error: 'That password has expired' });
		}

		req.body.password_request = false;
		const update = await user.update(req.body);
		if (!update) return res.json({ error: 'User not updated' });

		const findUser = await CRUD.findOne(User, {
			where: { email: req.body.email },
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
}

export default new ForgotController();
