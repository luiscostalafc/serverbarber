import Sequelize, { Model } from 'sequelize';

class CategoryUser extends Model {
	static init(sequelize) {
		super.init(
			{
				category_id: {
					type: Sequelize.INTEGER,
					model: 'category',
					key: 'id',
				},
				user_id: {
					type: Sequelize.INTEGER,
					model: 'user',
					key: 'id',
				},
			},
			{
				sequelize,
				timestamps: false,
			}
		);

		return this;
	}
}

export default CategoryUser;
