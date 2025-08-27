export type Movie = {
  id: number;
  title: string;
  overview?: string;
  releaseDate: string;
  runtime?: number;
  posterPath?: string;
  backdropPath?: string;
  genres?: string[];

  // user specific status
  userStatus?: {
    watched: boolean;
    watchlisted: boolean;
    favorited: boolean;
    reviewId?: number; // if user has reviewed it
  };
};
