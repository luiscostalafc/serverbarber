/* eslint-disable no-console */
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import coloredLog from '../../lib/ColoredLog';
import Mail from '../../lib/Mail';

class AppointmentMail {
	get key() {
		return 'AppointmentMail';
	}

	async handle({ data }) {
		const {
			to,
			email,
			providerName,
			client,
			date,
			services,
			total,
			address,
			phones,
			ddd,
		} = data;

		if (!to)
			console.error(
				coloredLog(`📨 AppointmentMail handle error : TO not defined`, 'error')
			);
		if (!email)
			console.error(
				coloredLog(`📨 AppointmentMail handle error: EMAIL not defined`)
			);
		if (!providerName)
			console.error(
				coloredLog(`📨 AppointmentMail handle error: PROVIDER NAME not defined`)
			);
		if (!client)
			console.error(
				coloredLog(
					`📨 AppointmentMail handle error: CLIENT/USER NAME not defined`
				)
			);
		if (!services)
			console.error(
				coloredLog(`📨 AppointmentMail handle error: SERVICES not defined`)
			);

		const appointmentDate = date
			? format(parseISO(date), "'dia' dd 'de' MMMM', às' H:mm'h'", {
					locale: pt,
			  })
			: 'DATE';
		if (appointmentDate === 'DATE')
			console.error(
				coloredLog(`📨 AppointmentMail handle error: DATE not defined`)
			);

		try {
			await Mail.sendMain({
				to: `${to}  <${email}>`,
				cc: 'jackhair.barber@gmail.com',
				subject: 'Novo agendamento',
				template: 'appointment',
				context: {
					providerName,
					client,
					services,
					appointmentDate,
					total,
					address,
					ddd,
					phones,
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 AppointmentMail: ${error}`, 'error'));
		}
	}
}

export default new AppointmentMail();
