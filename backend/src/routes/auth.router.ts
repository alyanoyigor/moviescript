import express from 'express';
import Container from 'typedi';

import AuthController from '../controllers/auth.controller';
import isAuthMiddleware from '../middlewares/isAuth.middleware';

const authRouter = express.Router();
const authController = Container.get(AuthController);

authRouter.post('/register', authController.registerUser.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.get(
  '/logout',
  isAuthMiddleware,
  authController.logout.bind(authController)
);

export default authRouter;
