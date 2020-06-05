import Sequelize from 'sequelize';
import mongoose from 'mongoose';

//User
import User from '../app/models/User';
import Category from '../app/models/Category';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

//Map
import Point from '../app/models/Point';


import databaseConfig from '../config/database';

const models =
	[User,
		File,
		Appointment,
		Category,
		Point
		];

class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models));
	}

	mongo() {
		this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		});
	}
}

export default new Database();
