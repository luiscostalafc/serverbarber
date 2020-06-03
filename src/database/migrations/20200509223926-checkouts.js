module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('checkouts', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			fee: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('checkouts');
	},
};
