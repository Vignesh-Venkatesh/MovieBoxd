// represents a movie in the system
export type Movie = {
  id: number; // Unique TMDb ID or internal movie ID
  title: string; // Movie title
  overview?: string; // Optional description/summary
  poster_path?: string; // Optional path to poster image
  backdrop_path?: string; // Optional path to backdrop image
  release_date?: string; // Optional release date
  runtime?: number; // Optional runtime in minutes
  genres?: string[]; // Optional array of genre names

  // User-specific status for this movie
  userStatus?: {
    watched: boolean; // Whether the user has watched it
    watchlisted: boolean; // Whether the user added it to their watchlist
    favorited: boolean; // Whether the user favorited it
    reviewId?: number; // Optional review ID if user has reviewed it
  };
};

// represents a cast member for a movie
export type Cast = {
  id: number; // TMDb person ID
  name?: string; // Actor/actress name
  gender?: number; // Gender code from TMDb
  character?: string; // Character name in the movie
  profile_path?: string; // Optional path to profile image
};

// represents a person (actor, director, etc.)
export type Person = {
  id: number; // TMDb person ID
  name: string; // Person's name
  biography?: string; // Optional biography
  gender?: number; // Gender code
  profile_path?: string; // Optional path to profile image
};

// represents a user in the system
export type User = {
  id: string; // Unique user ID
  display_name: string; // Username
  bio?: string; // Optional bio
  created_at?: string; // Optional account creation date
  avatar_url?: string; // Optional profile picture URL
};

// represents aggregate stats for a user
export type UserStats = {
  watched: number; // Number of movies watched
  favorites: number; // Number of favorited movies
  watchlist: number; // Number of movies in watchlist
  reviews: number; // Number of reviews made
};

// represents a movie watched by a user
export type UserWatched = {
  id: number; // Unique ID of the watched record
  user_id: string; // User ID
  movie_id: number; // Movie ID
  created_at: string; // Date/time when added
  movies: Movie; // Nested movie data
};

// represents a movie favorited by a user
export type UserFavorited = {
  id: number; // Unique ID of the favorited record
  user_id: string; // User ID
  movie_id: number; // Movie ID
  created_at: string; // Date/time when added
  movies: Movie; // Nested movie data
};

// represents a movie in a user's watchlist
export type UserWatchlist = {
  id: number; // Unique ID of the watchlist record
  user_id: string; // User ID
  movie_id: number; // Movie ID
  created_at: string; // Date/time when added
  movies: Movie; // Nested movie data
};

// represents a user's review for a movie
export type UserReviews = {
  id: number; // Unique review ID
  user_id: string; // User ID
  movie_id: number; // Movie ID
  created_at: string; // Date/time of review
  review?: string; // Optional review text
  rating: number; // Rating given by the user
  movies: Movie; // Nested movie data
};

// represents the latest review including movie and user profile info
export type LatestReview = {
  id: string; // Review ID
  review: string; // Review text
  rating: number; // Rating
  created_at: string; // Date/time of review
  movies: {
    // Nested movie info
    id: string;
    title: string;
    poster_path: string;
    release_date: string;
  };
  profiles: {
    // Nested user profile info
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
};
