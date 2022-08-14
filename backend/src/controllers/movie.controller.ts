import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Service } from 'typedi';

import BaseController from './base.controller';
import MovieService from '../services/movie.service';

@Service()
class MovieController extends BaseController {
  constructor(private movieService: MovieService) {
    super();
  }

  async getMovieList(_request: Request, response: Response) {
    try {
      const movieList = await this.movieService.getMovieList();
      return this.formateSuccessResponse(response, movieList);
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }

  async getMovie(request: Request, response: Response) {
    try {
      const movie = await this.movieService.getMovie(request.params.id);
      return this.formateSuccessResponse(response, movie);
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }

  async createMovie(request: Request, response: Response) {
    try {
      const movie = await this.movieService.createMovie(request.body);
      return this.formateSuccessResponse(response, movie);
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }

  async updateMovie(request: Request, response: Response) {
    try {
      const param = { _id: new mongoose.Types.ObjectId(request.params.id) };
      const movie = await this.movieService.updateMovie(request.body, param);
      return this.formateSuccessResponse(response, movie);
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }

  async deleteMovie(request: Request, response: Response) {
    try {
      const deletedResponse = await this.movieService.deleteMovie(
        request.params.id
      );
      return this.formateSuccessResponse(response, deletedResponse);
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }
}

export default MovieController;
