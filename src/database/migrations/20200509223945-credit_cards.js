module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('credit_cards', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			card_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			holder_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			expiration_date: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			brand: {
				type: Sequelize.STRING,
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
		return queryInterface.dropTable('credit_cards');
	},
};
