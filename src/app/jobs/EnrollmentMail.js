import Mail from '../../lib/Mail';
import coloredLog from '../../lib/ColoredLog';

class EnrollmentMail {
	get key() {
		return 'EnrollmentMail';
	}

	async handle({ data }) {
		try {
			const { createUser } = data;

			await Mail.sendMain({
				to: `${createUser.name} <${createUser.email}>`,
				subject: 'Bem vindo à Jack Hair & Barber',
				template: 'enrollment',
				context: {
					user: createUser.name,
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 EnrollmentMail: ${error}`, 'error'));
		}
	}
}

export default new EnrollmentMail();
