import fileUpload from 'express-fileupload';
import fsPromises from 'fs/promises';
import { Document } from 'mongoose';
import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid';
import MovieModel from '../models/movie.model';
import { Movie, MoviesQuery, MovieUpdate, User } from '../types';

const { HOST } = process.env;

@Service()
class MovieService {
  constructor(private movieModel: MovieModel) {}

  async createMovie(data: Movie, user: Document<unknown, any, User> & User) {
    const movie = await this.movieModel.createMovie(data);
    user.movies = [...user.movies, movie];
    await user.save();
    return movie;
  }

  async getMovieList(
    query: MoviesQuery,
    user: Document<unknown, any, User> & User
  ) {
    const allMovies = await user.get('movies').find({
      deleted: { $ne: true },
    });

    let limit;
    if (Number(query.limit) <= 8) {
      limit = 8;
    } else {
      limit = Number(query.limit) || 8;
    }

    const moviesModel = await user
      .get('movies')
      .find({ deleted: { $ne: true } })
      .limit(limit);

    if (query.search) {
      moviesModel.find({ title: { $regex: query.search, $options: 'i' } });
    }

    if (query.categories) {
      const categories = query.categories.split(',');
      moviesModel.find({ 'categories.name': { $in: categories } });
    }

    if (query.sort) {
      moviesModel.sort({ title: query.sort });
    }

    const movies = await moviesModel;

    return { movies, allMoviesCount: allMovies.length };
  }

  async getMovie(id: string) {
    const movie = await this.movieModel.getMovie(id);

    if (!movie) {
      throw new Error('Invalid id');
    }

    if (movie.deleted) {
      throw new Error('Invalid id');
    }

    return movie;
  }

  async updateMovie(data: Partial<MovieUpdate>, id: string) {
    return await this.movieModel.updateMovie(data, id);
  }

  async deleteMovieImage(id: string) {
    const dirPath = `${__dirname}/../public/movies/${id}`;
    await fsPromises.rm(dirPath, { recursive: true });
  }

  async deleteMovie(id: string) {
    await this.deleteMovieImage(id);
    return await this.movieModel.deleteMovie(id);
  }

  async checkCreateDirectory(path: string) {
    try {
      await fsPromises.access(path);
    } catch (error) {
      await fsPromises.mkdir(path);
    }
  }

  async createMovieImage(file: fileUpload.UploadedFile) {
    const dirName = uuidv4();

    await this.checkCreateDirectory(`${__dirname}/../public`);
    await this.checkCreateDirectory(`${__dirname}/../public/movies`);

    await fsPromises.mkdir(`${__dirname}/../public/movies/${dirName}`);
    await file.mv(`${__dirname}/../public/movies/${dirName}/${file.name}`);
    return {
      url: `${HOST}/public/movies/${dirName}/${file.name}`,
      id: dirName,
    };
  }

  async updateMovieImage(file: fileUpload.UploadedFile, id: string) {
    const dirPath = `${__dirname}/../public/movies/${id}`;
    const dirFiles = await fsPromises.readdir(dirPath);
    const filesPromises = dirFiles.map((fileName) =>
      fsPromises.unlink(`${dirPath}/${fileName}`)
    );
    await Promise.all(filesPromises);
    await file.mv(`${dirPath}/${file.name}`);
    return { url: `${HOST}/public/movies/${id}/${file.name}` };
  }
}

export default MovieService;
