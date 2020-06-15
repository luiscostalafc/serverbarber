import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';
import CRUD from '../repository/crud';

class CategoryController {
	async index(req, res) {
		const categories = await CRUD.findAll(Category, {
			include: [
				{
					model: User,
					attributes: ['id', 'name', 'provider', 'email'],
				},
			],
		});
		return res.json(categories);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			gender: Yup.number()
				.integer()
				.required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const categoryExists = await CRUD.findOne(Category, {
			where: { name: req.body.name },
		});
		if (categoryExists) {
			return res
				.status(400)
				.set({ error: 'Category already exists' })
				.json({});
		}

		const categories = await CRUD.create(Category, req.body);
		return res.json(categories);
	}

	async gender(req, res) {
		const category = await CRUD.findAll(Category, {
			where: { gender: req.params.gender },
		});
		return res.json(category);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			gender: Yup.number()
				.integer()
				.required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const categoryExists = await CRUD.findOne(Category, {
			where: { name: req.body.name },
		});
		if (categoryExists) {
			return res
				.status(400)
				.set({ error: 'Category already exists' })
				.json({});
		}

		const category = await CRUD.findByIdAndUpdate(
			Category,
			req.params.id,
			{ read: true },
			{ new: true }
		);
		return res.json(category);
	}

	async delete(req, res) {
		const category = await CRUD.findByPk(Category, req.params.id);
		await category.destroy();
		return res.json(category);
	}

	async sync(req, res) {
		const { categoryId } = req.params;
		const { userId } = req.params;
		const category = await CRUD.findByPk(Category, categoryId);
		if (!category) return res.json({ error: 'Category not found' });

		const user = await CRUD.findByPk(User, userId);
		if (!user) return res.json({ error: 'User not found' });

		try {
			const syncUser = await category.addUser(user);
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

export default new CategoryController();
