import type { Movie, Person } from "../../lib/types";
import LargePoster from "../poster/LargePoster";
import MediumPoster from "../poster/MediumPoster";

type PersonInfoProps = {
  person: Person;
  person_credits?: Movie[] | null;
};

export default function PersonInfo({
  person,
  person_credits,
}: PersonInfoProps) {
  return (
    <div className="mt-10 flex justify-between animate-fade-in">
      {/* person name and credits */}
      <div className="w-[670px]">
        <div className="">
          <div className="uppercase text-sm">Films Starring</div>
          <div className="text-2xl uppercase font-black tracking-wide text-green-200/95">
            {person.name}
          </div>
          <hr className="opacity-20 my-1" />
        </div>

        <div className="mt-2 grid grid-cols-5 justify-items-end">
          {person_credits &&
            person_credits.map((movie, idx) => (
              <MediumPoster
                key={idx}
                title={movie.title}
                image_url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                link={`/movie/${movie.id}`}
                release_date={movie.release_date}
              />
            ))}
        </div>
      </div>

      {/* person picture and person biography */}
      <div className="w-[230px] space-y-2">
        {/* person picture */}
        <LargePoster
          title={person.name}
          image_url={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
        />

        {/* biography */}
        <div>
          <h1 className="text-sm ">{person.biography}</h1>
        </div>
      </div>
    </div>
  );
}
