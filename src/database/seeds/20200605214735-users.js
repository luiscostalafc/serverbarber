const bcrypt = require('bcryptjs');

module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'users',
			[
				{
					name: 'Usuário teste',
					email: 'luiscostalafc@outlook.com',
					password_hash: bcrypt.hashSync('123456', 8),
					provider: false,
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{}
		);
	},

	down: queryInterface => {
		return queryInterface.bulkDelete('users', null, {});
	},
};
