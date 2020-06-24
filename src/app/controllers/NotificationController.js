import * as Yup from 'yup';
import { startOfHour, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

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
				.status(400)
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

	async store(req, res) {
		const schema = Yup.object().shape({
			provider_id: Yup.number().required(),
			date: Yup.date().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { provider_id, date } = req.body;

		const user = await CRUD.findByPk(User, provider_id);

		const hourStart = startOfHour(parseISO(date));
		const formatedDate = format(
			hourStart,
			"'dia' dd 'de' MMMM', às ' H:mm'h'",
			{ locale: pt }
		);

		const notification = await CRUD.create(
			Notification,
			{
				content: `Novo agendamento de ${user.name}
			para ${formatedDate}`,
				user: provider_id,
			},
			true
		);

		return res.json(notification);

		// const ownerSocket = req.connectedUsers[provider_id];

		// if (ownerSocket) {
		// 	req.io.to(ownerSocket).emit('notification', notification);
		// }
	}

	async create(data) {
		const { provider_id, date } = data;
		const user = await CRUD.findByPk(User, provider_id);

		const hourStart = startOfHour(parseISO(date));
		const formatedDate = format(
			hourStart,
			"'dia' dd 'de' MMMM', às ' H:mm'h'",
			{ locale: pt }
		);

		const notification = await CRUD.create(
			Notification,
			{
				content: `Novo agendamento de ${user.name}
			para ${formatedDate}`,
				user: provider_id,
			},
			true
		);

		return notification;
	}

	async show(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			provider_id: Yup.number().required(),
			date: Yup.date().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const notification = await CRUD.findByIdAndUpdateMongo(
			Notification,
			req.params.id,
			req.body
		);

		return res.json(notification);
	}

	async delete(req, res) {
		const reg = await CRUD.findByIdAndRemove(Notification, req.params.id);
		return res.json(reg);
	}
}

export default new NotificationController();
