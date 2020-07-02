import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import coloredLog from '../lib/ColoredLog';

const postgresConnect = () => {
	const connection = new Sequelize(
		databaseConfig.database,
		databaseConfig.username,
		databaseConfig.password,
		{
			host: databaseConfig.host,
			dialect: databaseConfig.dialect,
			define: databaseConfig.define,
		}
	);

	try {
		connection.authenticate();
		// eslint-disable-next-line no-console
		console.log(coloredLog('🤘 [BOOT] Postgres connected'));
		return connection;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`👎 [BOOT] Error in connection with Postgres: ${error}`);
		throw error;
	}
};

module.exports = postgresConnect;
