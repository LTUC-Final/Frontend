import { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";

export default function AddReview({ providerID, user, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  console.log(providerID, user.user_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to post a review");
    if (rating === 0) return alert("Please select a rating");

    setLoading(true);
    try {
      const port = import.meta.env.VITE_PORT;
      const endpoint = `http://localhost:${port}/api/provider/postReview/${providerID}/${user.user_id}`;
      const payload = { rating, review_text: comment };
      const res = await axios.post(endpoint, payload);

      console.log("Review added:", res.data);

      if (onReviewAdded) onReviewAdded(res.data.review);

      alert("Review added successfully!");
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Error posting review:", err);

      if (err.response?.status === 400) {
        setAlreadyReviewed(true); // hide form
        alert(err.response.data.message || "You have already reviewed this provider");
      } else {
        alert("Failed to post review, You have already reviewed this provider");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!alreadyReviewed ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm max-w-lg mx-auto"
        >
          <label className="block mb-2 font-semibold text-gray-700">Your rating:</label>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 focus:outline-none"
                aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
              >
                <Star
                  size={24}
                  fill={star <= rating ? "yellow" : "none"}
                  className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                />
              </button>
            ))}
          </div>

          <label className="block mb-2 font-semibold text-gray-700">Your review:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Write your review..."
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? "Posting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <p className="text-red-500 font-semibold text-center">
          You have already reviewed this provider.
        </p>
      )}
    </>
  );
}
