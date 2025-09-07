import { Link } from "react-router-dom";

type TitleProps = {
  title: string; // The section title text
  link?: string; // Optional "more" link
};

export default function Title({ title, link }: TitleProps) {
  return (
    <div>
      {/* Title row with optional "more" link */}
      <div className="flex justify-between items-end font-google">
        {/* Section title */}
        <h1 className="uppercase opacity-50 text-sm">{title}</h1>

        {/* Conditionally render "more" link if provided */}
        {link ? (
          <Link to={`${link}`}>
            <h1 className="text-xs opacity-50 hover:font-bold hover:opacity-80 transition-opacity duration-200 ">
              more
            </h1>
          </Link>
        ) : (
          <></> // render nothing if no link
        )}
      </div>

      {/* Horizontal divider under title */}
      <hr className="my-1 opacity-30" />
    </div>
  );
}
