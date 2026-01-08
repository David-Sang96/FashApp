import { StarIcon } from "lucide-react";

const RatingConverter = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: rating }).map(() => (
        <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
};

export default RatingConverter;
