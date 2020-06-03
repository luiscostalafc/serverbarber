import Sequelize, { Model } from 'sequelize';

class Transaction extends Model {
	static init(sequelize) {
		super.init(
			{
				transaction_id: Sequelize.STRING,
				status: Sequelize.STRING,
				authorization_code: Sequelize.STRING,
				brand: Sequelize.STRING,
				authorized_amount: Sequelize.INTEGER,
				tid: Sequelize.STRING,
				installments: Sequelize.INTEGER,
				checkout_id: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		);

		return this;
	}
	static associate(models) {
		this.belongsTo(models.Checkout, { foreignKey: 'checkout_id', as: 'checkout' });
	}
}

export default Transaction;
