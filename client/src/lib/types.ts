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
