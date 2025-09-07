import LoadingList from "./LoadingList";

export default function ProfileLoading() {
  return (
    <div className="space-y-5">
      {/* Top section: avatar, username, joined date and stats */}
      <div className="flex justify-between items-center mt-10">
        {/* Left: avatar, username and date joined */}
        <div className="flex items-center gap-5">
          {/* Avatar skeleton */}
          <div className="skeleton rounded-full w-20 h-20"></div>

          {/* Username and date joined skeletons */}
          <div className="space-y-2">
            <div className="skeleton rounded w-[230px] h-5"></div>
            <div className="skeleton rounded w-[150px] h-5"></div>
          </div>
        </div>

        {/* Right: films watched, favorited, watchlisted */}
        <div className="flex">
          {/* Films watched */}
          <div className="space-y-2">
            <div className="skeleton w-20 h-20 rounded"></div> {/* Number */}
            <div className="skeleton w-20 h-5 rounded"></div> {/* Label */}
          </div>

          <div className="divider divider-horizontal"></div>

          {/* Films favorited */}
          <div className="space-y-2">
            <div className="skeleton w-20 h-20 rounded"></div>
            <div className="skeleton w-20 h-5 rounded"></div>
          </div>

          <div className="divider divider-horizontal"></div>

          {/* Films watchlisted */}
          <div className="space-y-2">
            <div className="skeleton w-20 h-20 rounded"></div>
            <div className="skeleton w-20 h-5 rounded"></div>
          </div>
        </div>
      </div>

      {/* Bio skeleton */}
      <div className="skeleton h-15 rounded"></div>

      {/* Main content section */}
      <div className="flex justify-between">
        {/* Left: user's films and reviews */}
        <div className="w-[630px] space-y-8">
          {/* Recently watched films */}
          <div className="w-full">
            <div className="skeleton h-3 rounded"></div> {/* Section title */}
            <LoadingList
              quantity={4}
              cols={4}
              rows={1}
              width="w-[150px]"
              height="h-[225px]"
            />
          </div>

          {/* Recently watchlisted films */}
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

          {/* Recently favorited films */}
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

          {/* Latest reviews */}
          <div className="w-full">
            <div className="skeleton h-3 rounded"></div> {/* Section title */}
            <LoadingList quantity={1} width="w-[630px]" height="h-[170px]" />
            <LoadingList quantity={1} width="w-[630px]" height="h-[170px]" />
            <LoadingList quantity={1} width="w-[630px]" height="h-[170px]" />
          </div>
        </div>

        {/* Right: sidebar content */}
        <div className="w-[250px] space-y-5">
          {/* Large skeleton box, e.g., featured image */}
          <div className="skeleton w-[250px] h-[250px] rounded"></div>

          {/* Additional lists */}
          <div>
            <div className="skeleton h-3 rounded"></div> {/* Section title */}
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
