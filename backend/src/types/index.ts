import { z as zod } from 'zod';
import {
  CategoryUserInputSchema,
  CategoryDatabaseSchema,
  MovieSchema,
  CategoryOptionalSchema,
  MovieOptionalSchema,
} from '../validation';

export type CategoryUserInput = zod.infer<typeof CategoryUserInputSchema>;
export type Movie = zod.infer<typeof MovieSchema>;

export type CategoryInDatabase = zod.infer<typeof CategoryDatabaseSchema>;

export type CategoryUpdate = zod.infer<typeof CategoryOptionalSchema>;
export type MovieUpdate = zod.infer<typeof MovieOptionalSchema>;

enum SortOptions {
  asc = 'asc',
  desc = 'desc',
}

export type MoviesQuery = {
  search?: string;
  categories?: string;
  limit?: string;
  sort?: SortOptions;
};
