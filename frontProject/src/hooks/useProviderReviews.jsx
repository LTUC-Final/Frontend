import axios from "axios";
import { useEffect, useState } from "react";

export default function useProviderReviews(providerId, refreshTrigger ,isMyReview) {
  const [reviews, setReviews] = useState([]);
  const port = import.meta.env.VITE_PORT;
<<<<<<< HEAD
=======
  console.log("asdwww",reviews)
>>>>>>> d079ab54ed2eaf570925705d6fada263b84c9320
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

 
