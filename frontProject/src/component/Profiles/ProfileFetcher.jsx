import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import axios from "axios";

export default function ProfileFetcher({ onProfileFetched }) {
  const user = useSelector((state) => state.UserInfo.user);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
console.log(user);


   const {user_id}= useParams();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    const fetchProfile = async () => {

      try {
      
        const port = import.meta.env.VITE_PORT;
        const endpoint = `http://localhost:${port}/api/provider/getProviderProfile/${user_id}`;

            
        const data = await axios.get(endpoint);
        console.log("endpoint",data);
        
        setProfile(data.data);
        // Pass the fetched profile to the parent/container
        if (onProfileFetched) onProfileFetched(data);
      } catch (err) {
        console.error("Error fetching profile:", err);

      }
    };
    fetchProfile();
  }, [user,onProfileFetched,navigate,user_id]);
console.log("profile",profile);
  if (!profile) return <p>Loading profile...</p>;
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <ProfileCard role={user.role} data={profile} />
        
      </div>
    </div>
  );
}
