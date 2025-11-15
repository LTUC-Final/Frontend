
import { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import useProviderReviews from "../../hooks/useProviderReviews";

export default function AddReview({ providerID, user , onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { reviews, avgRating, setReviews } = useProviderReviews(providerID, 0);

  const alreadyReviewed = user && reviews.some(
    r => String(r.customer_id) === String(user.user_id)
  );

  const showSwal = ({ title, text, icon = "info", confirmColor = "#F5C45E" }) => {
    Swal.fire({
      title,
      text,
      icon,
      background: "#FFF6E9",
      color: "#102E50",
      iconColor:
        icon === "success"
          ? "#F5C45E"
          : icon === "error"
          ? "#BE3D2A"
          : icon === "warning"
          ? "#E78B48"
          : "#102E50",
      confirmButtonColor: confirmColor,
      confirmButtonText: "OK",
      buttonsStyling: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return showSwal({
        title: "Login Required",
        text: "You must be logged in to post a review.",
        icon: "warning",
        confirmColor: "#E78B48",
      });
    }

    if (rating === 0) {
      return showSwal({
        title: "No Rating Selected",
        text: "Please select a rating before submitting.",
        icon: "warning",
        confirmColor: "#E78B48",
      });
    }

    setLoading(true);
    try {
      const port = import.meta.env.VITE_PORT;
      const endpoint = `http://localhost:${port}/api/provider/postReview/${providerID}/${user.user_id}`;
      const payload = { rating, review_text: comment };
      const res = await axios.post(endpoint, payload);

      // ✅ Add the new review to local state to hide form immediately
      setReviews(prev => [
        ...prev,
        {
          ...res.data.review,
          customer_id: user.user_id,
          rating,
          review_text: comment,
          created_at: new Date().toISOString(),
        }
      ]);
      if (onReviewAdded) onReviewAdded();

      showSwal({
        title: "Review Added",
        text: "Thanks for sharing your feedback!",
        icon: "success",
        confirmColor: "#F5C45E",
      });

      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Error posting review:", err);
      showSwal({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmColor: "#BE3D2A",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <div className="mb-6 text-center"> */}
        {/* <h3 className="text-lg font-semibold text-[#102E50]">Average Rating</h3> */}
        {/* <p className="text-[#E78B48] font-bold text-xl">
          {avgRating ? avgRating.toFixed(1) : "No reviews yet"}
        </p> */}
      {/* </div> */}

      {!alreadyReviewed ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 p-6 rounded-xl shadow-md bg-[#FFF6E9] max-w-xl mx-auto border border-[#F5C45E] mb-6"
        >
          <h2 className="text-2xl font-bold text-[#102E50] mb-4 text-center">
            Leave a Review
          </h2>

          <label className="block mb-2 font-semibold text-[#102E50]">Your rating:</label>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 focus:outline-none"
                aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
              >
                <Star
                  size={28}
                  fill={star <= rating ? "#F5C45E" : "none"}
                  className={star <= rating ? "text-[#F5C45E]" : "text-gray-300 transition-colors duration-200"}
                />
              </button>
            ))}
          </div>

          <label className="block mb-2 font-semibold text-[#102E50]">Your review:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#F5C45E] bg-white text-[#102E50] focus:outline-none focus:ring-2 focus:ring-[#E78B48] mb-4"
            placeholder="Write your review..."
            required
            rows={4}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-[#102E50] transition-all ${
              loading
                ? "bg-[#F5C45E] cursor-not-allowed opacity-70"
                : "bg-[#F5C45E] hover:bg-[#E78B48] hover:text-white"
            }`}
          >
            {loading ? "Posting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <p className="text-[#BE3D2A] font-semibold text-center mt-6">
          You have already reviewed this provider.
        </p>
      )}
    </>
  );
}
