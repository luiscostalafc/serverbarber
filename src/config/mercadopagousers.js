export default {
	user1: {
		id: 593752829,
		nickname: 'TESTGGW6QAOW',
		password: 'qatest9975',
		site_status: 'active',
		email: 'test_user_69687007@testuser.com',
	},
	user2: {
		id: 593751672,
		nickname: 'TEST4RLEN7DC',
		password: 'qatest4078',
		site_status: 'active',
		email: 'test_user_9011535@testuser.com',
	},
	cardTest: {
		mastercard: {
			number: '5031 7557 3453 0604',
			cvv: '123',
			venc: '11/25',
		},
		visa: {
			number: '4170 0688 1010 8020',
			cvv: '123',
			venc: '11/25',
		},
		american_express: {
			number: '3711 8030 3257 522',
			cvv: '1234',
			venc: '11/25',
		},
	},
};
// APRO: Pagamento aprovado.
// CONT: Pagamento pendente.
// OTHE: Recusado por erro geral.
// CALL: Recusado com validação para autorizar.
// FUND: Recusado por quantia insuficiente.
// SECU: Recusado por código de segurança inválido.
// EXPI: Recusado por problema com a data de vencimento.
// FORM: Recusado por erro no formulário
