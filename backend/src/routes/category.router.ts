import express from 'express';
import Container from 'typedi';
import CategoryController from '../controllers/category.controller';

const categoryRouter = express.Router();
const categoryController = Container.get(CategoryController);

categoryRouter.get(
  '/',
  categoryController.getCategories.bind(categoryController)
);
categoryRouter.post(
  '/',
  categoryController.createCategory.bind(categoryController)
);

export default categoryRouter;
