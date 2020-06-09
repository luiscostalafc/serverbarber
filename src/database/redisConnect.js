import redis from 'redis';
import config from '../config/redis';
import coloredLog from '../lib/ColoredLog';

const redisConnect = () => {
	try {
		console.log(coloredLog('[BOOT] Redis connected'));
		return redis.createClient(config.port, config.host);
	} catch (error) {
		console.error(`[BOOT] Error in connection with Redis: ${err}`);
	}
};

module.exports = redisConnect;
