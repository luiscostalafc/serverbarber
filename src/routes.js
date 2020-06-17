import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// User
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import CategoryController from './app/controllers/CategoryController';
import CardController from './app/controllers/CardController';
import PhoneController from './app/controllers/PhoneController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import PagSeguroController from './app/controllers/PagSeguroController';

// Map
import PointController from './app/controllers/PointController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
// routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);
// routes.delete('/users/:id', UserController.delete);

// routes.get('/files', FileController.index);
routes.post('/files', upload.single('file'), FileController.store);
// routes.get('/files/:id', FileController.show);
// routes.put('/files', FileController.update);
// routes.delete('/files/:id', FileController.delete);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.post('/categories/:categoryId/user/:userId', CategoryController.sync);
routes.get('/categories/:gender', CategoryController.gender);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);

routes.get('/cards', CardController.index);
routes.post('/cards', CardController.store);
routes.post('/cards/:cardId/user/:userId', CardController.sync);
routes.get('/cards/:id', CardController.show);
routes.put('/cards/:id', CardController.update);
routes.delete('/cards/:id', CardController.delete);

routes.get('/phone', PhoneController.index);
routes.post('/phone', PhoneController.store);
routes.post('/phone/:phoneId/user/:userId', PhoneController.sync);
routes.get('/phone/:id', PhoneController.show);
routes.put('/phone/:id', PhoneController.update);
routes.delete('/phone/:id', PhoneController.delete);

routes.get('/points', PointController.index);
routes.post('/points', PointController.store);
// routes.get('/points/:id', PointController.show);
// routes.put('/points/:id', PointController.update);
// routes.post('/points/:id', PointController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/providers', ProviderController.index);
routes.get('/providers', ProviderController.index);
// routes.show('/providers/:id', ProviderController.show);
// routes.put('/providers/:id', ProviderController.update);
// routes.delete('/providers/:id', ProviderController.delete);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
// routes.get('/appointments/:id', AppointmentController.show);
// routes.put('/appointments/:id', AppointmentController.update);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);
routes.post('/schedule', ScheduleController.index);
// routes.get('/schedule/:id', ScheduleController.show);
// routes.put('/schedule/:id', ScheduleController.update);
// routes.delete('/schedule/:id', ScheduleController.delete);

routes.get('/notifications', NotificationController.index);
// routes.post('/notifications', NotificationController.create);
// routes.get('/notifications/:id', NotificationController.show);
routes.put('/notifications/:id', NotificationController.update);
// routes.delete('/notifications/:id', NotificationController.delete);

routes.post('/pagseguro/create_session', PagSeguroController.createSession);
routes.get('/pagseguro/get_payment_methods', PagSeguroController.getPaymentMethods);
routes.get('/pagseguro/get_card_flag', PagSeguroController.getCardFlag);
routes.post('/pagseguro/get_card_token', PagSeguroController.getCardToken);
routes.get('/pagseguro/get_installments', PagSeguroController.getInstallments);
routes.post('/pagseguro/payment', PagSeguroController.payment);
routes.get('/pagseguro/get_by_code/:referenceCode', PagSeguroController.getByReferenceCode);
routes.get('/pagseguro/get_by_interval/:initialDate/:finalDate', PagSeguroController.getByDateInterval);
routes.get('/pagseguro/get_transaction_details/:transactionCode', PagSeguroController.getTransactionsDetails);
routes.get('/pagseguro/get_notification_code/:notificationCode', PagSeguroController.getNotificationCode);
routes.post('/pagseguro/cancel_transaction/:transactionCode', PagSeguroController.cancelTransaction);
routes.post('/pagseguro/refund_transaction/:transactionCode', PagSeguroController.refundTransaction);
routes.post('/pagseguro/parcial_refund_transaction/:transactionCode/:refundValue', PagSeguroController.parcialRefunds);

export default routes;
