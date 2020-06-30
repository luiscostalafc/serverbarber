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
				password_request: Sequelize.BOOLEAN,
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
		this.hasMany(models.Point, { foreignKey: 'user_id', as: 'points' });
		this.hasMany(models.Appointment, {
			foreignKey: 'user_id',
			as: 'appointments',
		});
		this.belongsToMany(models.Category, {
			through: 'categories_has_users',
			as: 'categories',
			timestamps: false,
			foreignKey: 'category_id',
			onDelete: 'CASCADE',
		});
		this.belongsToMany(models.Phone, {
			through: 'users_has_phones',
			as: 'phones',
			timestamps: false,
			foreignKey: 'user_id',
			onDelete: 'CASCADE',
		});
		this.belongsToMany(models.Card, {
			through: 'cards_has_users',
			as: 'cards',
			timestamps: false,
			foreignKey: 'user_id',
			onDelete: 'CASCADE',
		});
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}

export default User;
