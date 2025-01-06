export default function Footer() {
  return (
    <div className="bg-zinc-700 mt-8 h-16 flex justify-around items-center">
      <div className="w-[900px] flex justify-around items-center">
        <div className="flex flex-col justify-start">
          <h1 className="font-bold text-sm mb-2 text-zinc-400">
            Check out the source code{" "}
            <a
              href="https://github.com/Vignesh-Venkatesh/MovieBoxd"
              target="_blank"
            >
              <span className="text-zinc-500 hover:text-zinc-400">here</span>
            </a>
            !
          </h1>
        </div>
        <h1 className="text-zinc-400 text-xs">Film Data from TMDb</h1>
      </div>
    </div>
  );
}
