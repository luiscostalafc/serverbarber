import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import CRUD from '../repository/crud';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import NotificationController from './NotificationController';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
	async index(req, res) {
		const { page = 1 } = req.query;

		const appointments = await CRUD.findAll(Appointment, {
			where: { canceled_at: null },
			order: ['date'],
			attributes: ['id', 'date', 'past', 'cancelable'],
			limit: 20,
			offset: (page - 1) * 20,
			include: [
				{
					model: User,
					as: 'provider',
					attributes: ['id', 'name'],
					include: [
						{
							model: File,
							as: 'avatar',
							attributes: ['id', 'path', 'url'],
						},
					],
				},
			],
		});

		return res.json(appointments);
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

		const isProvider = await CRUD.findOne(User, {
			where: { id: provider_id, provider: true },
		});

		if (!isProvider) {
			return res
				.status(401)
				.json({ error: 'You can only create appointments with providers' });
		}

		if (req.userId === provider_id) {
			return res
				.status(401)
				.json({ error: `You can't create appointments with yourself` });
		}

		const hourStart = startOfHour(parseISO(date));

		if (isBefore(hourStart, new Date())) {
			res.status(400).json({ error: 'Past dates are not permitted' });
		}

		const checkAvailability = await CRUD.findOne(Appointment, {
			where: {
				provider_id,
				canceled_at: null,
				date: hourStart,
			},
		});

		if (checkAvailability) {
			return res
				.status(400)
				.json({ error: 'Appointment date is not available' });
		}

		const appointmentData = {
			user_id: req.userId,
			provider_id,
			date: hourStart,
		};

		const appointment = await CRUD.create(Appointment, appointmentData);

		const notification = await NotificationController.create({
			provider_id,
			date,
		});

		return res.json({ appointment, notification });
	}

	async show(req, res) {
		const reg = await CRUD.findByPk(Appointment, req.params.id, {
			include: [
				{
					model: User,
					as: 'provider',
					attributes: ['name', 'email'],
				},
				{
					model: User,
					as: 'user',
					attributes: ['name'],
				},
			],
		});

		return res.json(reg);
	}

	async update(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}

	async delete(req, res) {
		const appointment = await CRUD.findByPk(Appointment, req.params.id, {
			include: [
				{
					model: User,
					as: 'provider',
					attributes: ['name', 'email'],
				},
				{
					model: User,
					as: 'user',
					attributes: ['name'],
				},
			],
		});

		if (appointment.user_id !== req.userId) {
			return res.status(401).json({
				error: "You don't have permission to cancel this appointment",
			});
		}

		const dateWithSub = subHours(appointment.date, 2);

		if (isBefore(dateWithSub, new Date())) {
			res.status(401).json({
				error: "You can't only cancel appointments 2 hours in advance",
			});
		}

		appointment.canceled_at = new Date();

		await appointment.save();

		await Queue.add(CancellationMail.key, {
			appointment,
		});

		return res.json(appointment);
	}
}

export default new AppointmentController();
