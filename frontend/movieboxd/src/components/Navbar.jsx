import { Avatar } from "@mantine/core";

const name = "John Doe";

export default function Navbar() {
  return (
    <div className="text-slate-100 bg-zinc-950 h-16 flex justify-center ">
      <div className="w-[1000px] flex items-center">
        <h1 className="text-2xl font-bold w-1/4 flex justify-start">
          <span className="text-orange-400">Movie</span>
          <span className="text-slate-300">Boxd</span>
        </h1>
        {/* Buttons */}
        <div className="flex w-1/2"></div>
        <div className="flex w-1/2 justify-between items-center">
          <h1 className="uppercase font-bold text-slate-400 hover:cursor-pointer hover:text-orange-400 ">
            Home
          </h1>
          <h1 className="uppercase font-bold text-slate-400 hover:cursor-pointer hover:text-orange-400 ">
            Watchlist
          </h1>
          <h1 className="uppercase font-bold text-slate-400 hover:cursor-pointer hover:text-orange-400">
            Favorites
          </h1>
          <Avatar
            key={name}
            name={name}
            color="initials"
            className="hover:cursor-pointer"
          ></Avatar>
        </div>
      </div>
    </div>
  );
}
