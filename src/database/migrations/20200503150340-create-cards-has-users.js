module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('cards_has_users', {
			card_id: {
				type: Sequelize.INTEGER,
				references: { model: 'cards', key: 'id' },
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
		return queryInterface.dropTable('cards_has_users');
	},
};
