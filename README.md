# MovieBoxd

MovieBoxd is a web application for discovering, tracking, and reviewing movies. Users can explore now playing, popular, and similar movies, as well as create an account to manage watched, favorited, and watchlisted movies. It also provides an interactive community for sharing movie reviews. This project was inspired by [LetterBoxd](https://letterboxd.com).

## Features

- **User Accounts:** Register and manage personal profiles with avatars and bios.
- **Movie Discovery:** Browse Now Playing, Popular, Upcoming, and Developer Picks movies.
- **Movie Details:** Detailed pages with movie info, cast, reviews, ratings, and similar movies.
- **Reviews:** Write, edit, and delete movie reviews with star ratings.
- **Favorites & Watchlist:** Keep track of favorite movies and movies you want to watch.
- **Toaster Notifications:** Informative user feedback for actions like adding reviews or errors.

## Tech Stack

- **Frontend:**

  - React + TypeScript
  - React Router for navigation
  - TailwindCSS + DaisyUI for styling
  - React Icons for icons

- **Backend:**

  - Hono + Express (assumed from API endpoints)
  - REST API for fetching movies, reviews, and user data
  - Using the Bun runtime

- **APIs & Data:**

  - TMDB API for movie data
  - Custom backend API

- **Other Tools:**
  - Axios for HTTP requests
  - Vite for fast frontend bundling

## Installation

> _In my case, I have used the `Bun` runtime._ > _If you are using Node, just replace it with `node` or `npm` respectively._

1. Clone the repository:

```bash
git clone https://github.com/Vignesh-Venkatesh/movieboxd.git
cd movieboxd
```

2. Install dependencies:

```bash
bun install
```

3. Add environment variables in a `.env` file:

```bash
# frontend env variables
VITE_BACKEND_URL=''
VITE_TMDB_API_KEY=''

# backend env variables
PORT=
TMDB_API_KEY=''
DATABASE_URL=''
FRONTEND_URL=''
SUPABASE_URL=''
SUPABASE_ANON_KEY=''
SUPABASE_SERVICE_ROLE_KEY=''
ENVIRONMENT="development" # optional
```

4. Run the development server:

```bash
bun run dev
```

5. Open the app in the browser:

```bash
http://localhost:5173 # Note: PORT number may differ in your case.
```

## Usage

- Navigate to the homepage to explore popular, upcoming, and dev-picked movies.
- Click a movie poster to view its details, cast, and reviews.
- Log in or create an account to write reviews, track watched movies, add favorites, and maintain a watchlist.

<!-- ## Screenshots -->

## Demo

You can try the live demo here: [MovieBoxd](https://movieboxd.vigneshvenkatesh.com)

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a pull request.
