import MercadoPagoController from '../app/controllers/MercadoPagoController';

const router = require('express').Router();

router.post(
	'/mercadopago/get_acess_token',
	MercadoPagoController.getAcessToken
);
router.post('/mercadopago/payment', MercadoPagoController.payment);

module.exports = router;
