import * as Yup from 'yup';
import {
	// startOfDay,
	// endOfDay,
	setHours,
	setMinutes,
	setSeconds,
	format,
	isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import CRUD from '../repository/crud';

class AvailableController {
	async index(req, res) {
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

		const searchDate = new Date(date);
		const { startDay, endDay } = searchDate.getDate();

		const appointments = await CRUD.findAll(Appointment, {
			where: {
				provider_id,
				canceled_at: null,
				date: {
					[Op.between]: [startDay, endDay],
				},
			},
		});

		const schedule = [
			'08:00',
			'09:00',
			'10:00',
			'11:00',
			'12:00',
			'13:00',
			'14:00',
			'15:00',
			'16:00',
			'17:00',
			'18:00',
			'19:00',
			'20:00',
		];

		const available = schedule.map(time => {
			const [hour, minute] = time.split(':');
			const value = setSeconds(
				setMinutes(setHours(searchDate, hour), minute),
				0
			);

			return {
				time,
				value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
				available:
					isAfter(value, new Date()) &&
					!appointments.find(a => format(a.date, 'HH:mm') === time),
			};
		});

		return res.json(available);
	}
}

export default new AvailableController();
