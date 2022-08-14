import { Service } from 'typedi';
import CategoryModel from '../models/category.model';
import { TCategory } from '../types';

@Service()
class CategoryService {
  constructor(private categoryModel: CategoryModel) {}

  async createCategory(data: TCategory) {
    return await this.categoryModel.createCategory(data);
  }

  async getCategories() {
    return await this.categoryModel.getCategories();
  }
}

export default CategoryService;
