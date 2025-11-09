import { MessageSquare, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReviewCard({ review ,userID}) {
  const port = import.meta.env.VITE_PORT;
  const navigate = useNavigate();
console.log("Review object:", review);
console.log("userID:", userID);

  return (
    <div
      onClick={() => {
        if (review?.customer_id) {
          navigate(`/profile/${review.customer_id}`);
          window.scrollTo(0, 0);
        }
      }}
      className="p-6 bg-[#FFF6E9] rounded-2xl shadow-md mb-6 hover:shadow-lg transition-all duration-300 border border-[#F5C45E] mx-4 cursor-pointer"
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Profile Image */}
        <img
          src={
            review.profile_image
              ?review.profile_image
              : `https://ui-avatars.com/api/?name=${review.customer_firstname}+${review.customer_lastname ?? ""}&background=E78B48&color=fff`
          }
          alt={`${review.customer_firstname} ${review.customer_lastname ?? ""}`}
          className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-sm"
        />

        <div className="flex-1">
          {/* Name and Date */}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-[#102E50] text-base">
              {review.customer_firstname} {review.customer_lastname ?? ""}
            </h3>
            <span className="text-xs text-gray-500">
              {new Date(review.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`transition ${
                  i < review.rating
                    ? "fill-[#F5C45E] text-[#F5C45E]"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review text */}
      <p className="text-sm text-[#102E50] leading-relaxed flex gap-2 items-start">
        <MessageSquare size={18} className="text-[#E78B48] mt-1 shrink-0" />
        <span>{review.review_text}</span>
      </p>
    </div>
  );
}