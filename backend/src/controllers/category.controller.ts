import { Request, Response } from 'express';
import { Service } from 'typedi';

import BaseController from './base.controller';
import CategoryService from '../services/category.service';

@Service()
class CategoryController extends BaseController {
  constructor(private categoryService: CategoryService) {
    super();
  }

  async createCategory(request: Request, response: Response) {
    try {
      const category = await this.categoryService.createCategory(request.body);
      return this.formateSuccessResponse(response, category);
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }
  async getCategories(request: Request, response: Response) {
    try {
      const categories = await this.categoryService.getCategories();
      return this.formateSuccessResponse(response, categories);
    } catch (error) {
      return this.formatErrorResponse(response, error);
    }
  }
}

export default CategoryController;
