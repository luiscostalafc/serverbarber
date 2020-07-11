import CRUD from '../repository/crud';
import User from '../models/User';

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
		});

		return res.json(users);
	}

	async woman(req, res) {
		const users = await CRUD.findAll(User, {
			where: { provider: true, gender: 1 },
		});

		return res.json(users);
	}
}

export default new ProviderController();
