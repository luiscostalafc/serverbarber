import Mail from '../../lib/Mail';

class EnrollmentMail {
	get key() {
		return 'EnrollmentMail';
	}

	async handle({ data }) {
		const { name, email } = data;

		await Mail.sendMail({
			to: `${name} <${email}>`,
			subject: 'Bem vindo à Jack Hair & Barber',
			template: 'enrollment',
			context: {
				name,
			},
		});
	}
}

export default new EnrollmentMail();
