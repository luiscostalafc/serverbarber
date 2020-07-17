import Mail from '../../lib/Mail';
import coloredLog from '../../lib/ColoredLog';

class EnrollmentMail {
	get key() {
		return 'EnrollmentMail';
	}

	async handle({ data }) {
		try {
			const { user } = data;

			await Mail.sendMail({
				to: `${user.name} <${user.email}>`,
				subject: 'Bem vindo à Jack Hair & Barber',
				template: 'enrollment',
				context: {
					user,
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 EnrollmentMail: ${error}`, 'error'));
		}
	}
}

export default new EnrollmentMail();
