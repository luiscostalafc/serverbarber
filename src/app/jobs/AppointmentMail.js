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
		const { appointment } = data;
		const to =
			appointment && appointment.user && appointment.user.name
				? appointment.user.name
				: 'TO';
		console.error(coloredLog(`📨 AppointmentMail handle to: ${to}`));
		const email =
			appointment && appointment.user && appointment.user.email
				? appointment.user.email
				: 'Mail';
		console.error(coloredLog(`📨 AppointmentMail handle email: ${email}`));
		const provider =
			appointment && appointment.provider && appointment.provider.name
				? appointment.provider.name
				: 'PROVIDER';
		console.error(
			coloredLog(`📨 AppointmentMail handle provider: ${provider}`)
		);
		const user =
			appointment && appointment.user && appointment.user.name
				? appointment.user.name
				: 'user';
		console.error(coloredLog(`📨 AppointmentMail handle user: ${user}`));
		const services =
			appointment && appointment.items ? appointment.items : 'services';
		console.error(
			coloredLog(`📨 AppointmentMail handle services: ${services}`)
		);
		const date =
			appointment && appointment.date
				? format(
						parseISO(appointment.date),
						"'dia' dd 'de' MMMM', às' H:mm'h'",
						{
							locale: pt,
						}
				  )
				: 'DATE';
		console.error(coloredLog(`📨 AppointmentMail handle date: ${date}`));

		try {
			await Mail.sendMain({
				to: `${to}  <${email}>`,
				subject: 'Novo agendamento',
				template: 'appointment',
				context: {
					provider,
					user,
					services,
					date,
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 AppointmentMail: ${error}`, 'error'));
		}
	}
}

export default new AppointmentMail();
