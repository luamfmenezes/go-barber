import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileController = new ProfileController();

const profileRoutes = Router();

profileRoutes.use(ensureAuthenticated);

profileRoutes.put('/', profileController.update);

export default profileRoutes;
