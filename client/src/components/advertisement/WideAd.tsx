import { FaLink } from "react-icons/fa";

export default function WideAd() {
  return (
    <a href="https://vigneshvenkatesh.com" target="_blank">
      <div className="font-google flex justify-between items-end relative p-4 my-4 bg-base-300 shadow-md rounded h-[100px] overflow-hidden opacity-70 hover:opacity-100 transition-opacity duration-400">
        <div>
          <h1 className="text-lg">Check out my Portfolio!</h1>
          <h1 className="text-4xl font-black">vigneshvenkatesh.com</h1>
        </div>
        <FaLink className="text-[150px] absolute top-1 -right-2" />
      </div>
    </a>
  );
}
