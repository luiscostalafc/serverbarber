import Sequelize, { Model } from 'sequelize';

class Card extends Model {
	static init(sequelize) {
		super.init(
			{
				card_number: Sequelize.STRING,
				brand: Sequelize.STRING,
				cvv: Sequelize.STRING,
				expiration_month: Sequelize.INTEGER,
				expiration_year: Sequelize.INTEGER,
				card_token: Sequelize.STRING,
				holder_name: Sequelize.STRING,
				holder_cpf: Sequelize.STRING,
				holder_birth_date: Sequelize.DATE,
			},
			{
				sequelize,
			}
		);

		return this;
	}

	static associate(models) {
		this.belongsToMany(models.User, {
			through: 'cards_has_users',
			timestamps: false,
			foreignKey: 'card_id',
			onDelete: 'CASCADE',
		});
	}
}

export default Card;
