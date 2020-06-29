module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'categories',
			[
				{ name: 'corte de cabelo', gender: 1, price: 0.00 },
				{ name: 'escova', gender: 1, price: 25.00 },
				{ name: 'manicure pé', gender: 1, price: 35.00 },
				{ name: 'manicure mão', gender: 1, price: 35.00 },
				{ name: 'sobrancelhas fio a fio', gender: 1, price: 20.00 },
				{ name: 'cauterização', gender: 1, price: 90.00 },
				{ name: 'botox', gender: 1, price: 120.00 },
				{ name: 'selagem', gender: 1, price: 100.00 },
				{ name: 'progressiva', gender: 1, price: 100.00 },
				{ name: 'mecha e luzes', gender: 1, price: 220.00 },
				{ name: 'coloração', gender: 1, price: 90.00 },
				{ name: 'maquiagem', gender: 1, price: 0.00 },
				{ name: 'limpeza de pele', gender: 1, price: 0.00 },
				{ name: 'cílios fio a fio', gender: 1, price: 0.00 },
				{ name: 'corte de cabelo', gender: 2, price: 0.00 },
				{ name: 'barba', gender: 2, price: 0.00 },
				{ name: 'unhas', gender: 2, price: 18.00 },
				{ name: 'sombrancelhas', gender: 2, price: 20.00 },
				{ name: 'hidratação', gender: 2, price: 30.00 },
				{ name: 'tintura de cabelo', gender: 2, price: 40.00 },
				{ name: 'tratamento para reparação', gender: 2, price: 60.00 },
				{ name: 'barboterapia', gender: 2, price: 60.00 },
				{ name: 'selagem', gender: 2, price: 100.00 },
				{ name: 'botox', gender: 2, price: 120.00 },
				{ name: 'progressiva', gender: 2, price: 100.00 },
				{ name: 'luzes/mechas', gender: 2, price: 150.00 },
				{ name: 'camuflagem de cabelos brancos', gender: 2, price: 70.00 },
			],
			{}
		);
	},

	down: queryInterface => {
		return queryInterface.bulkDelete('categories', null, {});
	},
};
