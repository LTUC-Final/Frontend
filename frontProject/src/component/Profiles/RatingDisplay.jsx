import StarRating from "./StarRating";

export default function RatingDisplay({ avgRating, count, compact = false }) {
  if (avgRating === null) {
    return <p className="text-gray-500">No reviews yet</p>;
  }

  return compact ? (
    // Compact version: stars + 4.5/5 + total reviews
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2">
        <StarRating rating={avgRating} />
        <span className="text-gray-700 font-semibold">
          {avgRating.toFixed(1)} / 5
        </span>
      </div>
      <span className="text-gray-500 text-sm">
        {count} {count === 1 ? "review" : "reviews"}
      </span>
    </div>
  ) : (
    // Full version: just stars + text (or can add breakdown later)
    <p className="text-gray-700 mt-1">
      ⭐ Average rating:{" "}
      <span className="font-semibold text-blue-600">{avgRating.toFixed(1)}</span>{" "}
      / 5 ({count} {count === 1 ? "review" : "reviews"})
    </p>
  );
}