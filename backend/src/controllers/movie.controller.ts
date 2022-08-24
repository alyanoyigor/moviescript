import { Request, Response } from 'express';
import { Service } from 'typedi';
import fsPromises from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

import MovieService from '../services/movie.service';
import { MovieOptionalSchema, MovieDatabaseSchema } from '../validation';
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
      const validMovie = MovieDatabaseSchema.parse(request.body);
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

  async checkAndCreateDirectory(path: string) {
    try {
      await fsPromises.access(path);
    } catch (error) {
      await fsPromises.mkdir(path);
    }
  }

  async uploadMovieImage(request: Request, response: Response) {
    try {
      if (request.files?.file) {
        const file = request.files.file;
        if (!Array.isArray(file)) {
          const dirName = uuidv4();

          await this.checkAndCreateDirectory(`${__dirname}/../public`);
          await this.checkAndCreateDirectory(`${__dirname}/../public/movies`);

          await fsPromises.mkdir(`${__dirname}/../public/movies/${dirName}`);
          await file.mv(
            `${__dirname}/../public/movies/${dirName}/${file.name}`
          );
          return this.formatSuccessResponse(response, {
            url: `${HOST}/public/movies/${dirName}/${file.name}`,
            id: dirName,
          });
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
          const dirPath = `${__dirname}/../public/movies/${request.params.id}`;
          const dirFiles = await fsPromises.readdir(dirPath);
          const filesPromises = dirFiles.map((file) =>
            fsPromises.unlink(`${dirPath}/${file}`)
          );
          await Promise.all(filesPromises);
          await file.mv(`${dirPath}/${file.name}`);
          return this.formatSuccessResponse(response, {
            url: `${HOST}/public/movies/${request.params.id}/${file.name}`,
          });
        }
      }
      return this.formatErrorResponse(response, 'No file');
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }
}

export default MovieController;
