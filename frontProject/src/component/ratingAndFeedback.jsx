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
  console.log("sssssssss");
  console.log(orderInfo);
  console.log("sssssssss");

  const port = import.meta.env.VITE_PORT;
  const handleStarClick = (star) => setRating(star);
  const handleStarHover = (star) => setHoveredRating(star);
  const handleSubmit = async () => {
    if (!rating) return;

    console.log("Comment value before sending:", comment);

    try {
      const response = await axios.post(
        `http://localhost:${port}/customerWriteReviewOfProdactOrder`,
        {
          product_id: orderInfo.product_id,
          customer_id: orderInfo.customer_id,
          rating: rating,
          review_text: comment,
          add_customer_review: orderInfo.add_customer_review,
          order_id: orderInfo.order_id,
        }
      );
      onSubmit?.();
      setRating(0);
      setComment("");
      console.log(comment + 6333333333333333);
      console.log("Review submitted:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div
      className={clsx(
        "m-10 w-full shadow bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4", // reduced p-4
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            How was your order?
          </h2>
          <p className="text-sm text-gray-500">Order {orderInfo.order_id}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-gray-800 mb-3">
          {getRatingText(hoveredRating || rating)}
        </p>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
              aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
            >
              <Star
                className={clsx(
                  "w-8 h-8 transition-colors duration-200",
                  (hoveredRating || rating) >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-300"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label
          htmlFor="feedback-comment"
          className="block text-sm font-medium text-gray-800 mb-2"
        >
          Tell us more about your experience (optional)
        </label>
        <textarea
          id="feedback-comment"
          placeholder="Share your thoughts about the order, delivery, or overall experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full min-h-[80px] resize-none border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          maxLength={500}
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {comment.length}/500
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className={clsx(
          "w-full py-2.5 rounded-md font-medium transition-all duration-200",
          rating === 0
            ? "bg-blue-400 cursor-not-allowed opacity-50 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        )}
      >
        Submit Feedback
      </button>
    </div>
  );
}
