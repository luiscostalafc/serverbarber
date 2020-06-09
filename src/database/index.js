import postgresConnect from './postgresConnect';
import redisConnect from './redisConnect';
import mongoConnect from './mongoConnect';

// User
import User from '../app/models/User';
import Category from '../app/models/Category';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

// Map
import Point from '../app/models/Point';

const models = [User, File, Appointment, Category, Point];

class Database {
	constructor() {
		this.init();
		this.redis();
		this.mongo();
	}

	init() {
		this.connection = postgresConnect();

		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models));
	}

	redis() {
		this.redisConnection = redisConnect();
	}

	mongo() {
		this.mongoConnection = mongoConnect();
	}
}

export default new Database();
