import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.use(require('./routes/forgot'));

routes.use(authMiddleware);

routes.use(require('./routes/appointments'));
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
