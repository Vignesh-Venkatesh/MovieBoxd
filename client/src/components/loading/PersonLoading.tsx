import LoadingList from "./LoadingList";

export default function PersonLoading() {
  return (
    <div className="mt-10 flex justify-between">
      {/* person name and credits */}
      <div className="w-[670px]">
        <div className="space-y-2">
          <div className="skeleton w-40 h-5 rounded"></div>
          <div className="skeleton w-40 h-10 rounded"></div>
        </div>

        <div className="mt-10">
          <LoadingList
            quantity={15}
            width="w-[125px]"
            height="h-[187.5px]"
            cols={5}
            rows={3}
          />
        </div>
      </div>

      {/* person picture and person biography */}
      <div className="w-[230px] space-y-2">
        {/* person picture */}
        <div className="skeleton h-[345px]"></div>

        {/* biography */}
        <div className="skeleton w-3/4  h-[20px] rounded"></div>
        <div className="skeleton w-6/7  h-[20px] rounded"></div>
        <div className="skeleton w-full h-[20px] rounded"></div>
        <div className="skeleton w-3/4  h-[20px] rounded"></div>
        <div></div>
      </div>
    </div>
  );
}
