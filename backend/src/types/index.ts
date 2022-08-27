import { Document, Types } from 'mongoose';
import { z as zod } from 'zod';
import {
  CategoryUserInputSchema,
  CategoryDatabaseSchema,
  MovieSchema,
  CategoryOptionalSchema,
  MovieOptionalSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from '../validation';

type UserId = {
  userId: Types.ObjectId;
};

export type CategoryUserInput = zod.infer<typeof CategoryUserInputSchema>;
export type Movie = zod.infer<typeof MovieSchema> & UserId;
export type MovieUserInput = zod.infer<typeof MovieSchema>;

export type CategoryInDatabase = CategoryUserInput & UserId;

export type CategoryUpdate = zod.infer<typeof CategoryOptionalSchema>;
export type MovieUpdate = zod.infer<typeof MovieOptionalSchema>;

export type UserLogin = zod.infer<typeof UserLoginSchema>;
export type UserRegister = zod.infer<typeof UserRegisterSchema>;

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

export type User = {
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
};

export type Context = {
  token?: string;
  user?: Document<unknown, any, User> & User;
};
