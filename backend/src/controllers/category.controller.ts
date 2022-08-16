import { Request, Response } from 'express';
import { Service } from 'typedi';

import CategoryService from '../services/category.service';
import { CategoryUserInputSchema } from '../validation';
import BaseController from './base.controller';

@Service()
class CategoryController extends BaseController {
  constructor(private categoryService: CategoryService) {
    super();
  }

  async createCategory(request: Request, response: Response) {
    try {
      const validCategory = CategoryUserInputSchema.parse(request.body);
      const category = await this.categoryService.createCategory(validCategory);
      return this.formateSuccessResponse(response, category);
    } catch (error) {
      this.handleError(response, error);
    }
  }
  async getCategories(request: Request, response: Response) {
    try {
      const categories = await this.categoryService.getCategories();
      return this.formateSuccessResponse(response, categories);
    } catch (error) {
      this.handleError(response, error);
    }
  }
}

export default CategoryController;
