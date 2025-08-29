import LoadingList from "./LoadingList";

export default function ProfileLoading() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center mt-10">
        {/* avatar, username and joined */}
        <div className="flex items-center gap-5">
          {/* avatar */}
          <div className="skeleton rounded-full w-20 h-20"></div>

          {/* username and date joined */}
          <div className="space-y-2">
            <div className="skeleton rounded w-[230px] h-5"></div>
            <div className="skeleton rounded w-[150px] h-5"></div>
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

      {/* bio */}
      <div className="skeleton h-15 rounded"></div>

      <div className="flex justify-between">
        <div className="w-[630px] space-y-8">
          {/* recently watched films */}
          <div className="w-full">
            <div className="skeleton h-3 rounded"></div>
            <LoadingList
              quantity={4}
              cols={4}
              rows={1}
              width="w-[150px]"
              height="h-[225px]"
            />
          </div>

          {/* recently watchlisted films */}
          <div className="w-full">
            <div className="skeleton h-3 rounded"></div>
            <LoadingList
              quantity={8}
              cols={8}
              rows={1}
              width="w-[70px]"
              height="h-[105px]"
            />
          </div>

          {/* recently favorited films */}
          <div className="w-full">
            <div className="skeleton h-3 rounded"></div>
            <LoadingList
              quantity={8}
              cols={8}
              rows={1}
              width="w-[70px]"
              height="h-[105px]"
            />
          </div>

          {/* latest reviews */}
          <div className="w-full">
            <div className="skeleton h-3 rounded"></div>
            <LoadingList quantity={1} width="w-[630px]" height="h-[170px]" />
            <LoadingList quantity={1} width="w-[630px]" height="h-[170px]" />
            <LoadingList quantity={1} width="w-[630px]" height="h-[170px]" />
          </div>
        </div>

        <div className="w-[250px] space-y-5">
          <div className="skeleton w-[250px] h-[250px] rounded"></div>

          <div>
            <div className="skeleton h-3 rounded"></div>
            <LoadingList quantity={5} width="w-[70px]" height="h-[105px]" />
          </div>

          <div>
            <div className="skeleton h-3 rounded"></div>
            <LoadingList quantity={5} width="w-[70px]" height="h-[105px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
