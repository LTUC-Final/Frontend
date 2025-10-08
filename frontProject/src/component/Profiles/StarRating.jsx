import { Star, StarHalf } from "lucide-react";

export default function StarRating({ rating = 0, maxStars = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStarsCount = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="text-yellow-500"
          size={20}
          fill="currentColor"
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <StarHalf
          key="half-star"
          className="text-yellow-500"
          size={20}
          fill="currentColor"
        />
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStarsCount }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="text-gray-300"
          size={20}
          fill="none"
        />
      ))}
    </div>
  );
}
