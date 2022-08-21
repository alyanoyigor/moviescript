type ID = {
  _id: string;
};

export type MovieDefault = {
  title: string;
  description: string;
  categories: MovieCategory[];
  duration: number;
  releaseDate: Date;
  grade: number;
};

export type MovieUserInput = MovieDefault & {
  imagePath: string;
};

export type MovieFormSchema = MovieDefault & {
  imagePath: FileList;
};

export type MovieCategoryUserInput = {
  name: string;
};

export type MovieCategory = MovieCategoryUserInput & ID;

export type Movie = {
  title: string;
  description: string;
  categories: MovieCategory[];
  releaseDate: string;
  imagePath: string;
  duration: number;
  grade: number;
} & ID;

enum SortMoviesOptions {
  asc = 'asc',
  desc = 'desc',
}

export type MoviesQuery = {
  search?: string;
  categories?: string;
  limit?: string;
  sort?: SortMoviesOptions;
};

export enum Position {
  static = 'static',
  absolute = 'absolute',
  relative = 'relative',
  fixed = 'fixed',
  sticky = 'sticky',
}
