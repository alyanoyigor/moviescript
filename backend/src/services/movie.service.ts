import { Service } from 'typedi';
import MovieModel from '../models/movie.model';
import { Movie, MoviesQuery, MovieUpdate } from '../types';

@Service()
class MovieService {
  constructor(private movieModel: MovieModel) {}

  async createMovie(data: Movie) {
    return await this.movieModel.createMovie(data);
  }

  async getAllNotDeletedMovies() {
    return await this.movieModel.model.find({
      deleted: { $ne: true },
    });
  }

  async getMovieList(query: MoviesQuery) {
    const allMovies = await this.getAllNotDeletedMovies();

    let limit;
    if (Number(query.limit) <= 8) {
      limit = 8;
    } else {
      limit = Number(query.limit) || 8;
    }

    const moviesModel = this.movieModel.model
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

  async deleteMovie(id: string) {
    return await this.movieModel.deleteMovie(id);
  }
}

export default MovieService;
