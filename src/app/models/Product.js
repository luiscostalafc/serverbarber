import Sequelize, { Model } from 'sequelize';

class Product extends Model {
	static init(sequelize) {
		super.init(
			{
				title: Sequelize.STRING,
				price: Sequelize.STRING,
				image: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);

		return this;
	}
}

export default Product;
