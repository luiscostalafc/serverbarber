import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import coloredLog from '../../lib/ColoredLog';
import Mail from '../../lib/Mail';

class AppointmentMail {
	get key() {
		return 'AppointmentMail';
	}

	async handle({ data }) {
		try {
			const { user, appointment } = data;

			await Mail.sendMain({
				to: `${user.provider.name}  <${user.provider.email}>`,
				subject: 'Novo agendamento',
				template: 'appointment',
				context: {
					provider: user.provider.name,
					user: user.name,
					services: appointment.services,
					date: format(
						parseISO(appointment.date),
						"'dia' dd 'de' MMMM', às' H:mm'h'",
						{
							locale: pt,
						}
					),
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 AppointmentMail: ${error}`, 'error'));
		}
	}
}

export default new AppointmentMail();
