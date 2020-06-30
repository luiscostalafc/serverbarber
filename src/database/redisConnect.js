import redis from 'redis';
import config from '../config/redis';
import coloredLog from '../lib/ColoredLog';

const redisConnect = () => {
	try {
		// eslint-disable-next-line no-console
		console.log(coloredLog('🤩[BOOT] Redis connected'));
		return redis.createClient(config.port, config.host);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`😢[BOOT] Error in connection with Redis: ${error}`);
		throw error;
	}
};

module.exports = redisConnect;
