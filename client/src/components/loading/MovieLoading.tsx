import LoadingList from "./LoadingList";

export default function MovieLoading() {
  return (
    <div className="">
      {/* Backdrop image skeleton */}
      <div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1200px] h-[500px] skeleton rounded-none"></div>
      </div>

      <div className="mt-100">
        <div className="flex justify-between px-4">
          {/* Poster skeleton */}
          <div className="skeleton w-[230px] h-[345px] shadow-xl"></div>

          {/* Title, overview, cast, reviews, actions skeleton */}
          <div className="space-y-2">
            {/* Title skeleton */}
            <div className="skeleton w-[670px] h-[40px] rounded-none shadow-xl"></div>

            <div className="flex justify-between">
              {/* Overview, reviews, cast skeleton */}
              <div className="w-[430px] space-y-10">
                {/* Overview skeleton lines */}
                <div className="space-y-2">
                  <div className="skeleton h-[20px] w-full rounded shadow-xl"></div>
                  <div className="skeleton h-[20px] w-3/4  rounded shadow-xl"></div>
                  <div className="skeleton h-[20px] w-2/3  rounded shadow-xl"></div>
                  <div className="skeleton h-[20px] w-4/7  rounded shadow-xl"></div>
                  <div className="skeleton h-[20px] w-full rounded shadow-xl"></div>
                  <div className="skeleton h-[20px] w-3/4  rounded shadow-xl"></div>
                  <div className="skeleton h-[20px] w-1/2  rounded shadow-xl"></div>
                </div>

                {/* Cast skeleton */}
                <div className="mt-2">
                  <div className="skeleton w-[100px] h-[20px] rounded"></div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* Individual cast member skeletons */}
                    <div className="skeleton w-[50px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[70px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[100px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[80px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[90px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[95px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[55px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[60px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[50px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[70px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[100px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[80px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[90px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[95px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[55px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[60px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[50px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[70px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[100px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[80px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[90px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[95px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[55px] h-[20px] rounded shadow-xl"></div>
                    <div className="skeleton w-[60px] h-[20px] rounded shadow-xl"></div>
                  </div>
                </div>

                {/* Reviews skeleton */}
                <div className="mt-2 space-y-2">
                  <div className="skeleton w-full h-[20px] rounded shadow-xl"></div>
                  <div className="skeleton h-20 w-full rounded shadow-xl"></div>
                  <div className="skeleton h-20 w-full rounded shadow-xl"></div>
                  <div className="skeleton h-20 w-full rounded shadow-xl"></div>
                  <div className="skeleton h-20 w-full rounded shadow-xl"></div>
                </div>
              </div>

              {/* Actions skeleton */}
              <div>
                <div className="skeleton w-[230px] h-[200px] rounded shadow-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar movies skeleton */}
        <div className="mt-10">
          <div className="skeleton w-full h-[20px] rounded shadow-xl"></div>
          {/* LoadingList component for similar movies */}
          <LoadingList
            quantity={12}
            width="w-[70px]"
            height="h-[105px]"
            cols={12}
            rows={1}
          />
        </div>
      </div>
    </div>
  );
}
