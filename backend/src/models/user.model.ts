import { Schema, model } from 'mongoose';
import { Service } from 'typedi';
import bcrypt from 'bcrypt';

import modelMixin from '../mixins/model.mixin';
import { User } from '../types';
import { categorySchema } from './category.model';
import { movieSchema } from './movie.model';

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    movies: { type: [movieSchema], default: [] },
    categories: { type: [categorySchema], default: [] },
    token: { type: String },
  },
  { timestamps: true, versionKey: false }
);

@Service()
class UserModel extends modelMixin<User>('User', userSchema) {
  async findUserByEmail(email: string) {
    return await this.Model.findOne({ email });
  }

  async findUserById(id: string) {
    return await this.Model.findById(id);
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createUser(data: User) {
    const user = new this.Model(data);
    await user.save();
    return user;
  }
}
export default UserModel;
