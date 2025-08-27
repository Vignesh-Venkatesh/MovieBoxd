# MovieBoxd

### Planned API Routes

#### Movies

- `GET /api/movies/:id`
  Fetch detailed information about a single movie (title, synopsis, release date, genres, poster, etc.).

  ```json
  Example Response:
  {
    "id": 123,
    "title": "XYZ",
    "release_date": "2010-07-16",
    "userStatus": {
      "watched": true,
      "watchlisted": false,
      "favorited": true,
      "reviewId": 789,
      "rating": 4.5
    }
  }
  ```

- `GET /api/movies/:id/credits`
  Get cast and crew information for a specific movie.

- `GET /api/movies/now-playing`
  Retrieve a list of movies currently in theaters.

- `GET /api/movies/popular`
  Get a list of trending/popular movies based on activity or API data.

- `GET /api/movies/upcoming`
  Fetch a list of movies that are scheduled for future release.

- `GET /api/movies/search?movie=`
  Search for movies by title (query parameter).

- `GET /api/movies/:movieId/reviews`
  Fetch all reviews written for a given movie.

- `GET /api/movies/:id/similar`
  Retrieve movies that are similar to the given movie (based on genre, cast, etc.).

- `GET /api/movies/:id/recommendations`
  Get personalized or algorithmic recommendations related to a specific movie.

- `GET /api/movies/random`
  Returns a completely random movie. Can use for “Surprise Me” feature.

#### Users

- `GET /api/users/:id`
  Fetch a user’s profile (username, bio, avatar, stats).

- `GET /api/users/recent`
  Fetch a list of the most recently registered users.

- `GET /api/users/:id/watched`
  Get the list of movies the user has marked as watched.

- `GET /api/users/:id/watchlist`
  Fetch the movies the user has saved to their watchlist.

- `GET /api/users/:id/favorites`
  Retrieve a user’s favorite movies.

- `GET /api/users/:userId/reviews`
  Get all reviews written by a specific user.

- `POST /api/users/:id/watched/:movieId`
  mark as watched

- `DELETE /api/users/:id/watched/:movieId`
  unmark as watched

- `POST /api/users/:id/watchlist/:movieId`
  mark as watchlist

- `DELETE /api/users/:id/watchlist/:movieId`
  unmark as watchlist

- `POST /api/users/:id/favorites/:movieId`
  mark as favorites

- `DELETE /api/users/:id/favorites/:movieId`
  unmark as favorites

#### Reviews

- `GET /api/reviews/:id`
  Fetch details of a single review (review text, rating, likes, etc.).

- `GET /api/movies/:movieId/reviews/:userId`
  Retrieve the review written by a specific user for a specific movie.

- `POST /api/movies/:movieId/reviews`
  Create a new review for a movie (requires authentication).

- `PUT /api/reviews/:id`
  Update an existing review (only allowed if the user owns it).

- `DELETE /api/reviews/:id`
  Delete a review (only allowed if the user owns it).

---

> [References used for the project]
>
> [Letterboxd](https://letterboxd.com)
>
> [Better Auth - Syntax](https://www.youtube.com/watch?v=_OApmLmex14)
>
> [Docker Tutorial - Syntax](https://www.youtube.com/watch?v=RHjXPN_h1YA)
