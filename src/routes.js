import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.use(require('./routes/forgot'));
routes.use(require('./routes/signin'));

routes.use(authMiddleware);

routes.use(require('./routes/appointments'));
routes.use(require('./routes/addresses'));
routes.use(require('./routes/cards'));
routes.use(require('./routes/categories'));
routes.use(require('./routes/files'));
routes.use(require('./routes/notifications'));
routes.use(require('./routes/mercardopago'));
routes.use(require('./routes/phones'));
routes.use(require('./routes/points'));
routes.use(require('./routes/providers'));
routes.use(require('./routes/schedule'));
routes.use(require('./routes/users'));

export default routes;
