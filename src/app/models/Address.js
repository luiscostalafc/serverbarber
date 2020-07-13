import Sequelize, { Model } from 'sequelize';

class Address extends Model {
	static init(sequelize) {
		super.init(
			{
				cep: Sequelize.STRING,
				zone: Sequelize.STRING,
				state: Sequelize.STRING,
				city: Sequelize.STRING,
				district: Sequelize.STRING,
				street: Sequelize.STRING,
				number: Sequelize.STRING,
				complement: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);

		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
	}
}

export default Address;
