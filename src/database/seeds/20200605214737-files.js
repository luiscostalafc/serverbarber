module.exports = {
	up: QueryInterface => {
		return QueryInterface.bulkInsert(
			'files',
			[
				{ name: 'chapinha', path: 'chapinha.png' },
				{ name: 'cílios', path: 'cílios.jpeg' },
				{ name: 'homem_barba', path: 'homem_barba.png' },
				{ name: 'homem_corte', path: 'homem_corte.png' },
				{ name: 'homem_estilo', path: 'homem_estilo.png' },
				{ name: 'maquiagem', path: 'maquiagem.png' },
				{ name: 'mulher_cabelo', path: 'mulher_cabelo.png' },
				{ name: 'mulher_escova', path: 'mulher_escova.png' },
				{ name: 'mulher_esmalte', path: 'mulher_esmalte.png' },
				{ name: 'mulher_tesoura_cabelo', path: 'mulher_tesoura_cabelo.jpeg' },
				{ name: 'mulher_unha', path: 'mulher_unha.png' },
				{ name: 'pele', path: 'pele.png' },
				{
					name: 'pente_tesoura_masculino',
					path: 'pente_tesoura_masculino.png',
				},
			],
			{}
		);
	},

	down: queryInterface => {
		return queryInterface.bulkDelete('categories', null, {});
	},
};
