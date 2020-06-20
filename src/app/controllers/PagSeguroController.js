class PagSeguroController {
	async createSession(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async getPaymentMethods(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async getCardFlag(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async getCardToken(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async getInstallments(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async payment(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async getByReferenceCode(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async getByDateInterval(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async getTransactionsDetails(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async getNotificationCode(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async cancelTransaction(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async refundTransaction(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
	async parcialRefunds(req, res) {
		return res.status(501).json({ error: 'Not implemented' });
	}
}

export default new PagSeguroController();
