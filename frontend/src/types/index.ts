type ID = {
  _id: string;
};

export type MovieUserInput = {
  title: string;
  description: string;
  categories: MovieCategory[];
  releaseDate: string;
  imagePath: string;
  duration: number;
  grade: number;
};

export type MovieCategoryUserInput = {
  name: string;
};

export type MovieCategory = MovieCategoryUserInput & ID;

export type Movie = MovieUserInput & ID;

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
