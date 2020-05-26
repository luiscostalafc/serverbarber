import User from '../models/User';
import File from '../models/File';
import Category from '../models/Category';

class ProviderController {
	async index(req, res) {
		const providers = await User.findAll({
			where: { provider: true },
			attributes: ['id', 'name', 'email', 'avatar_id', 'category_id'],
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['name', 'path', 'url'],
				},
				{
					model: Category,
					as: 'category',
					attributes: ['name'],
				},

			],
		});

		return res.json(providers);
	}
}

export default new ProviderController();
