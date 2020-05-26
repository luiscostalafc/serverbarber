import Sequelize, { Model } from 'sequelize';

class Credicard extends Model {
	static init(sequelize) {
		super.init(
			{
				card_id: Sequelize.INTEGER,
				number: Sequelize.STRING,
				holder_name: Sequelize.STRING,
				expiration_date: Sequelize.STRING,
				brand: Sequelize.STRING,
			},
			{
				sequelize,
			}
		);

		return this;
	}
}

export default Credicard;
