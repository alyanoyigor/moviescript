type ID = {
  _id: string;
};

type MovieDate = {
  $D: number;
  $H: number;
  $L: string;
  $M: number;
  $W: number;
  $d: Date;
  $m: number;
  $ms: number;
  $s: number;
  $u: undefined;
  $x: object;
  $y: number;
};

export type MovieDefault = {
  title: string;
  description: string;
  categories: MovieCategory[];
  duration: number;
  grade: number;
};

export type MovieUserInput = MovieDefault & {
  imagePath: string;
  releaseDate: Date | string;
};

export type MovieFormSchema = MovieDefault & {
  releaseDate: MovieDate;
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
