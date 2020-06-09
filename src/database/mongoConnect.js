import mongoose from 'mongoose';
import coloredLog from '../lib/ColoredLog';

const mongoConnect = async () => {
	try {
		console.log(coloredLog('[BOOT] Mongodb connected'));
		return await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		});
		// await listDatabases(client);
	} catch (error) {
		console.error(`[BOOT] Error in connection with Mongodb: ${error}`);
	}
};

module.exports = mongoConnect;
