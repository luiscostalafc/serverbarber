module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'categories',
			[
				{ name: 'corte de cabelo', gender: 1 },
				{ name: 'escova', gender: 1 },
				{ name: 'manicure pé', gender: 1 },
				{ name: 'manicure mão', gender: 1 },
				{ name: 'sobrancelhas fio a fio', gender: 1 },
				{ name: 'cauterização', gender: 1 },
				{ name: 'botox', gender: 1 },
				{ name: 'selagem', gender: 1 },
				{ name: 'progressiva', gender: 1 },
				{ name: 'mecha e luzes', gender: 1 },
				{ name: 'coloração', gender: 1 },
				{ name: 'maquiagem', gender: 1 },
				{ name: 'limpeza de pele', gender: 1 },
				{ name: 'cílios fio a fio', gender: 1 },
				{ name: 'corte de cabelo', gender: 2 },
				{ name: 'barba', gender: 2 },
				{ name: 'unhas', gender: 2 },
				{ name: 'sombrancelhas', gender: 2 },
				{ name: 'hidratação', gender: 2 },
				{ name: 'tintura de cabelo', gender: 2 },
				{ name: 'tratamento para reparação', gender: 2 },
				{ name: 'barboterapia', gender: 2 },
				{ name: 'barboterapia', gender: 2 },
				{ name: 'selagem', gender: 2 },
				{ name: 'botox', gender: 2 },
				{ name: 'progressiva', gender: 2 },
				{ name: 'luzes/mechas', gender: 2 },
				{ name: 'camuflagem de cabelos brancos', gender: 2 },
			],
			{}
		);
	},

	down: queryInterface => {
		return queryInterface.bulkDelete('categories', null, {});
	},
};
