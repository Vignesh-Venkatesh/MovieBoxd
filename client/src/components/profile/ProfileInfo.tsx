import type {
  User,
  UserFavorited,
  UserReviews,
  UserStats,
  UserWatched,
  UserWatchlist,
} from "../../lib/types";
import Avatar from "../misc/Avatar";
import SquareSmallAd from "../advertisement/SquareSmallAd";
import Title from "../misc/Title";
import SmallPoster from "../poster/SmallPoster";
import ReviewBox from "../reviews/ReviewBox";

type UserInfoProps = {
  user: User; // main user object
  stats?: UserStats | null; // user statistics (watched, favorited, etc.)
  watched?: UserWatched[] | null; // list of recently watched movies
  favorites?: UserFavorited[] | null; // list of recently favorited movies
  watchlisted?: UserWatchlist[] | null; // list of movies in watchlist
  reviews?: UserReviews[] | null; // list of user reviews
};

export default function ProfileInfo({
  user,
  stats,
  watched,
  favorites,
  watchlisted,
  reviews,
}: UserInfoProps) {
  return (
    <div className="font-google space-y-5">
      {/* Header Section: Avatar, username, join date, user stats */}
      <div className="flex justify-between items-center mt-10">
        {/* Avatar and Username */}
        <div className="flex items-center gap-5">
          {/* Avatar component */}
          <Avatar
            src={user.avatar_url}
            username={user.display_name}
            size="w-20 h-20" // custom width/height
          />

          {/* Username and join date */}
          <div className="">
            <h1 className="text-xl font-bold">{user.display_name}</h1>
            {user.created_at && (
              <h1 className="text-sm italic font-thin">
                Joined on:{" "}
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </h1>
            )}
          </div>
        </div>

        {/* User Stats Section */}
        <div className="flex">
          {/* Watched movies */}
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-4xl">{stats?.watched}</h1>
            <h1 className="font-thin uppercase text-sm">Watched</h1>
          </div>

          {/* Divider */}
          <div className="divider divider-horizontal"></div>

          {/* Favorited movies */}
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-4xl">{stats?.favorites}</h1>
            <h1 className="font-thin uppercase text-sm">Favorited</h1>
          </div>

          {/* Divider */}
          <div className="divider divider-horizontal"></div>

          {/* Watchlisted movies */}
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-4xl">{stats?.watchlist}</h1>
            <h1 className="font-thin uppercase text-sm">Watchlisted</h1>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      {user.bio && (
        <div className="bg-base-200 p-2 shadow-lg font-semibold rounded border-l-8 border-green-500 text-sm">
          <h1>
            {"> "}
            {user.bio}
          </h1>
        </div>
      )}

      {/* Main Content: Recently watched/favorited/watchlisted movies and reviews */}
      <div className="flex justify-between">
        {/* Left Column: Movie Lists and Reviews */}
        <div className="w-[630px] space-y-5">
          {/* Recently Watched Films */}
          <div>
            <Title
              title="recently watched films"
              link={`/user/${user.display_name}/watched`}
            />
            {watched && watched.length > 0 ? (
              <div className="grid grid-cols-9 justify-items-end">
                {watched.map((watch, idx) => (
                  <SmallPoster
                    key={idx}
                    title={watch.movies.title}
                    image_url={`https://image.tmdb.org/t/p/w500${watch.movies.poster_path}`}
                    link={`/movie/${watch.movies.id}`}
                    release_date={watch.movies.release_date}
                  />
                ))}
              </div>
            ) : (
              <div className="h-[105px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
                <p>No movies watched yet.</p>
              </div>
            )}
          </div>

          {/* Recently Favorited Films */}
          <div>
            <Title
              title="recently favorited films"
              link={`/user/${user.display_name}/favorites`}
            />
            {favorites && favorites.length > 0 ? (
              <div className="grid grid-cols-9 justify-items-end">
                {favorites.map((favorite, idx) => (
                  <SmallPoster
                    key={idx}
                    title={favorite.movies.title}
                    image_url={`https://image.tmdb.org/t/p/w500${favorite.movies.poster_path}`}
                    link={`/movie/${favorite.movies.id}`}
                    release_date={favorite.movies.release_date}
                  />
                ))}
              </div>
            ) : (
              <div className="h-[105px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
                <p>No movies favorited yet.</p>
              </div>
            )}
          </div>

          {/* Recently Watchlisted Films */}
          <div>
            <Title
              title="recently watchlisted films"
              link={`/user/${user.display_name}/watchlist`}
            />
            {watchlisted && watchlisted.length > 0 ? (
              <div className="grid grid-cols-9 justify-items-end">
                {watchlisted.map((watchlist, idx) => (
                  <SmallPoster
                    key={idx}
                    title={watchlist.movies.title}
                    image_url={`https://image.tmdb.org/t/p/w500${watchlist.movies.poster_path}`}
                    link={`/movie/${watchlist.movies.id}`}
                    release_date={watchlist.movies.release_date}
                  />
                ))}
              </div>
            ) : (
              <div className="h-[105px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
                <p>No movies watchlisted yet.</p>
              </div>
            )}
          </div>

          {/* Recently Reviewed Films */}
          <div className="w-full">
            <Title
              title="recently reviewed films"
              link={`/user/${user.display_name}/reviews`}
            />
            <div className="mt-2">
              {reviews && reviews.length > 0 ? (
                <div className="space-y-2">
                  {reviews.slice(0, 5).map((review, idx) => (
                    <ReviewBox key={idx} user={user} review={review} />
                  ))}
                </div>
              ) : (
                <div className="h-[105px] w-full flex items-center justify-center bg-base-200 rounded mt-2">
                  <p>No movies reviewed yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Films Reviewed Count and Advertisement */}
        <div className="w-[230px] space-y-5">
          {/* Films Reviewed Stats */}
          <div className="w-[230px] h-[130px] flex justify-center items-center flex-col shadow-lg bg-base-200 hover:bg-base-300 rounded transition-colors duration-300">
            <h1 className="font-bold text-5xl">{stats?.reviews}</h1>
            <h1 className="font-thin uppercase text-sm">Films</h1>
            <h1 className="font-thin uppercase text-sm">Reviewed</h1>
          </div>

          {/* Advertisement Component */}
          <SquareSmallAd />

          {/* Placeholder skeletons for potential loading state (commented out) */}
          {/* <div>
            <div className="skeleton h-3 rounded"></div>
            <LoadingList quantity={5} width="w-[70px]" height="h-[105px]" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
