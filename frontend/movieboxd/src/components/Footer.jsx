export default function Footer() {
  return (
    <div className="bg-zinc-700 mt-32 h-20 flex justify-around items-center">
      <div className="w-[900px] flex justify-around items-center">
        <div className="flex flex-col justify-start">
          <h1 className="text-sm mb-2 text-zinc-400">
            Check out the source code{" "}
            <a
              href="https://github.com/Vignesh-Venkatesh/MovieBoxd"
              target="_blank"
            >
              <span className="text-zinc-500 hover:text-orange-400 hover:font-bold ">
                here
              </span>
            </a>
            !
          </h1>
        </div>
        <h1 className="text-xs text-zinc-400">
          Film Data from{" "}
          <a href="https://www.themoviedb.org" target="_blank">
            <span className="text-zinc-500 hover:text-orange-400 hover:font-bold ">
              TMDb
            </span>
          </a>
        </h1>
      </div>
    </div>
  );
}
