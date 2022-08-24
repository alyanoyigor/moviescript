import { Schema } from 'mongoose';
import { Service } from 'typedi';

import modelMixin from '../mixins/model.mixin';
import { CategoryInDatabase, CategoryUserInput } from '../types';

export const categorySchema = new Schema<CategoryUserInput>(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);

@Service()
class CategoryModel extends modelMixin<CategoryUserInput>(
  'Category',
  categorySchema
) {
  async findByParam(param: Partial<CategoryInDatabase>) {
    return await super.findByParam(param);
  }

  async createCategory(data: CategoryUserInput) {
    const category = new this.Model(data);
    await category.save();
    return category;
  }

  async getCategories() {
    return await this.Model.find();
  }
}

export default CategoryModel;
