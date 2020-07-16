import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import coloredLog from '../../lib/ColoredLog';
import Mail from '../../lib/Mail';

class CancellationMail {
	get key() {
		return 'CancellationMail';
	}

	async handle({ data }) {
		try {
			const { appointment } = data;

			await Mail.sendMain({
				to: `${appointment.provider.name}  <${appointment.provider.email}>`,
				subject: 'Agendamento cancelado',
				template: 'cancellation',
				context: {
					provider: appointment.provider.name,
					user: appointment.user.name,
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

export default new CancellationMail();
