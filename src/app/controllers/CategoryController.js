import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';
import File from '../models/File';
import CRUD from '../repository/crud';
import SYNC from '../repository/sync';

class CategoryController {
	async index(req, res) {
		const categories = await CRUD.findAll(Category, {
			include: [
				{
					model: User,
					as: 'providers',
					attributes: ['id', 'name', 'provider', 'email'],
				},
			],
		});
		return res.json(categories);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			price: Yup.number().required(),
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
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['id', 'path', 'url'],
				},
				{
					model: User,
					as: 'providers',
					attributes: ['id', 'name', 'provider', 'email'],
				},
			],
		});
		return res.json(category);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			price: Yup.number().required(),
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
		const sync = await SYNC.categoryAddUser(categoryId, userId);
		return res.json(sync);
	}
}

export default new CategoryController();
