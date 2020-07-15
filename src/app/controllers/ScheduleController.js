import moment from 'moment';
import * as Yup from 'yup';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';
import Phone from '../models/Phone';
import CRUD from '../repository/crud';

class ScheduleController {
	async index(req, res) {
		const { date } = req.query;
		if (!date)
			return res.status(400).json({ error: 'Invalid or not has date' });

		const providerId = req.query.provider_id
			? req.query.provider_id
			: req.userId;
		const checkUserProvider = CRUD.findOne(User, {
			where: { id: providerId, provider: true },
		});

		if (!checkUserProvider) {
			return res.status(401).json({ error: 'User is not a provider' });
		}

		const formatDate = moment(date).format();
		const parseDate = parseISO(formatDate);

		const Appointments = await CRUD.findAll(Appointment, {
			where: {
				provider_id: req.userId,
				canceled_at: null,
				date: {
					[Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
				},
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['name', 'gender', 'provider', 'is_admin'],
					include: [
						{
							model: Phone,
							as: 'phones',
							attributes: ['area_code', 'number'],
						},
					],
				},
			],
			order: ['date'],
		});

		return res.json(Appointments);
	}

	async schedule(req, res) {
		const schema = Yup.object().shape({
			date: Yup.string().required(),
			provider_id: Yup.string(),
		});

		schema.validate(req.body, { abortEarly: false }).catch(err => {
			return res
				.status(422)
				.set({ error: err.errors.join(', ') })
				.json({});
		});

		const { date } = req.body;
		const providerId = req.body.provider_id ? req.body.provider_id : req.userId;

		const checkUserProvider = CRUD.findOne(User, {
			where: { id: providerId, provider: true },
		});

		if (!checkUserProvider) {
			return res.status(401).json({ error: 'User is not a provider' });
		}

		const formatDate = moment(date).format();
		const parseDate = parseISO(formatDate);

		const Appointments = await CRUD.findAll(Appointment, {
			where: {
				provider_id: req.userId,
				canceled_at: null,
				date: {
					[Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
				},
			},
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['name', 'gender', 'provider', 'is_admin'],
					include: [
						{
							model: Phone,
							as: 'phones',
							attributes: ['area_code', 'number'],
						},
					],
				},
			],
			order: ['date'],
		});

		return res.json(Appointments);
	}
}

export default new ScheduleController();
