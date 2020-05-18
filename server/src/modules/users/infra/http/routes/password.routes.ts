import { Router } from 'express';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResestPasswordController from '@modules/users/infra/http/controllers/ResestPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resestPasswordController = new ResestPasswordController();

const passwordRouter = Router();

passwordRouter.post('/forgot', forgotPasswordController.create);

passwordRouter.post('/reset', resestPasswordController.create);

export default passwordRouter;
