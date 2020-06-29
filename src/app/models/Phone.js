import Sequelize, { Model } from 'sequelize';

class Phone extends Model {
	static init(sequelize) {
		super.init(
			{
				area_code: Sequelize.STRING,
				number: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);

		return this;
	}

	static associate(models) {
		this.belongsToMany(models.User, {
			through: 'users_has_phones',
			timestamps: false,
			foreignKey: 'phone_id',
			onDelete: 'CASCADE',
		});
	}
}

export default Phone;
