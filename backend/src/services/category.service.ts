import { Service } from 'typedi';
import CategoryModel from '../models/category.model';
import { CategoryUserInput } from '../types';

@Service()
class CategoryService {
  constructor(private categoryModel: CategoryModel) {}

  async createCategory(data: CategoryUserInput) {
    const category = await this.categoryModel.findByParam({ name: data.name });
    if (category) {
      throw new Error(`Category with name '${data.name}' already exist`);
    }

    return await this.categoryModel.createCategory(data);
  }

  async getCategories() {
    return await this.categoryModel.getCategories();
  }
}

export default CategoryService;
