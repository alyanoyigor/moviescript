import { Types } from 'mongoose';

type ID = {
  _id: typeof Types.ObjectId;
};

export type TCategory = {
  id: number;
  name: string;
};

export type TMovie = {
  title: string;
  overview: string;
  originalLanguage: string;
  categories: TCategory[];
  releaseDate: Date;
  imagePath: string;
} & ID;
