import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// User
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import CategoryController from './app/controllers/CategoryController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

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

export default routes;
