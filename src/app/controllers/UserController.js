import * as Yup from 'yup';
import coloredLog from '../../lib/ColoredLog';
import User from '../models/User';
import File from '../models/File';
import Category from '../models/Category';

// import EnrollmentMail from '../jobs/EnrollmentMail';
// import Queue from '../../lib/Queue';

const emptyUser = { id: null, name: null, email: null, provider: null };
class UserController {
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
				.json(emptyUser);
		});

		try {
			const userExists = await User.findOne({
				where: { email: req.body.email },
			});
			if (userExists) {
				return res
					.status(400)
					.set({ error: 'User already exists' })
					.json(emptyUser);
			}
		} catch (error) {
			const errorMsg = error.stack;
			console.error(
				coloredLog(`UserController store search error: ${errorMsg}`, 'error')
			);
			return res
				.status(400)
				.set({ error: errorMsg })
				.json(emptyUser);
		}

		try {
			const { id, name, email, provider } = await User.create(req.body);
			return res.json({
				id,
				name,
				email,
				provider,
			});
		} catch (error) {
			const errorMsg = error.stack;
			console.error(
				coloredLog(`UserController store create error: ${errorMsg}`, 'error')
			);
			return res
				.status(400)
				.set({ error: errorMsg })
				.json(emptyUser);
		}

		// await Queue.add(EnrollmentMail.key, {
		// 	id,
		// 	name,
		// 	email
		// });
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

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'validation fails' });
		}
		const { email, oldPassword } = req.body;

		const user = await User.findByPk(req.userId);

		if (email && email !== user.email) {
			const userExists = await User.findOne({
				where: { email },
			});

			if (userExists) {
				return res.status(400).json({ error: 'User already exists' });
			}
		}

		if (oldPassword && !(await user.chekckPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match' });
		}

		await user.update(req.body);

		const { id, name, email: NewEmail, avatar, category } = await User.findByPk(
			req.userId,
			{
				include: [
					{
						model: File,
						as: 'avatar',
						attributes: ['id', 'path', 'url'],
					},
					{
						model: Category,
						as: 'category',
						attributes: ['id', 'name'],
					},
				],
			}
		);

		return res.json({
			id,
			name,
			email: NewEmail,
			avatar,
			category,
		});
	}
}

export default new UserController();
