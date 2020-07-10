module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('users', 'gender', {
			type: Sequelize.INTEGER,
			allowNull: true,
			defaultValue: 1
		});
	},

	down: queryInterface => {
		return queryInterface.removeColumn('users', 'gender');
	},
};
