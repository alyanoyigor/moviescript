import { Schema } from 'mongoose';
import { Service } from 'typedi';

import modelMixin from '../mixins/model.mixin';
import { TCategory } from '../types';

export const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true },
});

@Service()
class CategoryModel extends modelMixin<TCategory>('Category', categorySchema) {
  async createCategory(data: TCategory) {
    const category = new this.Model(data);
    await category.save();
    return category;
  }

  async getCategories() {
    return await this.Model.find();
  }
}

export default CategoryModel;
