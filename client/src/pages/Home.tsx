import Navbar from "../components/Navbar";
import PopularMovies from "../components/movies/PopularMovies";
import WideAd from "../components/advertisement/WideAd";
import NowPlaying from "../components/movies/NowPlaying";
import SquareSmallAd from "../components/advertisement/SquareSmallAd";

export default function Home() {
  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      <Navbar />
      <div className="h-10"></div>
      <PopularMovies />
      <WideAd />
      <NowPlaying />
      <div className="h-10"></div>

      <div className="flex justify-between">
        {/* left side - latest reviews */}
        <div className="w-[630px]"></div>

        {/* right side - Ad, dev picks, recently joined members */}
        <div className="w-[230px]">
          <SquareSmallAd />
        </div>
      </div>
    </div>
  );
}
