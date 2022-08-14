import express from 'express';
import Container from 'typedi';
import MovieController from '../controllers/movie.controller';

const movieRouter = express.Router();
const movieController = Container.get(MovieController);

movieRouter.get('/', movieController.getMovieList.bind(movieController));
movieRouter.get('/:id', movieController.getMovie.bind(movieController));

movieRouter.post('/', movieController.createMovie.bind(movieController));
movieRouter.patch('/:id', movieController.updateMovie.bind(movieController));

movieRouter.delete('/:id', movieController.deleteMovie.bind(movieController));

export default movieRouter;
