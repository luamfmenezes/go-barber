import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello world' });
});

routes.use('/appointments', appointmentsRoutes);

export default routes;
