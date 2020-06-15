import User from '../models/User';
import Notification from '../schemas/Notification';
import CRUD from '../repository/crud';

class NotificationController {
	async index(req, res) {
		const checkIsProvider = await CRUD.findOne(User, {
			where: { id: req.userId, provider: true },
		});

		if (!checkIsProvider) {
			return res
				.status(401)
				.json({ error: 'Only provider can load notifications' });
		}

		const notifications = await CRUD.findAndSort(
			Notification,
			{
				user: req.userId,
			},
			{ createdAt: 'desc' }
		);

		return res.json(notifications);
	}

	async update(req, res) {
		const notification = await CRUD.findByIdAndUpdate(
			Notification,
			req.params.id,
			{ read: true },
			{ new: true }
		);

		return res.json(notification);
	}
}

export default new NotificationController();
