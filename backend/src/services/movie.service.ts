import { Service } from 'typedi';
import MovieModel from '../models/movie.model';
import { TMovie } from '../types/movie';

@Service()
class MovieService {
  constructor(private movieModel: MovieModel) {}

  async createMovie(data: TMovie) {
    return await this.movieModel.createMovie(data);
  }

  async getMovieList() {
    return await this.movieModel.getMovieList();
  }
}

export default MovieService;
