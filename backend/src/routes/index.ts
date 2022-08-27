import express from 'express';
import isAuthMiddleware from '../middlewares/isAuth.middleware';
import authRouter from './auth.router';
import categoryRouter from './category.router';
import movieRouter from './movie.router';

const router = express.Router();

router.use('/movies', isAuthMiddleware, movieRouter);
router.use('/categories', isAuthMiddleware, categoryRouter);
router.use('/auth', authRouter);

export default router;
