import { Request, Response } from 'express';
import { Service } from 'typedi';

import MovieService from '../services/movie.service';
import { MovieOptionalSchema, MovieSchema } from '../validation';
import BaseController from './base.controller';

@Service()
class MovieController extends BaseController {
  constructor(private movieService: MovieService) {
    super();
  }

  async getMovieList(request: Request, response: Response) {
    try {
      if (request.context && request.context.user) {
        const movieList = await this.movieService.getMovieList(
          request.query,
          request.context.user
        );
        return this.formatSuccessResponse(response, movieList);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async getMovie(request: Request, response: Response) {
    try {
      if (request.context && request.context.user) {
        const movie = await this.movieService.getMovie(
          request.params.id,
          request.context.user._id
        );
        return this.formatSuccessResponse(response, movie);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async createMovie(request: Request, response: Response) {
    try {
      const validMovie = MovieSchema.parse(request.body);
      if (request.context && request.context.user) {
        const movie = await this.movieService.createMovie(
          validMovie,
          request.context.user
        );
        return this.formatSuccessResponse(response, movie);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async updateMovie(request: Request, response: Response) {
    try {
      const validMovie = MovieOptionalSchema.parse(request.body);
      if (request.context && request.context.user) {
        const movie = await this.movieService.updateMovie({
          movie: validMovie,
          id: request.params.id,
          userId: request.context.user._id,
        });
        return this.formatSuccessResponse(response, movie);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async deleteMovie(request: Request, response: Response) {
    try {
      if (request.context && request.context.user) {
        const deletedResponse = await this.movieService.deleteMovie(
          request.params.id,
          request.context.user._id
        );
        return this.formatSuccessResponse(response, deletedResponse);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async createMovieImage(request: Request, response: Response) {
    try {
      if (request.files?.file && request.context && request.context.user) {
        const file = request.files.file;
        if (!Array.isArray(file)) {
          const data = await this.movieService.createMovieImage(
            file,
            request.context.user._id
          );
          return this.formatSuccessResponse(response, data);
        }
      }
      return this.formatErrorResponse(response, 'No file');
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }

  async updateMovieImage(request: Request, response: Response) {
    try {
      if (request.files?.file && request.context && request.context.user) {
        const file = request.files.file;
        if (!Array.isArray(file)) {
          const data = await this.movieService.updateMovieImage({
            file,
            id: request.params.id,
            userId: request.context.user._id,
          });
          return this.formatSuccessResponse(response, data);
        }
      }
      return this.formatErrorResponse(response, 'No file');
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }
}

export default MovieController;
