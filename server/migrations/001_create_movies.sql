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
