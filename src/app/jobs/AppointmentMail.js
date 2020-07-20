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
		const { to, email, providerName, date, user, items } = data;

		if (!to)
			console.error(
				coloredLog(`📨 AppointmentMail handle error : TO not defined`, 'error')
			);
		if (!email)
			console.error(
				coloredLog(`📨 AppointmentMail handle error: EMAIL not defined`)
			);
		if (!user)
			console.error(
				coloredLog(`📨 AppointmentMail handle error: Address not defined`)
			);
		if (!items)
			console.error(
				coloredLog(`📨 AppointmentMail handle error: Phone not defined`)
			);
		if (!providerName)
			console.error(
				coloredLog(`📨 AppointmentMail handle error: PROVIDER NAME not defined`)
			);
		// if (!client)
		// 	console.error(
		// 		coloredLog(
		// 			`📨 AppointmentMail handle error: CLIENT/USER NAME not defined`
		// 		)
		// 	);
		// if (!services)
		// 	console.error(
		// 		coloredLog(`📨 AppointmentMail handle error: SERVICES not defined`)
		// 	);
		// if (!totalQuantities)
		// 	console.error(
		// 		coloredLog(
		// 			`📨 AppointmentMail handle error: totalQuantities not defined`
		// 		)
		// 	);
		// if (!totalPrices)
		// 	console.error(
		// 		coloredLog(`📨 AppointmentMail handle error: totalPrices not defined`)
		// 	);

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
				subject: 'Novo agendamento',
				template: 'appointment',
				context: {
					providerName,
					client: user.name,
					phone: user.phones,
					address: user.address,
					services: items.description,
					totalPrices: items.unit_price,
					totalQuantities: items.quantity,
					appointmentDate,
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 AppointmentMail: ${error}`, 'error'));
		}
	}
}

export default new AppointmentMail();
