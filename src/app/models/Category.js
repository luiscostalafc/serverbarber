import Sequelize, { Model } from 'sequelize';

class Category extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				price: Sequelize.FLOAT,
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
		this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
		this.belongsToMany(models.User, {
			through: 'categories_has_users',
			as: 'providers',
			timestamps: false,
			foreignKey: 'category_id',
			onDelete: 'CASCADE',
		});
	}
}

export default Category;
