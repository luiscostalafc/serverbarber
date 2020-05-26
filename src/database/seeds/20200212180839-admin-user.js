const bcrypt = require('bcryptjs');

module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'users',
			[
				{
					name: 'Jack Hair & Barber',
					email: 'jackhair.barber@gmail.com',
					password_hash: bcrypt.hashSync('@jackadmin', 8),
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
