import { Document } from 'mongoose';
import { Service } from 'typedi';
import CategoryModel from '../models/category.model';
import { CategoryUserInput, User } from '../types';

@Service()
class CategoryService {
  constructor(private categoryModel: CategoryModel) {}

  async createCategory(
    data: CategoryUserInput,
    user: Document<unknown, any, User> & User
  ) {
    const foundCategory = await this.categoryModel.findByParam({
      name: data.name,
      userId: user._id,
    });
    if (foundCategory) {
      throw new Error(`Category with name '${data.name}' already exist`);
    }

    return await this.categoryModel.createCategory({
      ...data,
      userId: user._id,
    });
  }

  async getCategories(user: Document<unknown, any, User> & User) {
    return await this.categoryModel.model.find({ userId: user._id });
  }
}

export default CategoryService;
