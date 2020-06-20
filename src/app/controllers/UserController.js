import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Category from '../models/Category';
import CRUD from '../repository/crud';

// import EnrollmentMail from '../jobs/EnrollmentMail';
// import Queue from '../../lib/Queue';

const emptyUser = { id: null, name: null, email: null, provider: null };
class UserController {
	async index(req, res) {
		const users = await CRUD.findAll(User);
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
				.json(emptyUser);
		});

		const userExists = await CRUD.findOne(User, {
			where: { email: req.body.email },
		});
		if (userExists) {
			return res
				.status(400)
				.set({ error: 'User already exists' })
				.json(emptyUser);
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
		return res.status(501).json({ error: 'Not implemented' });
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

		const user = await CRUD.findByPk(User, req.userId);

		if (email && email !== user.email) {
			const userExists = await CRUD.findOne(User, {
				where: { email },
			});

			if (userExists) {
				return res.status(400).json({ error: 'User already exists' });
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match' });
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
					as: 'category',
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
		return res.status(501).json({ error: 'Not implemented' });
	}
}

export default new UserController();
