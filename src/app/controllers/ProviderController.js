import CRUD from '../repository/crud';
import User from '../models/User';
import File from '../models/File';

class ProviderController {
	async index(req, res) {
		const users = await CRUD.findAll(User, {
			where: { provider: true },
		});

		return res.json(users);
	}

	async man(req, res) {
		const users = await CRUD.findAll(User, {
			where: { provider: true, gender: 2 },
			attributes: ['id', 'name', 'email', 'avatar_id', 'gender'],
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['name', 'path', 'url'],
				},
			],
		});

		return res.json(users);
	}

	async woman(req, res) {
		const users = await CRUD.findAll(User, {
			where: { provider: true, gender: 1 },
			attributes: ['id', 'name', 'email', 'avatar_id', 'gender'],
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['name', 'path', 'url'],
				},
			],
		});

		return res.json(users);
	}
}

export default new ProviderController();
