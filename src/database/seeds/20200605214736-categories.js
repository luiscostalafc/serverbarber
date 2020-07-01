module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'categories',
			[
				{ name: 'corte de cabelo', gender: 1, price: 38.0 },
				{ name: 'escova', gender: 1, price: 25.0 },
				{ name: 'manicure pé', gender: 1, price: 35.0 },
				{ name: 'manicure mão', gender: 1, price: 35.0 },
				{ name: 'sobrancelhas fio a fio', gender: 1, price: 20.0 },
				{ name: 'cauterização', gender: 1, price: 90.0 },
				{ name: 'botox', gender: 1, price: 120.0 },
				{ name: 'selagem', gender: 1, price: 100.0 },
				{ name: 'progressiva', gender: 1, price: 100.0 },
				{ name: 'mecha e luzes', gender: 1, price: 220.0 },
				{ name: 'coloração', gender: 1, price: 90.0 },
				{ name: 'maquiagem', gender: 1, price: 90.0 },
				{ name: 'limpeza de pele', gender: 1, price: 90.0 },
				{ name: 'cílios fio a fio', gender: 1, price: 90.0 },
				{ name: 'corte de cabelo', gender: 2, price: 30.0 },
				{ name: 'barba', gender: 2, price: 20.0 },
				{ name: 'unhas', gender: 2, price: 18.0 },
				{ name: 'sombrancelhas', gender: 2, price: 20.0 },
				{ name: 'hidratação', gender: 2, price: 30.0 },
				{ name: 'tintura de cabelo', gender: 2, price: 40.0 },
				{ name: 'tratamento para reparação', gender: 2, price: 60.0 },
				{ name: 'barboterapia', gender: 2, price: 60.0 },
				{ name: 'selagem', gender: 2, price: 100.0 },
				{ name: 'botox', gender: 2, price: 120.0 },
				{ name: 'progressiva', gender: 2, price: 100.0 },
				{ name: 'luzes/mechas', gender: 2, price: 150.0 },
				{ name: 'camuflagem de cabelos brancos', gender: 2, price: 70.0 },
			],
			{}
		);
	},

	down: queryInterface => {
		return queryInterface.bulkDelete('categories', null, {});
	},
};
