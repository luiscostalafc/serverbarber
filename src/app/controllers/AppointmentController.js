import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import CRUD from '../repository/crud';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';
import NotificationController from './NotificationController';

import AppointmentMail from '../jobs/AppointmentMail';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
	async index(req, res) {

		const user = await CRUD.findByPk(User, req.userId);
		if (!user.is_admin) {
			return res
		.status(401)
		.set({ error: 'Not admin' })
		.json({});
		}
		
		const { page = 1 } = req.query;

		const appointments = await CRUD.findAll(Appointment, {
			where: { canceled_at: null },
			order: ['date'],
			attributes: ['id', 'date', 'past', 'cancelable', 'user_id', 'provider_id', 'services'],
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

	async provider(req, res) {
		const { page = 1 } = req.query;

		const appointments = await CRUD.findAll(Appointment, {
			where: { canceled_at: null, provider_id: req.params.id },
			order: ['date'],
			attributes: ['id', 'date', 'past', 'cancelable', 'user_id', 'provider_id', 'services'],
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
		const item = Yup.object().shape({
			id: Yup.number(),
			description: Yup.string(),
			title: Yup.string().default(description => description),
			quantity: Yup.number(),
			currency_id: Yup.string(),
			unit_price: Yup.number(),
		});

		const schema = Yup.object().shape({
			items: Yup.array()
				.of(item)
				.required(),
			provider_id: Yup.number().required(),
			user_id: Yup.number().required(),
			date: Yup.date().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { items, provider_id, user_id, date } = req.body;

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

		const services = items.map(service => service.description).join(', ');

		const appointmentData = {
			user_id,
			provider_id,
			services,
			date: hourStart,
		};

		const appointment = await CRUD.create(Appointment, appointmentData);

		const notification = await NotificationController.create({
			user_id,
			provider_id,
			items,
			date,
		});

		await Queue.add(AppointmentMail.key, {
			appointmentData,
		});

		return res.json({ appointment, notification });
	}
	
	async unavailable(req, res) {
		const schema = Yup.object().shape({
			date: Yup.date().required(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const user = await CRUD.findByPk(User, req.userId);
		if (!user.is_admin) {
			return res
		.status(401)
		.set({ error: 'Not admin' })
		.json({});
		}

		const { date } = req.body;
		const hourStart = startOfHour(parseISO(date));
		
		const checkAvailability = await CRUD.findOne(Appointment, {
			where: {
				date: hourStart,
			},
		});

		if (checkAvailability) {
			return res
				.status(400)
				.json({ error: 'Appointment date is busy' });
		}

		const appointmentData = {
			user_id: null,
			provider_id: null,
			services: 'Data indisponível',
			date: hourStart,
		};

		const appointment = await CRUD.create(Appointment, appointmentData);

		const notification = await CRUD.create(
			Notification,
			{
				content: 'Data indisponível',
				user: '',
				provider: '',
				items: [],
			},
			true
		);

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

		const user = CRUD.findByPk(Appointment, appointment.user_id);

		if (!user.is_admin && appointment.user_id !== req.userId) {
			return res.status(401).json({
				error: "You don't have permission to cancel this appointment",
			});
		}

		const dateWithSub = subHours(appointment.date, 2);

		if (!user.is_admin && isBefore(dateWithSub, new Date())) {
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
