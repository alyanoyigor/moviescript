import { Service } from 'typedi';
import MovieModel from '../models/movie.model';
import { TMovie } from '../types';

@Service()
class MovieService {
  constructor(private movieModel: MovieModel) {}

  async createMovie(data: TMovie) {
    return await this.movieModel.createMovie(data);
  }

  async getMovieList() {
    const movieList = await this.movieModel.getMovieList();
    const existingMovies = movieList.filter(
      (movie) => Boolean(movie.delete) === false
    );

    return existingMovies;
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
