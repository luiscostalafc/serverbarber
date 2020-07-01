import Bee from 'bee-queue';
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
		jobs.forEach(({ key, handle }) => {
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

	add(queue, job) {
		return this.queues[queue].bee.createJob(job).save();
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
