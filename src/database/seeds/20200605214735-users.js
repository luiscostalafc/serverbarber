const bcrypt = require('bcryptjs');

module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'users',
			[
				{
					name: 'Luis Costa',
					phone: '(41) 99999-9999',
					email: 'luiscostalafc@gmail.com',
					password_hash: bcrypt.hashSync('123456', 8),
					provider: false,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'Provider 1',
					phone: '(41) 98999-9999',
					email: 'provider1@gmail.com',
					password_hash: bcrypt.hashSync('secret', 8),
					provider: true,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'Provider 2',
					phone: '(41) 97999-9999',
					email: 'provider2@gmail.com',
					password_hash: bcrypt.hashSync('secret', 8),
					provider: true,
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'Provider 3',
					phone: '(41) 96999-9999',
					email: 'provider3@gmail.com',
					password_hash: bcrypt.hashSync('secret', 8),
					provider: true,
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
