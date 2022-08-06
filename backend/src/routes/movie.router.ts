import express from 'express';
import Container from 'typedi';
import MovieController from '../controllers/movie.controller';

const movieRouter = express.Router();
const movieController = Container.get(MovieController);

movieRouter.get('/', () => {});
movieRouter.post('/', movieController.createMovie.bind(movieController));

export default movieRouter;
