import { Service } from 'typedi';
import MovieModel from '../models/movie.model';
import { TMovie, TMoviesQuery } from '../types';

@Service()
class MovieService {
  constructor(private movieModel: MovieModel) {}

  async createMovie(data: TMovie) {
    return await this.movieModel.createMovie(data);
  }

  async getMovieList(query: TMoviesQuery) {
    const limit = Number(query.limit) || 8;
    const movies = this.movieModel.model
      .find({ deleted: { $ne: true } })
      .limit(limit);

    if (query.search) {
      movies.find({ title: { $regex: query.search, $options: 'i' } });
    }

    if (query.categories) {
      const categories = query.categories.split(',');
      movies.find({ 'categories.name': { $in: categories } });
    }

    if (query.sort) {
      movies.sort({ title: query.sort });
    }

    return await movies;
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

  async updateMovie(data: Partial<TMovie>, param: Partial<TMovie>) {
    return await this.movieModel.updateMovie(data, param);
  }

  async deleteMovie(id: string) {
    return await this.movieModel.deleteMovie(id);
  }
}

export default MovieService;
