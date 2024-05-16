import { Typography } from "@material-tailwind/react";

export function SkeletonLine() {
  return (
    <div className="w-full animate-pulse">
      <Typography
        as="div"
        variant="h1"
        className="mb-4 h-3 w-[90%] rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-[95%] rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </div>
  );
}
