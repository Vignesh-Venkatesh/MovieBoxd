import type { Cast } from "../../lib/types";
import Title from "../misc/Title";
import { Link } from "react-router-dom";

type CastListProps = {
  cast: Cast[];
};

export default function CastList({ cast }: CastListProps) {
  // if cast is [], then we dont render anything
  if (!cast || cast.length === 0) {
    return null;
  }

  // if cast exists, then we render
  return (
    <div>
      <Title title="Cast" />

      <div className="flex flex-wrap gap-1 mt-2">
        {cast.map((member, idx) => (
          <Link to={`/person/${member.id}`} key={idx}>
            <div className="bg-neutral text-xs rounded px-2 py-1 hover:bg-base-200 tooltip tooltip-top">
              <h1 className="bg-green-600 text-black rounded font-semibold tooltip-content text-xs">
                {member.character}
              </h1>
              <h1>{member.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
