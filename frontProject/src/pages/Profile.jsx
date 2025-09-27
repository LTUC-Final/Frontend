import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductFetcher from "../component/Profiles/ProductFetcher";
import ProfileFetcher from "../component/Profiles/ProfileFetcher";
import ProviderReviewFetcher from "../component/Profiles/ProviderReviewFetcher";
import AddReview from "../component/Profiles/AddReview";

export default function Profile() {
  const user = useSelector((state) => state.UserInfo.user);
  const [profile, setProfile] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const { user_id } = useParams();

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
  }, [user, navigate, user_id,refresh]);

  if (!profile) return <p>Loading profile...</p>;

  const handleReviewAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div>
    
      <ProfileFetcher profile={profile} setProfile={setProfile} refreshTrigger={refresh}
      />

   
      {profile.role === "provider" && (
        <ProductFetcher profile={profile} user={user}
        refreshTrigger={refresh}
        />
      )}

     
      <ProviderReviewFetcher profile={profile}
       refreshTrigger={refresh} />

    
      {user?.role === "customer" && profile?.role === "provider" && (
        <AddReview
          providerID={profile.provider_user_id}
          user={user}
          onReviewAdded={handleReviewAdded}
           refreshTrigger={refresh}
        />
      )}
    </div>
  );
}
