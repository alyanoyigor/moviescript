import { Schema } from 'mongoose';
import { Service } from 'typedi';

import modelMixin from '../mixins/model.mixin';
import { CategoryInDatabase } from '../types';

export const categorySchema = new Schema<CategoryInDatabase>(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false }
);

@Service()
class CategoryModel extends modelMixin<CategoryInDatabase>(
  'Category',
  categorySchema
) {
  get model() {
    return this.Model;
  }

  async findByParam(param: Partial<CategoryInDatabase>) {
    return await super.findByParam(param);
  }

  async createCategory(data: CategoryInDatabase) {
    const category = new this.Model(data);
    await category.save();
    return category;
  }
}

export default CategoryModel;
