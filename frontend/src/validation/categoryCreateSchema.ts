import * as yup from 'yup';
import { MovieCategoryUserInput } from '../types';

const required = 'This field is required';

export const categoryCreateSchema: yup.SchemaOf<MovieCategoryUserInput> =
  yup.object({
    name: yup
      .string()
      .max(30, 'Name should be less than 30 characters')
      .required(required),
  });
