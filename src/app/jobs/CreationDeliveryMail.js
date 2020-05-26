import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CreationDeliveryMail {
	get key() {
		return 'CreationDeliveryMail';
	}

	async handle({ data }) {
		const { appointment, user} = data;

		await Mail.sendMain({
			to: `${appointment.provider.name} <${appointment.provider.email}>`,
			subject: 'Novo atendimento cadastrado',
			template: 'creationDelivery',
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
				phone: user.phone,
				street: user.street,
				number: user.number,
				district: user.district,
				city: user.city,
				state: user.state,
				zipcode: user.zipcode,

			},
		});
	}
}

export default new CreationDeliveryMail();
