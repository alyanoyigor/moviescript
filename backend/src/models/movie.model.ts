import { Schema } from 'mongoose';
import { Service } from 'typedi';

import modelMixin from '../mixins/model.mixin';
import { TCategory, TMovie } from '../types/movie';

const categorySchema = new Schema<TCategory>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const movieSchema = new Schema<TMovie>(
  {
    title: { type: String, required: true },
    overview: { type: String },
    categories: { type: [categorySchema], default: [] },
    originalLanguage: { type: String, required: true },
    releaseDate: { type: Date, default: new Date() },
    imagePath: { type: String },
  },
  { timestamps: true }
);

@Service()
class MovieModel extends modelMixin<TMovie>('Movie', movieSchema) {
  async createMovie(data: TMovie) {
    const movie = new this.Model(data);
    await movie.save();
    return movie;
  }

  async findMovieByParam(param: Partial<TMovie>) {
    return await this.findByParam(param);
  }

  async findById(id: string) {
    return super.findById(id);
  }

  async getMovieList() {
    return await this.Model.find();
  }

  async updateMovie(data: Partial<TMovie>, param: Partial<TMovie>) {
    const movie = await this.findMovieByParam(param);
    const updatedMovie = new this.Model(movie);

    updatedMovie.set(data);
    await updatedMovie.save();

    return updatedMovie;
  }
}

export default MovieModel;
