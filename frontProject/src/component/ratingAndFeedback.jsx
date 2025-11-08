import axios from "axios";
import clsx from "clsx";
import { MessageSquare, Star } from "lucide-react";
import { useState } from "react";

export default function FeedbackCard({
  orderId,
  orderInfo,
  className = "",
  onSubmit,
}) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
   const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


  const getRatingText = (value) => {
    switch (value) {
      case 1:
        return "Very Bad";
      case 2:
        return "Bad";
      case 3:
        return "Okay";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "Select a rating";
    }
  };

  const port = import.meta.env.VITE_PORT;
  const handleStarClick = (star) => setRating(star);
  const handleStarHover = (star) => setHoveredRating(star);
  const handleSubmit = async () => {
    if (!rating) return;

    try {
      const response = await axios.post(
        `https://backend-a2qq.onrender.com/customerWriteReviewOfProdactOrder`,
        {
          product_id: orderInfo.product_id,
          customer_id: orderInfo.customer_id,
          rating: rating,
          review_text: comment,
          add_customer_review: orderInfo.add_customer_review,
          order_id: orderInfo.order_id,
        }, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            }

      );
      onSubmit?.();
      setRating(0);
      setComment("");
    } catch (error) {
      // error handling unchanged
    }
  };

  return (
<div
  className={clsx(
    "m-6 w-full max-w-[700px] rounded-xl p-6 shadow-lg",
    "bg-gradient-to-br from-[#FFF6E9] to-[#F9EBC6]",
    className
  )}
>



      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#102E50] flex items-center justify-center shadow-md">
          <MessageSquare className="w-6 h-6 text-[#F5C45E]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#102E50]">
            How was your order?
          </h2>
          <p className="text-sm text-[#BE3D2A] font-medium">Order {orderInfo.order_id}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="text-center mb-8">
        <p className="text-md font-semibold text-[#102E50] mb-4">
          {getRatingText(hoveredRating || rating)}
        </p>
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 transition-transform duration-200 hover:scale-125 rounded"
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
            >
              <Star
                className={clsx(
                  "w-9 h-9 transition-colors duration-200",
                  (hoveredRating || rating) >= star
                    ? "fill-[#F5C45E] text-[#F5C45E]"
                    : "text-[#E78B48] hover:text-[#F5C45E]"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-8">
        <label
          htmlFor="feedback-comment"
          className="block text-sm font-medium text-[#102E50] mb-3"
        >
          Tell us more about your experience (optional)
        </label>
        <textarea
          id="feedback-comment"
          placeholder="Share your thoughts about the order, delivery, or overall experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          className="w-full min-h-[90px] resize-none rounded-lg border-2 border-[#E78B48] p-4 text-[#102E50] placeholder-[#BE3D2A] focus:border-[#F5C45E] focus:ring-2 focus:ring-[#F5C45E] focus:outline-none transition"
        />
        <div className="text-right text-xs text-[#BE3D2A] mt-1">
          {comment.length}/500
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className={clsx(
          "w-full py-3 rounded-lg font-semibold transition-all duration-200 shadow-md",
          rating === 0
            ? "bg-[#BE3D2A] cursor-not-allowed opacity-60 text-[#FFF6E9]"
            : "bg-[#102E50] hover:bg-[#0b2440] text-[#F5C45E]"
        )}
      >
        Submit Feedback
      </button>
    </div>
  );
}
