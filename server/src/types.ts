// type definition for a Movie object
export type Movie = {
  id: number; // Unique identifier for the movie
  title: string; // Movie title
  overview?: string; // Optional brief description of the movie
  poster_path?: string; // Optional path to the movie poster image
  backdrop_path?: string; // Optional path to the backdrop image
  release_date: string; // Release date of the movie
  runtime?: number; // Optional runtime in minutes
  genres?: string[]; // Optional list of genres

  // optional user-specific status for the movie
  userStatus?: {
    watched: boolean; // Whether the user has marked it as watched
    watchlisted: boolean; // Whether the user has added it to their watchlist
    favorited: boolean; // Whether the user has favorited the movie
    reviewId?: number; // Optional ID of the user's review if it exists
  };
};
