type ID = {
  _id: string;
};

export type MovieDefault = {
  title: string;
  description: string;
  duration: number;
  releaseDate: Date;
  grade: number;
};

export type MovieFormSchema = MovieDefault & {
  categories: string[];
  imagePath: FileList;
  fetchCategories: MovieCategory[];
};

export type MovieCategoryUserInput = {
  name: string;
};

export type MovieCategory = MovieCategoryUserInput & ID;

export type Movie = {
  title: string;
  description: string;
  categories: MovieCategory[];
  releaseDate: Date;
  imagePath: string;
  duration: number;
  grade: number;
} & ID;

export enum SortMoviesOptions {
  asc = 'asc',
  desc = 'desc',
}

export type MovieQueries = {
  search?: string | null;
  categories?: string | null;
  limit?: string | null;
  sort?: SortMoviesOptions | null;
};

export enum Position {
  static = 'static',
  absolute = 'absolute',
  relative = 'relative',
  fixed = 'fixed',
  sticky = 'sticky',
}
