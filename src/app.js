import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import http from 'http';
import socketActions from './socket.io';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
	constructor() {
		this.app = express();
		this.server = http.Server(this.app);

		if (process.env.NODE_ENV !== 'dev') Sentry.init(sentryConfig);

		this.middlewares();
		this.socket();
		this.routes();
		this.exceptionHandler();
	}

	socket() {
		const io = socketActions(this.server);
		this.app.set('io', io);
	}

	middlewares() {
		this.app.use(Sentry.Handlers.requestHandler());
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(
			'/files',
			express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
		);

		this.app.use((req, res, next) => {
			req.io = this.io;
			req.connectedUsers = this.connectedUsers;

			next();
		});
	}

	routes() {
		this.app.use(routes);
		this.app.use(Sentry.Handlers.errorHandler());
	}

	exceptionHandler() {
		this.app.use(async (err, req, res, next) => {
			if (process.env.NODE_ENV === 'development') {
				const errors = await new Youch(err, req).toJSON();

				return res.status(500).json(errors);
			}

			return res.status(500).json({ error: 'Internal server error' });
		});
	}
}

export default new App().server;
