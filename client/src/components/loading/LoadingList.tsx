type LoadingListProps = {
  quantity: number;
  width?: string;
  height?: string;
  cols?: number;
  rows?: number;
};

export default function LoadingList({
  quantity,
  width = "w-32",
  height = "h-48",
  cols = 4,
  rows = 1,
}: LoadingListProps) {
  const total = quantity || cols * rows;

  return (
    <div className={`my-2 grid gap-2 grid-cols-${cols} grid-rows-${rows} `}>
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          className={`rounded shadow-lg skeleton ${width} ${height}`}
        />
      ))}
    </div>
  );
}
