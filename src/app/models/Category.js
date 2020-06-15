import Sequelize, { Model } from 'sequelize';

class Category extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				gender: {
					type: Sequelize.INTEGER,
					defaultValue: 1,
				},
			},
			{
				sequelize,
			}
		);

		return this;
	}

	static associate(models) {
		this.belongsToMany(models.User, {
			through: 'categories_has_users',
			timestamps: false,
			foreignKey: 'user_id',
			onDelete: 'CASCADE',
		});
	}
}

export default Category;
