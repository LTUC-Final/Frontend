"use client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { Edit2, MessageCircle, Mail, PhoneIcon } from "lucide-react";
import EditImage from "./EditImage.jsx";
import RatingDisplay from "../../component/Profiles/RatingDisplay.jsx";
import useProviderReviews from "../../hooks/useProviderReviews.jsx";

export default function ProfileCard({ data, refreshTrigger }) {
  const [isEditing, setIsEditing] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const user = useSelector((state) => state.UserInfo.user);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ ...data });
  const { reviews, avgRating } = useProviderReviews(
    profile?.provider_user_id,
    refresh
  );
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    setProfile({ ...data });
  }, [data, refreshTrigger]);

  if (!profile) {
    return (
      <div className="[font-family:'Quicksand',sans-serif] flex flex-col items-center py-10 px-4 mt-16">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl text-center">
          <p className="text-gray-500">No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="[font-family:'Quicksand',sans-serif] flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-4xl flex flex-col items-center mt-40">
        {/* Profile Image */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mt-4">
            <img
              src={
                profile.profile_image
                  ? `http://localhost:${port}${profile.profile_image}?t=${Date.now()}`
                  : `https://ui-avatars.com/api/?name=${profile.firstname}+${profile.lastname}&background=random&color=fff`
              }
              alt={`${profile.firstname || "User"} ${profile.lastname || ""}`}
              className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white ring-4 ring-[#102E50]/10 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-3xl cursor-pointer"
            />

            {/* Edit Image Button */}
            {user.email === profile.email && (
              <EditImage
                userId={profile.user_id}
                onUpdate={(newImagePath) =>
                  setProfile((prev) => ({
                    ...prev,
                    profile_image: newImagePath,
                  }))
                }
              />
            )}
          </div>
        </div>

        {/* Profile Card Content */}
        <div className="bg-white pt-32 pb-8 px-4 sm:px-6 md:px-10 rounded-2xl shadow-2xl w-full relative mt-5">
          <div className="flex-1 w-full relative min-h-[250px] text-center">
            {/* Rating */}
            {profile.role === "provider" && (
              <div
                className="mb-2 cursor-pointer"
                onClick={() => {
                  const reviewsSection = document.getElementById("customer-reviews");
                  if (reviewsSection) {
                    reviewsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <RatingDisplay
                  avgRating={avgRating}
                  count={reviews.length}
                  compact
                  className="ml-6"
                />
              </div>
            )}

            {/* Name */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102E50] mb-2">
              {profile.firstname || "Unknown"} {profile.lastname || "User"}
            </h2>

            {/* Email */}
            <div className="flex justify-center items-center gap-2 text-[#102E50]/80 mt-2 text-sm sm:text-base flex-wrap">
              <Mail size={18} className="text-[#102E50]" />
              <a
                href={`mailto:${profile.email}`}
                className="hover:underline hover:text-[#102E50] transition break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.email || "Not provided"}
              </a>
            </div>

            {/* Phone */}
            <div className="flex justify-center items-center gap-2 text-[#102E50]/80 mt-2 text-sm sm:text-base flex-wrap">
              <PhoneIcon size={18} className="text-[#102E50]" />
              <a
                href={`tel:${profile.phone}`}
                className="hover:underline hover:text-[#102E50] transition"
              >
                {profile.phone || "Not provided"}
              </a>
            </div>

            {/* Bio & Skills */}
            {profile.role === "provider" && (
              <div className="mt-6 text-left max-w-2xl mx-auto bg-[#FFF6E9]/50 p-4 sm:p-6 rounded-xl">
                <p className="text-[#102E50] mb-3">
                  <strong className="text-lg">Bio:</strong>
                  <span className="block mt-1 text-[#102E50]/80">
                    {profile.bio || "Not provided"}
                  </span>
                </p>
                <p className="text-[#102E50]">
                  <strong className="text-lg">Skills:</strong>
                  <span className="block mt-1 text-[#102E50]/80">
                    {profile.skills || "Not provided"}
                  </span>
                </p>
              </div>
            )}

            {/* Message Button */}
            {user.email !== profile.email && (
              <button
                onClick={() =>
                  navigate("/LiveChat", {
                    state: { sender: user, reciver: data },
                  })
                }
                className="absolute top-2 right-2 flex items-center px-4 py-2 text-sm sm:text-base font-medium rounded-full shadow-lg hover:scale-105 transition-all duration-200 hover:shadow-xl text-white z-10"
                style={{
                  background:
                    "linear-gradient(135deg, #F5C45E 0%, #E78B48 50%, #BE3D2A 100%)",
                }}
              >
                <MessageCircle size={18} className="mr-2" />
                Send Message
              </button>
            )}

            {/* Edit Profile Form */}
            {isEditing && (
              <div className="mt-6 bg-[#FFF6E9] border border-[#BE3D2A] rounded-2xl p-4 sm:p-6 shadow-md w-full animate-fade-in transition-all duration-300">
                <EditProfile
                  profile={profile}
                  onUpdate={(updatedProfile) => {
                    setProfile(updatedProfile);
                    setIsEditing(false);
                  }}
                  onCancel={() => setIsEditing(false)}
                />
              </div>
            )}

            {/* Edit Button */}
            {user.email === profile.email && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-4 right-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all duration-200 hover:shadow-xl mt-10"
                style={{ background: "#BE3D2A", color: "#FFF6E9" }}
              >
                <Edit2 size={20} className="sm:size-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
