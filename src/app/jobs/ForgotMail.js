import Mail from '../../lib/Mail';
import coloredLog from '../../lib/ColoredLog';

class ForgotMail {
	get key() {
		return 'ForgotMail';
	}

	async handle({ data }) {
		try {
			const { forgot } = data;

			await Mail.sendMain({
				to: `${forgot.user.name}  <${forgot.user.email}>`,
				subject: 'Recuperação da senha',
				template: 'forgot',
				context: {
					user: forgot.user.name,
					randompass: forgot.randompass,
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 AppointmentMail: ${error}`, 'error'));
		}
	}
}

export default new ForgotMail();
