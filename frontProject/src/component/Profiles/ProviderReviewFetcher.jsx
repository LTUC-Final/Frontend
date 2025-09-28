import { useEffect, useState } from "react";
import ReviewCard from "./ReviewsCard";
import axios from "axios";

export default function ProviderReviewFetcher({ profile,refreshTrigger }) {
  const [review, setReview] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); 
  const port = import.meta.env.VITE_PORT;

  const endpoint = `http://localhost:${port}/api/provider/getProviderReviews/${profile.provider_user_id}`;

  useEffect(() => {
    if (!profile?.provider_user_id) return;

    async function fetchReviews() {
      try {
        const res = await axios.get(endpoint);
        const data = res.data;
        setReview(data);
        console.log("Fetched reviews:", data);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    }

    fetchReviews();
 }, [profile?.provider_user_id, refreshTrigger]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
  const avgRating =
  review.length > 0
    ? review.reduce((sum, r) => sum + r.rating, 0) / review.length
    : null;

  return (
    <div className="mt-6">
    <div className="flex justify-between items-center m-10 mt-10">
  {profile.role === "provider" && (
    <div className="border-b-2 border-blue-500 pb-2">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
        Customer Reviews
      </h2>

      {avgRating !== null ? (
        <p className="text-gray-700 mt-1">
          ⭐ Average rating: <span className="font-semibold text-blue-600">{avgRating.toFixed(1)}</span> / 5
          {" "}({review.length} {review.length === 1 ? "review" : "reviews"})
        </p>
      ) : (
        <p className="text-gray-500 mt-1">No reviews have been submitted yet</p>
      )}
    </div>
  )}
</div>


      {review.length === 0 && profile.role === "provider"? (
        <p className="text-center text-gray-500 italic bg-gray-100 py-3 rounded-lg shadow-sm mb-15 mt-15">
          No reviews yet. Be the first to share your experience!
        </p>
      ) : (
        <>
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
            {review.slice(0, visibleCount).map((rev) => (
              <ReviewCard key={rev.review_provider_id} review={rev} />
            ))}
          </div>

          {review.length > 3 && (
            <div className="flex justify-center mt-4 gap-2">
              {visibleCount < review.length && (
                <button
                  onClick={handleSeeMore}
                  className="px-4 py-2 m-6 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  See more reviews
                </button>
              )}

              {visibleCount >= review.length && (
                <button
                  onClick={() => setVisibleCount(3)}
                  className="px-4 py-2 m-6 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition"
                >
                  See less
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
