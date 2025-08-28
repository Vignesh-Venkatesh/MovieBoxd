import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="h-50 bg-neutral/80 font-google">
      <div className="w-[950px] mx-auto h-full flex justify-around items-center">
        <div className="text-start space-y-2 text-sm">
          <h1 className="opacity-70 hover:opacity-100 transition-opacity duration-300 text-lg">
            Made with 💚 by Vignesh.
          </h1>
          <h1 className="opacity-70 hover:opacity-100 transition-opacity duration-300">
            Check out the{" "}
            <a
              href="https://github.com/Vignesh-Venkatesh/MovieBoxd"
              target="_blank"
              className="hover:underline underline-offset-4 hover:font-bold transition-colors duration-200 cursor-pointer"
            >
              MovieBoxd GitHub Repository
            </a>
          </h1>
          <h1 className="opacity-70 hover:opacity-100 transition-opacity duration-300">
            Movie data sourced from{" "}
            <a
              href="https://www.themoviedb.org/?language=en-US"
              target="_blank"
              className="hover:underline underline-offset-4 hover:font-bold transition-colors duration-200 cursor-pointer"
            >
              TMDb
            </a>
          </h1>
        </div>

        <div className="flex flex-col space-y-4">
          <a href="https://github.com/Vignesh-Venkatesh">
            <button className="btn btn-base-300 tooltip tooltip-right">
              <h1 className="tooltip-content">GitHub</h1>
              <FaGithub className="text-lg" />
            </button>
          </a>
          <a href="https://linkedin.com/in/vignesh-2k3">
            <button className="btn btn-base-300 tooltip tooltip-right">
              <h1 className="tooltip-content">LinkedIn</h1>
              <FaLinkedinIn className="text-lg" />
            </button>
          </a>
        </div>
      </div>
    </footer>
  );
}
