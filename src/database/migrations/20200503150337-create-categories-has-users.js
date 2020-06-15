module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('categories_has_users', {
			category_id: {
				type: Sequelize.INTEGER,
				references: { model: 'categories', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('categories_has_users');
	},
};
