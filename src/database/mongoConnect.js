import mongoose from 'mongoose';
import coloredLog from '../lib/ColoredLog';

const mongoConnect = async () => {
	try {
		// eslint-disable-next-line no-console
		console.log(coloredLog('🐵 [BOOT] Mongodb connected'));
		return await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		});
		// await listDatabases(client);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`🙈 [BOOT] Error in connection with Mongodb: ${error}`);
		throw error;
	}
};

module.exports = mongoConnect;
