import Bee from 'bee-queue';
import coloredLog from './ColoredLog';
import AppointmentMail from '../app/jobs/AppointmentMail';
import CancellationMail from '../app/jobs/CancellationMail';
import EnrollmentMail from '../app/jobs/EnrollmentMail';
import ForgotMail from '../app/jobs/ForgotMail';
import redisConfig from '../config/redis';

const jobs = [AppointmentMail, CancellationMail, EnrollmentMail, ForgotMail];

class Queue {
	constructor() {
		this.queues = {};

		this.init();
	}

	init() {
		if (jobs) {
			jobs.forEach(({ key, handle }) => {
				if (!key) {
					// eslint-disable-next-line no-console
					console.log('📨 Init queue: Not has key');
				}
				// eslint-disable-next-line no-console
				console.log('📨 Init queue', key);
				this.queues[key] = {
					bee: new Bee(key, {
						redis: redisConfig,
					}),
					handle,
				};
			});
		}
		// eslint-disable-next-line no-console
		console.log('📨 Init queue: Not has jobs');
	}

	add(queue, job) {
		try {
			return this.queues[queue].bee.createJob(job).save();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(coloredLog(`🚨 Add queue error: ${error}`, 'error'));
			throw new Error(error);
		}
	}

	processQueue() {
		jobs.forEach(job => {
			const { bee, handle } = this.queues[job.key];
			// eslint-disable-next-line no-console
			console.log('🚀 Process queue', job.key);
			bee.on('failed', this.handleFailure).process(handle);
		});
	}

	handleFailure(job, err) {
		// eslint-disable-next-line no-console
		console.log(`Queue ${job.queue.name}: FAILED `, err);
	}
}

export default new Queue();
