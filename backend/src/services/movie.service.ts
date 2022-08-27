import fileUpload from 'express-fileupload';
import fsPromises from 'fs/promises';
import { Document, Types } from 'mongoose';
import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid';
import MovieModel from '../models/movie.model';
import {
  MovieUserInput,
  Movie,
  MoviesQuery,
  MovieUpdate,
  User,
} from '../types';

const { HOST } = process.env;

@Service()
class MovieService {
  constructor(private movieModel: MovieModel) {}

  async createMovie(
    data: MovieUserInput,
    user: Document<unknown, any, User> & User
  ) {
    return await this.movieModel.createMovie({ ...data, userId: user._id });
  }

  async getAllNotDeletedMovies(userId: Types.ObjectId) {
    return await this.movieModel.model.find({
      deleted: { $ne: true },
      userId,
    });
  }

  async getMovieList(
    query: MoviesQuery,
    user: Document<unknown, any, User> & User
  ) {
    const allMovies = await this.getAllNotDeletedMovies(user._id);

    let limit;
    if (Number(query.limit) <= 8) {
      limit = 8;
    } else {
      limit = Number(query.limit) || 8;
    }

    const moviesModel = this.movieModel.model
      .find({ deleted: { $ne: true }, userId: user._id })
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

  async getMovie(id: string, userId: Types.ObjectId) {
    const movie = await this.movieModel.getMovie(id, userId);

    if (!movie) {
      throw new Error('Invalid id');
    }

    if (movie.deleted) {
      throw new Error('Invalid id');
    }

    return movie;
  }

  async updateMovie(data: {
    movie: Partial<MovieUpdate>;
    id: string;
    userId: Types.ObjectId;
  }) {
    return await this.movieModel.updateMovie(data);
  }

  async deleteMovieImage(id: string, userId: Types.ObjectId) {
    const dirPath = `${__dirname}/../public/movies/${userId}/${id}`;
    await fsPromises.rm(dirPath, { recursive: true });
  }

  async deleteMovie(id: string, userId: Types.ObjectId) {
    await this.deleteMovieImage(id, userId);
    return await this.movieModel.deleteMovie(id, userId);
  }

  async checkCreateDirectory(path: string) {
    try {
      await fsPromises.access(path);
    } catch (error) {
      await fsPromises.mkdir(path);
    }
  }

  async createMovieImage(
    file: fileUpload.UploadedFile,
    userId: Types.ObjectId
  ) {
    const dirName = uuidv4();

    await this.checkCreateDirectory(`${__dirname}/../public`);
    await this.checkCreateDirectory(`${__dirname}/../public/movies`);
    await this.checkCreateDirectory(`${__dirname}/../public/movies/${userId}`);

    await fsPromises.mkdir(
      `${__dirname}/../public/movies/${userId}/${dirName}`
    );
    await file.mv(
      `${__dirname}/../public/movies/${userId}/${dirName}/${file.name}`
    );
    return {
      url: `${HOST}/public/movies/${userId}/${dirName}/${file.name}`,
      id: dirName,
    };
  }

  async updateMovieImage(data: {
    file: fileUpload.UploadedFile;
    id: string;
    userId: Types.ObjectId;
  }) {
    const { file, userId, id } = data;
    const dirPath = `${__dirname}/../public/movies/${userId}/${id}`;
    const dirFiles = await fsPromises.readdir(dirPath);
    const filesPromises = dirFiles.map((fileName) =>
      fsPromises.unlink(`${dirPath}/${fileName}`)
    );
    await Promise.all(filesPromises);
    await file.mv(`${dirPath}/${file.name}`);
    return { url: `${HOST}/public/movies/${userId}/${id}/${file.name}` };
  }
}

export default MovieService;
