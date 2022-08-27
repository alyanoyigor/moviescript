import { Schema, Types } from 'mongoose';
import { Service } from 'typedi';

import modelMixin from '../mixins/model.mixin';
import { Movie, MovieUpdate } from '../types';
import { categorySchema } from './category.model';

export const movieSchema = new Schema<Movie>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [categorySchema], default: [] },
    releaseDate: { type: Date, default: new Date() },
    duration: { type: Number, required: true },
    grade: { type: Number, required: true },
    imagePath: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deleted: { type: Boolean },
  },
  { timestamps: true, versionKey: false }
);

@Service()
class MovieModel extends modelMixin<Movie>('Movie', movieSchema) {
  get model() {
    return this.Model;
  }

  async createMovie(data: Movie) {
    const movie = new this.Model(data);
    await movie.save();
    return movie;
  }

  async findMovieByParam(param: Partial<Movie>) {
    return await this.findByParam(param);
  }

  async findById(id: string) {
    return await super.findById(id);
  }

  async getMovie(id: string, userId: Types.ObjectId) {
    return await this.findMovieByParam({ _id: id, userId });
  }

  async deleteMovie(id: string, userId: Types.ObjectId) {
    const movie = await this.getMovie(id, userId);
    const deletedMovie = new this.Model(movie);

    deletedMovie.set({ deleted: true });
    await deletedMovie.save();

    return 'Successfully deleted';
  }

  async updateMovie(data: {
    movie: Partial<MovieUpdate>;
    id: string;
    userId: Types.ObjectId;
  }) {
    const { userId, id, movie: newMovieData } = data;
    const movie = await this.getMovie(id, userId);
    const updatedMovie = new this.Model(movie);

    updatedMovie.set(newMovieData);
    await updatedMovie.save();

    return updatedMovie;
  }
}

export default MovieModel;
