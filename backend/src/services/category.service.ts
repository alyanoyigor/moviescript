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
    const checkCategory = user.categories.find(
      (category) => category.name === data.name
    );
    if (checkCategory) {
      throw new Error(`Category with name '${data.name}' already exist`);
    }

    const category = await this.categoryModel.createCategory(data);
    user.categories = [...user.categories, category];
    await user.save();

    return category;
  }

  async getCategories(user: Document<unknown, any, User> & User) {
    return await user.get('categories');
  }
}

export default CategoryService;
