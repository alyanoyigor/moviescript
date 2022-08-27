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
      if (request.context && request.context.user) {
        const category = await this.categoryService.createCategory(
          validCategory,
          request.context.user
        );
        return this.formatSuccessResponse(response, category);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }
  async getCategories(request: Request, response: Response) {
    try {
      if (request.context && request.context.user) {
        const categories = await this.categoryService.getCategories(
          request.context.user
        );
        return this.formatSuccessResponse(response, categories);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }
}

export default CategoryController;
