import Sequelize, { Model } from 'sequelize';

class Checkout extends Model {
	static init(sequelize) {
		super.init(
			{
				amount: Sequelize.INTEGER,
				fee: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		);

		return this;
	}
}

export default Checkout;
