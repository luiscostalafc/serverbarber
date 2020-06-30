import Mail from '../../lib/Mail';

class ForgotMail {
	get key() {
		return 'ForgotMail';
	}

	async handle({ data }) {
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
	}
}

export default new ForgotMail();
