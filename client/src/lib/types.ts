export type Movie = {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
  runtime?: number;
  genres?: string[];

  // user specific status
  userStatus?: {
    watched: boolean;
    watchlisted: boolean;
    favorited: boolean;
    reviewId?: number; // if user has reviewed it
  };
};

export type Cast = {
  id: number;
  name?: string;
  gender?: number;
  character?: string;
  profile_path?: string;
};

export type Person = {
  id: number;
  name: string;
  biography?: string;
  gender?: number;
  profile_path?: string;
};

export type User = {
  id: string;
  display_name: string;
  bio?: string;
  created_at?: string;
  avatar_url?: string;
};

export type UserStats = {
  watched: number;
  favorites: number;
  watchlist: number;
  reviews: number;
};

export type UserWatched = {
  id: number;
  user_id: string;
  movie_id: number;
  created_at: string;
  movies: Movie;
};
