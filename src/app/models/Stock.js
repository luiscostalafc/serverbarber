import Sequelize, { Model } from 'sequelize';

class Stock extends Model {
	static init(sequelize) {
		super.init(
			{
				product_id: Sequelize.INTEGER,
				amount: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		);

		return this;
	}
	static associate(models) {
		this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
	}
}

export default Stock;
