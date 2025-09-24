// Profile.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductFetcher from "../component/Profiles/ProductFetcher";
import ProfileFetcher from "../component/Profiles/ProfileFetcher";

export default function Profile() {
  const user = useSelector((state) => state.UserInfo.user);
  const [profile, setProfile] = useState(null);
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
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [user, navigate, user_id]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
 
      <ProfileFetcher profile={profile} setProfile={setProfile} />

      {profile.role === "provider" && (
        <ProductFetcher profile={profile} user={user}/>
      )}
    </div>
  );
}
