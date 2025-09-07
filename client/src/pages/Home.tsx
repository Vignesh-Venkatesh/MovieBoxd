import Navbar from "../components/Navbar";
import PopularMovies from "../components/movies/PopularMovies";
import WideAd from "../components/advertisement/WideAd";
import NowPlaying from "../components/movies/NowPlaying";
import SquareSmallAd from "../components/advertisement/SquareSmallAd";
import DevPicks from "../components/misc/DevPicks";
import LatestReviews from "../components/reviews/LatestReviews";
import LatestUsers from "../components/latest/LatestUsers";

export default function Home() {
  // setting the document title when the Home component mounts
  document.title = "MovieBoxd";

  return (
    <div className="min-h-screen w-[950px] mx-auto font-google">
      {/* Top navigation */}
      <Navbar />
      {/* Spacer */}
      <div className="h-10"></div>
      {/* Main movie sections */}
      <PopularMovies /> {/* Display popular movies */}
      <WideAd /> {/* Wide advertisement */}
      <NowPlaying /> {/* Currently playing movies */}
      {/* Spacer */}
      <div className="h-10"></div>
      {/* Main content section with left and right columns */}
      <div className="flex justify-between">
        {/* Left side column: Latest reviews */}
        <div className="w-[630px]">
          <LatestReviews />
        </div>

        {/* Right side column: Ads, dev picks, latest users */}
        <div className="w-[230px]">
          <SquareSmallAd /> {/* Small ad */}
          <LatestUsers /> {/* Recently joined users */}
          <DevPicks /> {/* Developer picks */}
        </div>
      </div>
    </div>
  );
}
