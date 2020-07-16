import Mail from '../../lib/Mail';
import coloredLog from '../../lib/ColoredLog';

class ForgotMail {
	get key() {
		return 'ForgotMail';
	}

	async handle({ data }) {
		try {
			const { user, randompass } = data;

			await Mail.sendMain({
				to: `${user.name || 'NAME'}  <${user.email || 'EMAIL'}>`,
				subject: 'Recuperação da senha',
				template: 'forgot',
				context: {
					user: user.name || 'CONTEXT NAME',
					randompass: randompass || 'PASS',
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 ForgotMail: ${error}`, 'error'));
		}
	}
}

export default new ForgotMail();
