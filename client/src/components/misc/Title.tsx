import { Link } from "react-router-dom";

type TitleProps = {
  title: string;
  link?: string;
};

export default function Title({ title, link }: TitleProps) {
  return (
    <div>
      <div className="flex justify-between items-end">
        <h1 className="uppercase opacity-50 text-sm">{title}</h1>
        <Link to={`${link}`}>
          <h1 className="text-xs opacity-50 hover:font-bold hover:opacity-80 transition-opacity duration-200 ">
            more
          </h1>
        </Link>
      </div>
      <hr className="my-1 opacity-30" />
    </div>
  );
}
