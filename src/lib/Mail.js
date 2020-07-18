/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';
import coloredLog from './ColoredLog';

import mailConfig from '../config/mail';

class Mail {
	constructor() {
		const { host, port, secure, auth } = mailConfig;
		if (!host) {
			console.error(
				coloredLog(
					`🚨 Mail constructor error: Not has host or is false`,
					'error'
				)
			);
		}
		if (!port) {
			console.error(
				coloredLog(
					`🚨 Mail constructor error: Not has port or is false`,
					'error'
				)
			);
		}
		if (!secure) {
			console.error(
				coloredLog(
					`🚨 Mail constructor error: Not has secure or is false`,
					'error'
				)
			);
		}
		if (!auth) {
			console.error(
				coloredLog(
					`🚨 Mail constructor error: Not has auth or is false`,
					'error'
				)
			);
		}

		this.transporter = nodemailer.createTransport({
			host,
			port,
			secure,
			auth: auth.user ? auth : null,
		});

		this.configureTemplates();
	}

	configureTemplates() {
		const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
		if (!viewPath) {
			console.error(
				coloredLog(
					`🚨 Mail configureTemplates error: Not has viewPath`,
					'error'
				)
			);
		}

		try {
			this.transporter.use(
				'compile',
				nodemailerhbs({
					viewEngine: exphbs.create({
						layoutsDir: resolve(viewPath, 'layouts'),
						partialsDir: resolve(viewPath, 'partials'),
						defaultLayout: 'default',
						extname: '.hbs',
					}),
					viewPath,
					extName: '.hbs',
				})
			);
		} catch (error) {
			console.error(
				coloredLog(
					`🚨 Mail configureTemplates transporter error: ${error}`,
					'error'
				)
			);
		}
	}

	sendMain(message) {
		if (message) {
			return this.transporter.sendMail({
				...mailConfig.default,
				...message,
			});
		}
		console.error(
			coloredLog(`🚨 Mail sendMain error:Not has message`, 'error')
		);
		return false;
	}
}

export default new Mail();
