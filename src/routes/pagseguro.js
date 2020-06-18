import PagSeguroController from '../app/controllers/PagSeguroController';

const router = require('express').Router();

router.post('/pagseguro/create_session', PagSeguroController.createSession);
router.get(
	'/pagseguro/get_payment_methods',
	PagSeguroController.getPaymentMethods
);
router.get('/pagseguro/get_card_flag', PagSeguroController.getCardFlag);
router.post('/pagseguro/get_card_token', PagSeguroController.getCardToken);
router.get('/pagseguro/get_installments', PagSeguroController.getInstallments);
router.post('/pagseguro/payment', PagSeguroController.payment);
router.get(
	'/pagseguro/get_by_code/:referenceCode',
	PagSeguroController.getByReferenceCode
);
router.get(
	'/pagseguro/get_by_interval/:initialDate/:finalDate',
	PagSeguroController.getByDateInterval
);
router.get(
	'/pagseguro/get_transaction_details/:transactionCode',
	PagSeguroController.getTransactionsDetails
);
router.get(
	'/pagseguro/get_notification_code/:notificationCode',
	PagSeguroController.getNotificationCode
);
router.post(
	'/pagseguro/cancel_transaction/:transactionCode',
	PagSeguroController.cancelTransaction
);
router.post(
	'/pagseguro/refund_transaction/:transactionCode',
	PagSeguroController.refundTransaction
);
router.post(
	'/pagseguro/parcial_refund_transaction/:transactionCode/:refundValue',
	PagSeguroController.parcialRefunds
);

module.exports = router;