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
  user: User;
  stats?: UserStats | null;
  watched?: UserWatched[] | null;
  favorites?: UserFavorited[] | null;
  watchlisted?: UserWatchlist[] | null;
  reviews?: UserReviews[] | null;
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
      <div className="flex justify-between items-center mt-10">
        {/* avatar, username and joined */}
        <div className="flex items-center gap-5">
          {/* avatar */}
          <Avatar
            src={user.avatar_url}
            username={user.display_name}
            size="w-20 h-20"
          />

          {/* username and date joined */}
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

        {/* films watched, films favorited, films watchlisted */}
        <div className="flex">
          {/* films watched */}
          <div className="space-y-2 text-center">
            {/* number */}
            <h1 className="font-bold text-4xl">{stats?.watched}</h1>
            {/* watched */}
            <h1 className="font-thin uppercase text-sm">Watched</h1>
          </div>

          {/* divider */}
          <div className="divider divider-horizontal"></div>

          {/* films favorited */}
          <div className="space-y-2 text-center">
            <div className="space-y-2">
              {/* number */}
              <h1 className="font-bold text-4xl">{stats?.favorites}</h1>
              {/* favorited */}
              <h1 className="font-thin uppercase text-sm">Favorited</h1>
            </div>
          </div>

          {/* divider */}
          <div className="divider divider-horizontal"></div>

          {/* films watchlisted */}
          <div className="space-y-2 text-center">
            {/* number */}
            <h1 className="font-bold text-4xl">{stats?.watchlist}</h1>
            {/* watchlisted */}
            <h1 className="font-thin uppercase text-sm">Watchlisted</h1>
          </div>
        </div>
      </div>

      {/* bio */}
      {user.bio && (
        <div className="bg-base-200 p-2 shadow-lg font-semibold rounded border-l-8 border-green-500 text-sm">
          <h1>
            {"> "}
            {user.bio}
          </h1>
        </div>
      )}

      <div className="flex justify-between">
        <div className="w-[630px] space-y-5">
          {/* recently watched films */}
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

          {/* recently favorited films */}
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

          {/* recently watchlisted films */}
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

          {/* latest reviews */}
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

        <div className="w-[230px] space-y-5">
          {/* films reviewed */}
          <div className="w-[230px] h-[130px] flex justify-center items-center flex-col shadow-lg bg-base-200 hover:bg-base-300 rounded transition-colors duration-300">
            {/* number */}
            <h1 className="font-bold text-5xl">{stats?.reviews}</h1>
            {/* favorited */}
            <h1 className="font-thin uppercase text-sm">Films</h1>
            <h1 className="font-thin uppercase text-sm">Reviewed</h1>
          </div>

          <SquareSmallAd />

          {/* <div>
            <div className="skeleton h-3 rounded"></div>
            <LoadingList quantity={5} width="w-[70px]" height="h-[105px]" />
          </div>

          <div>
            <div className="skeleton h-3 rounded"></div>
            <LoadingList quantity={5} width="w-[70px]" height="h-[105px]" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
