import { Types } from 'mongoose';

type ID = {
  _id: Types.ObjectId;
};

export type TCategory = {
  name: string;
} & ID;

export type TMovie = {
  title: string;
  description: string;
  categories: TCategory[];
  releaseDate: Date;
  imagePath: string;
  duration: number;
  grade: number;
  deleted?: boolean;
} & ID;

enum SortOptions {
  asc = 'asc',
  desc = 'desc',
}

export type TMoviesQuery = {
  search?: string;
  categories?: string;
  limit?: string;
  sort?: SortOptions;
};
