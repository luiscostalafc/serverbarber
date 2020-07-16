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
			to: `${appointment.user.provider.name}  <${appointment.user.provider.email}>`,
			subject: 'Novo agendamento',
			template: 'appointment',
			context: {
				provider: appointment.user.provider.name,
				user: appointment.user.name,
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
