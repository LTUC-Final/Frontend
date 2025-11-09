import { useState } from "react";
import ReviewCard from "./ReviewsCard";
import useProviderReviews from "../../hooks/useProviderReviews.jsx";
import RatingDisplay from "./RatingDisplay";

export default function ProviderReviewFetcher({ profile, refreshTrigger }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const { reviews, avgRating } = useProviderReviews(
    profile?.provider_user_id,
    refreshTrigger
  );

  const handleSeeMore = () => setVisibleCount((prev) => prev + 3);

  return (
    <div className="mt-10">
      {profile.role === "provider" && (
        <div className="border-b-2 border-[#F5C45E] pb-3 px-6 mb-8">
          <h2 className="text-2xl font-extrabold text-[#102E50] tracking-tight mb-1">
            Customer Reviews
          </h2>
          <RatingDisplay avgRating={avgRating} count={reviews.length} />
        </div>
      )}

      {reviews.length === 0 && profile.role === "provider" ? (
        <p className="text-center text-[#102E50] italic bg-[#FFF6E9] py-4 px-4 rounded-lg shadow-inner mx-6 border border-dashed border-[#F5C45E]">
     Looks like there aren’t any reviews yet. Check back soon!                                                                                  
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {reviews.slice(0, visibleCount).map((rev) => (
              <ReviewCard key={rev.review_provider_id} review={rev} userID={profile.user_id} />
            ))}
          </div>

          {reviews.length > 3 && (
            <div className="flex justify-center mt-6">
              {visibleCount < reviews.length ? (
                <button
                  onClick={handleSeeMore}
                  className="px-5 py-2 rounded-full bg-[#F5C45E] text-[#102E50] font-semibold shadow hover:bg-[#E78B48] hover:text-white transition duration-300 m-4"
                >
                  Show More Reviews
                </button>
              ) : (
                <button
                  onClick={() => setVisibleCount(3)}
                  className="px-5 py-2 rounded-full bg-[#EDEDED] text-[#102E50] font-semibold hover:bg-[#F5C45E] hover:text-white transition duration-300 m-4"
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}