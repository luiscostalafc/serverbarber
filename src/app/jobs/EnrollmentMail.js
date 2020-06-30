import Mail from '../../lib/Mail';

class EnrollmentMail {
	get key() {
		return 'EnrollmentMail';
	}

	async handle({ data }) {
		const { id } = data;

		await Mail.sendMail({
			to: `${id.user.name} <${id.user.email}>`,
			subject: 'Bem vindo à Jack Hair & Barber',
			template: 'enrollment',
			context: {
				name: id.name,
			},
		});
	}
}

export default new EnrollmentMail();
