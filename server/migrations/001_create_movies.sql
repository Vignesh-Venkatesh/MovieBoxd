-- creating the movies table
CREATE TABLE IF NOT EXISTS movies (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  overview TEXT,
  poster_path TEXT,
  backdrop_path TEXT,
  release_date DATE,
  runtime TEXT
);

-- creating the profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- creating dev_picks table with foreign key reference
CREATE TABLE IF NOT EXISTS dev_picks (
  tmdb_id BIGINT PRIMARY KEY,
  CONSTRAINT fk_dev_picks_movies FOREIGN KEY (tmdb_id) REFERENCES movies (id) ON DELETE CASCADE
);

-- returns a random movie
CREATE OR REPLACE FUNCTION public.get_random_movie()
RETURNS TABLE (
  id BIGINT,
  title TEXT,
  overview TEXT,
  poster_path TEXT,
  backdrop_path TEXT,
  release_date DATE,
  runtime TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT *
  FROM public.movies
  ORDER BY random()
  LIMIT 1;
$$;


-- watchlist
CREATE TABLE IF NOT EXISTS watchlist (
    id BIGSERIAL PRIMARY KEY,
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, movie_id)
);


-- watched
CREATE TABLE IF NOT EXISTS watched (
    id BIGSERIAL PRIMARY KEY,
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, movie_id)
);

-- favorites
CREATE TABLE IF NOT EXISTS favorites (
    id BIGSERIAL PRIMARY KEY,
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, movie_id)
);


-- reviews
CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id),
    review TEXT,  
    rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMP DEFAULT NOW()
);


-- review likes
CREATE TABLE IF NOT EXISTS review_likes (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(review_id, user_id) -- user can only like once
);

-- returning user stats (watched, favorites, watchlist, reviews)
CREATE OR REPLACE FUNCTION public.get_user_stats(username text)
RETURNS TABLE (
  watched int,
  favorites int,
  watchlist int,
  reviews int
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT
    (SELECT count(*)::int
     FROM public.watched w
     JOIN public.profiles p ON w.user_id = p.id
     WHERE p.display_name = get_user_stats.username) AS watched,

    (SELECT count(*)::int
     FROM public.favorites f
     JOIN public.profiles p ON f.user_id = p.id
     WHERE p.display_name = get_user_stats.username) AS favorites,

    (SELECT count(*)::int
     FROM public.watchlist wl
     JOIN public.profiles p ON wl.user_id = p.id
     WHERE p.display_name = get_user_stats.username) AS watchlist,

    (SELECT count(*)::int
     FROM public.reviews r
     JOIN public.profiles p ON r.user_id = p.id
     WHERE p.display_name = get_user_stats.username) AS reviews;
$$;
