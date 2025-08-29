import type { User } from "../../lib/types";
import Avatar from "../misc/Avatar";

type UserInfoProps = {
  user: User;
};

export default function ProfileInfo({ user }: UserInfoProps) {
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
          <div className="space-y-2">
            {/* number */}
            <div className="skeleton w-20 h-20 rounded"></div>
            {/* watched */}
            <div className="skeleton w-20 h-5 rounded"></div>
          </div>

          {/* divider */}
          <div className="divider divider-horizontal"></div>

          {/* films favorited */}
          <div className="space-y-2">
            {/* number */}
            <div className="skeleton w-20 h-20 rounded"></div>
            {/* favorited */}
            <div className="skeleton w-20 h-5 rounded"></div>
          </div>

          {/* divider */}
          <div className="divider divider-horizontal"></div>

          {/* films watchlisted */}
          <div className="space-y-2">
            {/* number */}
            <div className="skeleton w-20 h-20 rounded"></div>
            {/* watchlisted */}
            <div className="skeleton w-20 h-5 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
