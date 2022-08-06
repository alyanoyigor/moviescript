import express from 'express';
import movieRouter from './movie.router';

const router = express.Router();

router.use('/movies', movieRouter);

export default router;
