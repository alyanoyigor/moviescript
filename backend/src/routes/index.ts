import express from 'express';
import categoryRouter from './category.router';
import movieRouter from './movie.router';

const router = express.Router();

router.use('/movies', movieRouter);
router.use('/categories', categoryRouter);

export default router;
