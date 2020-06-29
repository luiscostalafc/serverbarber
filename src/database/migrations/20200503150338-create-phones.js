module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('phones', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			area_code: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: new Date(),
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('phones');
	},
};
