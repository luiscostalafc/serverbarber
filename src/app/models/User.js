import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.VIRTUAL,
				password_hash: Sequelize.STRING,
				provider: Sequelize.BOOLEAN,
			},
			{
				sequelize,
			}
		);

		this.addHook('beforeSave', async user => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 8);
			}
		});

		return this;
	}

	static associate(models) {
		this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
		this.belongsToMany(models.Category, {
			through: 'categories_has_users',
			timestamps: false,
			foreignKey: 'category_id',
			as: 'category',
			onDelete: 'CASCADE',
		});
		this.belongsToMany(models.Phone, {
			through: 'users_has_phones',
			timestamps: false,
			foreignKey: 'phone_id',
			onDelete: 'CASCADE',
		});
		this.belongsToMany(models.Card, {
			through: 'cards_has_users',
			timestamps: false,
			foreignKey: 'card_id',
			onDelete: 'CASCADE',
		});
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}

export default User;
