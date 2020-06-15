import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';
import CRUD from '../repository/crud';

class ScheduleController {
	async index(req, res) {
		const checkUserProvider = CRUD.findOne(User, {
			where: { id: req.userId, provider: true },
		});

		if (!checkUserProvider) {
			return res.status(401).json({ error: 'User is not a provider' });
		}

		const { date } = req.query;
		const parseDate = parseISO(date);

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
					attributes: ['name', 'phone'],
				},
			],
			order: ['date'],
		});

		return res.json(Appointments);
	}
}

export default new ScheduleController();
