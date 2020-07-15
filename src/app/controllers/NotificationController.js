/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import { startOfHour, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Notification from '../schemas/Notification';
import CRUD from '../repository/crud';

class NotificationController {
	async index(req, res) {
		const user = await CRUD.findOne(User, {
			where: { id: req.userId },
		});

		// se for ao menos uma das condições vai passar
		if (!user.provider && !user.is_admin) {
			return res
				.status(400)
				.json({ error: 'Only provider or admins can load notifications' });
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

		const { date } = req.body;
		const userId = req.body.user_id ? req.body.user_id : req.userId;
		const providerId = req.body.provider_id ? req.body.provider_id : userId;

		const user = await CRUD.findByPk(User, userId);
		const provider = await CRUD.findByPk(User, providerId);

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
				user,
				provider,
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
		const { user_id, provider_id, date, items } = data;
		const user = await CRUD.findByPk(User, user_id);
		const provider = await CRUD.findByPk(User, provider_id);

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
				user,
				provider,
				items,
			},
			true
		);

		return notification;
	}

	async show(req, res) {
		const notification = await CRUD.findById(Notification, req.params.id);
		if (notification && notification.user) {
			const user = await CRUD.findByPk(User, notification.user);
			return res.json({ notification, user });
		}
		return res.json(notification);
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
