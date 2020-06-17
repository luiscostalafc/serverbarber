class PagSeguroController {
	async createSession(req, res) {}
	async getPaymentMethods(req, res) {}
	async getCardFlag(req, res) {}
	async getCardToken(req, res) {}
	async getInstallments(req, res) {}
	async payment(req, res) {}
	async getByReferenceCode(req, res) {}
	async getByDateInterval(req, res) {}
	async getTransactionsDetails(req, res) {}
	async getNotificationCode(req, res) {}
	async cancelTransaction(req, res) {}
	async refundTransaction(req, res) {}
	async parcialRefunds(req, res) {}
}

export default new PagSeguroController();
