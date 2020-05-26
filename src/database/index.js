import Sequelize from 'sequelize';
import mongoose from 'mongoose';

//User
import User from '../app/models/User';
import Category from '../app/models/Category';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

//Map
import Point from '../app/models/Point';

//Prestador
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';

//Pagamento
import Checkout from '../app/models/Checkout';
import CreditCard from '../app/models/CreditCard';
import Product from '../app/models/Product';
import CheckoutProduct from '../app/models/CheckoutProduct';
import Stock from '../app/models/Stock';
import Transaction from '../app/models/Transaction';


import databaseConfig from '../config/database';

const models =
	[User,
		File,
		Appointment,
		Category,
		Point,
		Recipient,
		Delivery,
		Deliveryman,
		Checkout,
		CreditCard,
		Product,
		CheckoutProduct,
		Stock,
		Transaction];

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
