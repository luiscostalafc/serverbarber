module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('files', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			path: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: true,
				defaultValue: Sequelize.literal("NOW()")
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: true,
				defaultValue: Sequelize.literal("NOW()")
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('files');
	},
};
