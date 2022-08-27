import { z as zod } from 'zod';

const createErrorObject = (option: string, type: string) => ({
  required_error: `${option} is required`,
  invalid_type_error: `${option} must be a ${type}`,
});

const categoryObject = {
  name: zod
    .string(createErrorObject('Name', 'string'))
    .max(30, 'Name should be less than 30 characters'),
};

export const CategoryUserInputSchema = zod.object(categoryObject);
export const CategoryOptionalSchema = CategoryUserInputSchema.partial();

export const CategoryDatabaseSchema = zod.object({
  ...categoryObject,
  _id: zod.string(),
  userId: zod.string(),
});

const movieObject = {
  _id: zod.string(),
  title: zod
    .string(createErrorObject('Title', 'string'))
    .max(250, 'Title should be less than 250 characters'),
  description: zod
    .string(createErrorObject('Description', 'string'))
    .max(1000, 'Description should be less than 1000 characters'),
  categories: zod.array(
    CategoryDatabaseSchema,
    createErrorObject('Categories', 'array of categories')
  ),
  releaseDate: zod.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    return arg;
  }, zod.date(createErrorObject('Release date', 'date'))),
  imagePath: zod.string(createErrorObject('Image path', 'string')),
  duration: zod
    .number(createErrorObject('Duration', 'number'))
    .max(1000, 'Duration should be less than 1000'),
  grade: zod
    .number(createErrorObject('Grade', 'number'))
    .min(0.5, 'Grade should be bigger than 0.5')
    .max(5, 'Grade should be less than 5'),
  deleted: zod.optional(zod.boolean()),
};

export const MovieSchema = zod.object(movieObject);
export const MovieOptionalSchema = MovieSchema.partial();

const userObjectValidation = {
  email: zod.string().email('Must be a valid email'),
  password: zod
    .string()
    .regex(
      new RegExp('.*[A-Z].*'),
      'Should contains one uppercase character at least'
    )
    .regex(
      new RegExp('.*[a-z].*'),
      'Should contains one lowercase character at least'
    )
    .regex(new RegExp('.*\\d.*'), 'Should contains one number at least')
    .min(8, 'Too short password')
    .max(30, 'Too long password'),
};

export const UserLoginSchema = zod.object(userObjectValidation);
export const UserRegisterSchema = zod.object({
  ...userObjectValidation,
  name: zod.string().max(30, 'Too long name'),
});
