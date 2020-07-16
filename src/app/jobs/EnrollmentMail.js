import Mail from '../../lib/Mail';
import coloredLog from '../../lib/ColoredLog';

class EnrollmentMail {
	get key() {
		return 'EnrollmentMail';
	}

	async handle({ data }) {
		try {
			const { name, email } = data;

			await Mail.sendMail({
				to: `${name} <${email}>`,
				subject: 'Bem vindo à Jack Hair & Barber',
				template: 'enrollment',
				context: {
					name,
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 EnrollmentMail: ${error}`, 'error'));
		}
	}
}

export default new EnrollmentMail();
