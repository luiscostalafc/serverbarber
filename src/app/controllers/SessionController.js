import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';
import CRUD from '../repository/crud';

class SessionController {
	async store(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string()
				.email()
				.required(),
			password: Yup.string().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { email } = req.body;

		const user = await CRUD.findOne(User, {
			where: { email },
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['id', 'path', 'url'],
				},
			],
		});

		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}

		const { id, name, avatar, provider, is_admin, gender } = user;

		return res.json({
			user: {
				id,
				name,
				email,
				provider,
				avatar,
				is_admin,
				gender,
			},
			token: jwt.sign({ id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	}
}

export default new SessionController();
