import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AppointmentMail {
	get key() {
		return 'AppointmentMail';
	}

	async handle({ data }) {
		const { appointment } = data;

		await Mail.sendMain({
			to: `${appointment.provider_id.name}  <${appointment.provider_id.email}>`,
			subject: 'Novo agendamento',
			template: 'appointment',
			context: {
				provider: appointment.provider_id.name,
				user: appointment.user_id.name,
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
	}
}

export default new AppointmentMail();
