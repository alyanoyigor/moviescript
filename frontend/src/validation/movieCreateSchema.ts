import * as yup from 'yup';
import dayjs from 'dayjs';
import { MovieCategory } from '../types';

const movieCategorySchema: yup.SchemaOf<MovieCategory> = yup.object({
  name: yup.string().required(),
  _id: yup.string().required(),
});

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const movieCreateSchema = yup.object({
  title: yup
    .string()
    .max(250, 'Title should be less than 250 characters')
    .required(),
  description: yup
    .string()
    .max(1000, 'Description should be less than 1000 characters')
    .required(),
  categories: yup.array().of(movieCategorySchema).required(),
  releaseDate: yup
    .date()
    .test('date', 'Invalid date', (value) => dayjs(value).isValid())
    .required(),
  imagePath: yup
    .mixed()
    .test(
      'fileSize',
      'File too large',
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    )
    .required('Image is required'),
  duration: yup
    .number()
    .transform((currentValue, originalValue) => {
      return originalValue === '' ? null : currentValue;
    })
    .nullable()
    .integer()
    .positive()
    .max(1000, 'Duration should be less than 1000')
    .required(),
  grade: yup
    .number()
    .integer()
    .positive()
    .min(1, 'Grade should be bigger than 1')
    .max(12, 'Grade should be less than 12')
    .required(),
});
