module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('cards', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			card_number: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			brand: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cvv: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			expiration_month: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			expiration_year: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			card_token: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			holder_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			holder_cpf: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			holder_birth_date: {
				type: Sequelize.DATE,
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
		return queryInterface.dropTable('cards');
	},
};
