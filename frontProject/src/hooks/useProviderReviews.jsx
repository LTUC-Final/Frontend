import { useEffect, useState } from "react";
import axios from "axios";

export default function useProviderReviews(providerId, refreshTrigger ,isMyReview) {
  const [reviews, setReviews] = useState([]);
  const port = import.meta.env.VITE_PORT;
  console.log("asdwww",reviews)
  useEffect(() => {
    if (!providerId) return;

    async function fetchReviews() {
      try {
        const res = await axios.get(
          `http://localhost:${port}/api/provider/getProviderReviews/${providerId}`
        );
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, [providerId, refreshTrigger , isMyReview]);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  return { reviews, avgRating , setReviews  };
}

 
