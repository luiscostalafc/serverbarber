module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('checkout_product', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			checkout_id: {
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
			amout: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			total: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('checkout_product');
	},
};
