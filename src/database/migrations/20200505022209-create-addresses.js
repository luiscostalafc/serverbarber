module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('addresses', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
				allowNull: true,
			},
			cep: {
				type: Sequelize.STRING,
				allowNull: true,
				// defaultValue: ''
			},
			zone: {
				type: Sequelize.STRING,
				allowNull: true,
				// defaultValue: ''
			},
			state: {
				type: Sequelize.STRING,
				allowNull: true,
				// defaultValue: ''
			},
			city: {
				type: Sequelize.STRING,
				allowNull: true,
				// defaultValue: ''
			},
			district: {
				type: Sequelize.STRING,
				allowNull: true,
				// defaultValue: ''
			},
			street: {
				type: Sequelize.STRING,
				allowNull: true,
				// defaultValue: ''
			},
			number: {
				type: Sequelize.STRING,
				allowNull: true,
				// defaultValue: ''
			},
			complement: {
				type: Sequelize.STRING,
				allowNull: true,
				// defaultValue: ''
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
		return queryInterface.dropTable('addresses');
	},
};
