import { MessageSquare, Star } from "lucide-react";

export default function ReviewCard({ review }) {
  const port = import.meta.env.VITE_PORT;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mb-4 hover:shadow-lg transition m-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {/* review.profile_image */}
          <img
            src={
              review.profile_image
                ? `http://localhost:${port}${review.profile_image}`
                : `https://ui-avatars.com/api/?name=${
                    review.customer_firstname
                  }+${
                    review.customer_lastname ?? ""
                  }&background=random&color=fff`
            }
            alt={`${review.customer_firstname} ${
              review.customer_lastname ?? ""
            }`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">
              {review.customer_firstname} {review.customer_lastname ?? ""}
            </h3>
            <span className="text-xs text-gray-400 block">
              {new Date(review.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>

            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < review.rating
                      ? "fill-yellow-500 text-yellow-500"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm flex items-start gap-1">
        <MessageSquare size={16} className="text-blue-500 mt-0.5" />
        {review.review_text}
      </p>
    </div>
  );
}
