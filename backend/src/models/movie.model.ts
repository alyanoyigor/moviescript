import { Schema } from 'mongoose';
import { Service } from 'typedi';

import modelMixin from '../mixins/model.mixin';
import { MovieUserInput, MovieInDatabase } from '../types';
import { categorySchema } from './category.model';

const movieSchema = new Schema<MovieInDatabase>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: [categorySchema], default: [] },
    releaseDate: { type: Date, default: new Date() },
    duration: { type: Number, required: true },
    grade: { type: Number, required: true },
    imagePath: { type: String, required: true },
    deleted: { type: Boolean },
  },
  { timestamps: true }
);

@Service()
class MovieModel extends modelMixin<MovieInDatabase>('Movie', movieSchema) {
  get model() {
    return this.Model;
  }

  async createMovie(data: MovieUserInput) {
    const movie = new this.Model(data);
    await movie.save();
    return movie;
  }

  async findMovieByParam(param: Partial<MovieInDatabase>) {
    return await this.findByParam(param);
  }

  async findById(id: string) {
    return await super.findById(id);
  }

  async getMovie(id: string) {
    return await this.Model.findById(id);
  }

  async deleteMovie(id: string) {
    const movie = await this.findById(id);
    const deletedMovie = new this.Model(movie);

    deletedMovie.set({ delete: true });
    await deletedMovie.save();

    return 'Successfully deleted';
  }

  async updateMovie(data: Partial<MovieUserInput>, id: string) {
    const movie = await this.findById(id);
    const updatedMovie = new this.Model(movie);

    updatedMovie.set(data);
    await updatedMovie.save();

    return updatedMovie;
  }
}

export default MovieModel;
