import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
	async store(req, res) {

		const checkIsProvider = await User.findOne({
			where: { id: req.userId, provider: true },
		});

		if (!checkIsProvider) {
			return res
				.status(401)
				.json({ error: 'Only provider can have categories' });
		}

		const category = await Category.create({
			name,
		});

		return res.json(category);
	}
}

export default new CategoryController();
