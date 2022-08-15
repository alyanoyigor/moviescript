export type MovieCategory = {
  _id: string;
  name: string;
};

export type Movie = {
  _id: string;
  title: string;
  description: string;
  categories: MovieCategory[];
  releaseDate: Date;
  imagePath: string;
  duration: number;
  grade: number;
};

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
