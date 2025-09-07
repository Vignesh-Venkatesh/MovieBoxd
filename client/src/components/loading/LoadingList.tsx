// Props for LoadingList component
type LoadingListProps = {
  quantity: number; // Total number of skeleton items to render
  width?: string; // Width of each skeleton item
  height?: string; // Height of each skeleton item
  cols?: number; // Number of columns in the grid
  rows?: number; // Number of rows in the grid
};

export default function LoadingList({
  quantity,
  width = "w-32",
  height = "h-48",
  cols = 4,
  rows = 1,
}: LoadingListProps) {
  // Calculate total number of skeleton items to display
  const total = quantity || cols * rows;

  return (
    // Container grid for skeleton items
    <div className={`my-2 grid gap-2 grid-cols-${cols} grid-rows-${rows} `}>
      {Array.from({ length: total }).map((_, idx) => (
        // Individual skeleton item
        <div
          key={idx}
          className={`rounded shadow-lg skeleton ${width} ${height}`}
        />
      ))}
    </div>
  );
}
