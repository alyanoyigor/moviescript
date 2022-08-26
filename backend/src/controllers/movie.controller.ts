import { Request, Response } from 'express';
import { Service } from 'typedi';
import fsPromises from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

import MovieService from '../services/movie.service';
import { MovieOptionalSchema, MovieSchema } from '../validation';
import BaseController from './base.controller';

const { HOST } = process.env;

@Service()
class MovieController extends BaseController {
  constructor(private movieService: MovieService) {
    super();
  }

  async getMovieList(request: Request, response: Response) {
    try {
      const movieList = await this.movieService.getMovieList(request.query);
      return this.formatSuccessResponse(response, movieList);
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async getMovie(request: Request, response: Response) {
    try {
      const movie = await this.movieService.getMovie(request.params.id);
      return this.formatSuccessResponse(response, movie);
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async createMovie(request: Request, response: Response) {
    try {
      const validMovie = MovieSchema.parse(request.body);
      const movie = await this.movieService.createMovie(validMovie);
      return this.formatSuccessResponse(response, movie);
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async updateMovie(request: Request, response: Response) {
    try {
      const validMovie = MovieOptionalSchema.parse(request.body);
      const movie = await this.movieService.updateMovie(
        validMovie,
        request.params.id
      );
      return this.formatSuccessResponse(response, movie);
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async deleteMovie(request: Request, response: Response) {
    try {
      const deletedResponse = await this.movieService.deleteMovie(
        request.params.id
      );
      return this.formatSuccessResponse(response, deletedResponse);
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async createMovieImage(request: Request, response: Response) {
    try {
      if (request.files?.file) {
        const file = request.files.file;
        if (!Array.isArray(file)) {
          const data = await this.movieService.createMovieImage(file);
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
      if (request.files?.file) {
        const file = request.files.file;
        if (!Array.isArray(file)) {
          const data = await this.movieService.updateMovieImage(
            file,
            request.params.id
          );
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
