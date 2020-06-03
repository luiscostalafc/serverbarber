import Sequelize, { Model } from 'sequelize';

class CheckoutProduct extends Model {
	static init(sequelize) {
		super.init(
			{
				product_id: Sequelize.INTEGER,
				checkout_id: Sequelize.INTEGER,
				amount: Sequelize.INTEGER,
				total: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		);

		return this;
	}
	static associate(models) {
		this.belongsTo(models.Checkout, { foreignKey: 'checkout_id', as: 'checkout' });
		this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
	}
}

export default CheckoutProduct;
