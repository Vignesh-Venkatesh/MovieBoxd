import { FaGithub } from "react-icons/fa";

export default function SquareSmallAd() {
  return (
    <a href="https://github.com/Vignesh-Venkatesh/MovieBoxd" target="_blank">
      <div className="mb-5 w-[230px] h-[230px] bg-base-300 rounded font-google shadow-md p-4 opacity-70 hover:opacity-100 transition-opacity duration-400 cursor-pointer relative flex flex-col justify-end">
        <h1 className="text-lg">Check out</h1>
        <h1 className="text-3xl font-bold">MovieBoxd's</h1>
        <h1 className="text-lg">GitHub Repository</h1>
        <FaGithub className="text-9xl absolute top-2 right-2 opacity-80" />
      </div>
    </a>
  );
}
