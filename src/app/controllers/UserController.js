import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Category from '../models/Category';

//import EnrollmentMail from '../jobs/EnrollmentMail';
//import Queue from '../../lib/Queue';

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
			phone: Yup.string()
				.required(),
			zipcode: Yup.string(),
			street: Yup.string().required(),
			number: Yup.string().required(),
			complement: Yup.string(),
			district: Yup.string(),
			city: Yup.string().required(),
			state: Yup.string().required()

		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'validation fails' });
		}

		const userExists = await User.findOne({ where: { email: req.body.email } });

		if (userExists) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const { id, name, email, phone, zipcode, street, number, complement, district, city, state, provider } = await User.create(req.body);


		// await Queue.add(EnrollmentMail.key, {
		// 	id,
		// 	name,
		// 	email
		// });

		return res.json({
			id,
			name,
			email,
			provider,
			phone,
			zipcode,
			street,
			number,
			complement,
			district,
			city,
			state
		});
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
			phone: Yup.string(),
			zipcode: Yup.string(),
			street: Yup.string(),
			number: Yup.string(),
			complement: Yup.string(),
			district: Yup.string(),
			city: Yup.string(),
			state: Yup.string(),
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

		const { id, name, email: NewEmail, avatar, category, phone, zipcode, street, number, complement, district, city, state } = await User.findByPk(
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
			phone,
			zipcode,
			street,
			number,
			complement,
			district,
			city,
			state
		});
	}
}

export default new UserController();
