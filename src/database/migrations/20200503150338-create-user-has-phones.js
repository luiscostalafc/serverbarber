module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users_has_phones', {
			user_id: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
			phone_id: {
				type: Sequelize.INTEGER,
				references: { model: 'phones', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('users_has_phones');
	},
};
