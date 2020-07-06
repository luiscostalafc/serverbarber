import Sequelize from 'sequelize';
// import postgresConnect from './postgresConnect';
import redisConnect from './redisConnect';
import mongoConnect from './mongoConnect';

import databaseConfig from '../config/database';

import Appointment from '../app/models/Appointment';
import Card from '../app/models/Card';
import Category from '../app/models/Category';
import File from '../app/models/File';
import Phone from '../app/models/Phone';
import Point from '../app/models/Point';
import User from '../app/models/User';

const models = [Appointment, Card, Category, File, Phone, Point, User];

class Database {
	constructor() {
		this.init();
		this.redis();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(databaseConfig);

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
