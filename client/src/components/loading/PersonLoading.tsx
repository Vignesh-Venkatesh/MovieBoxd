import LoadingList from "./LoadingList";

export default function PersonLoading() {
  return (
    <div className="mt-10 flex justify-between">
      {/* Left side: person name and credits skeleton */}
      <div className="w-[670px]">
        <div className="space-y-2">
          {/* Person name skeleton */}
          <div className="skeleton w-40 h-5 rounded"></div>
          {/* Person subtitle or additional info skeleton */}
          <div className="skeleton w-40 h-10 rounded"></div>
        </div>

        {/* Credits skeleton grid */}
        <div className="mt-10">
          <LoadingList
            quantity={15} // total number of skeleton items
            width="w-[125px]" // width of each skeleton
            height="h-[187.5px]" // height of each skeleton
            cols={5} // number of columns in grid
            rows={3} // number of rows in grid
          />
        </div>
      </div>

      {/* Right side: person picture and biography skeleton */}
      <div className="w-[230px] space-y-2">
        {/* Person picture skeleton */}
        <div className="skeleton h-[345px]"></div>

        {/* Biography skeleton lines */}
        <div className="skeleton w-3/4  h-[20px] rounded"></div>
        <div className="skeleton w-6/7  h-[20px] rounded"></div>
        <div className="skeleton w-full h-[20px] rounded"></div>
        <div className="skeleton w-3/4  h-[20px] rounded"></div>
        <div></div>
      </div>
    </div>
  );
}
