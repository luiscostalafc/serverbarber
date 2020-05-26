module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('transactions', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			transactions_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			status: {
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
			authorization_code: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			brand: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			authorized_amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			tid: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			installments: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			checkout_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('transactions');
	},
};
