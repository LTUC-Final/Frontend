import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddReview from "../component/Profiles/AddReview";
import ProductFetcher from "../component/Profiles/ProductFetcher";
import ProfileFetcher from "../component/Profiles/ProfileFetcher";
import ProviderReviewFetcher from "../component/Profiles/ProviderReviewFetcher";
// import RatingDisplay from "../component/Profiles/RatingDisplay";
// import useProviderReviews from "../hooks/useProviderReviews.jsx";

export default function Profile() {
  const user = useSelector((state) => state.UserInfo.user);
  const [profile, setProfile] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const { user_id } = useParams();

  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  console.log(user_id);
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  // Fetch provider reviews for top rating display
  // const { reviews, avgRating } = useProviderReviews(
  //   profile?.provider_user_id,
  //   refresh
  // );
  useEffect(() => {}, [user_id]);
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const port = import.meta.env.VITE_PORT;
        const endpoint = `http://localhost:${port}/api/provider/getProviderProfile/${user_id}`;
        const { data } = await axios.get(endpoint);
        setProfile(data);
        console.log("Fetched profile:", data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user, navigate, user_id, refresh]);

  if (!profile) return <p>Loading profile...</p>;

  const handleReviewAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="bg-[#FFF6E9] min-h-screen ">
      {/* {profile.role === "provider" && (
  <div className="mb-6 cursor-pointer" onClick={() => {
  const reviewsSection = document.getElementById('customer-reviews');
  if (reviewsSection) {
    reviewsSection.scrollIntoView({ behavior: 'smooth' });
  }
}}>
  <h2 className="text-lg font-semibold mb-2 ml-4">Overall Rating</h2>
  <RatingDisplay avgRating={avgRating} count={reviews.length} compact 
  className=" ml-6"/>
</div>
)} */}

      {/* Profile info */}
      <ProfileFetcher
        profile={profile}
        setProfile={setProfile}
        refreshTrigger={refresh}
        user_id={user_id}
      />

      {profile.role === "provider" && (
        <>
          <ProductFetcher
            profile={profile}
            user={user}
            refreshTrigger={refresh}
            user_id={user_id}
          />
          <section id="customer-reviews">
            <ProviderReviewFetcher profile={profile} refreshTrigger={refresh} />

            {user?.role === "customer" && (
              <AddReview
                providerID={profile.provider_user_id}
                user={user}
                onReviewAdded={handleReviewAdded}
                refreshTrigger={refresh}
              />
            )}
          </section>
        </>
      )}
    </div>
  );
}
