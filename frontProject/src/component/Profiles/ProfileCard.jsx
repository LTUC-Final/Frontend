"use client";
import { Edit2, Mail, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RatingDisplay from "../../component/Profiles/RatingDisplay.jsx";
import useProviderReviews from "../../hooks/useProviderReviews.jsx";
import ActivitiesList from "../activity.jsx";
import DeleteProfileImage from "./DeleteProfileImage.jsx";
import EditImage from "./EditImage.jsx";
import EditProfile from "./EditProfile";

export default function ProfileCard({ data, refreshTrigger, user_id }) {

  console.log("data")
    console.log(data)

      console.log("data")

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
  const [isOpen, setIsOpen] = useState(false);

  console.log("asdasdasdasd", data);

  useEffect(() => {
    setProfile({ ...data });
  }, [data, refreshTrigger]);

  if (!profile) {
    return (
      <div className="[font-family:'Quicksand',sans-serif] flex flex-col items-center py-10 px-4 mt-8 mb-0">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl text-center">
          <p className="text-gray-500">No profile data available</p>
        </div>
      </div>
    );
  }
  console.log(refresh);
  console.log("info user", user);

  return (
    <div className="[font-family:'Quicksand',sans-serif] flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 mt-25 mb-0">
      <div className="relative w-full max-w-4xl flex flex-col items-center mt-10">
        {/* Profile Image */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mt-4 group">
            <img
              src={
                profile.profile_image
                  ? profile.profile_image
                  : `https://ui-avatars.com/api/?name=${profile.firstname}+${profile.lastname}&background=random&color=fff`
              }
              alt={`${profile.firstname || "User"} ${profile.lastname || ""}`}
              className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white ring-4 ring-[#102E50]/10 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-3xl cursor-pointer"
            />

            {/* Edit and Delete Image Buttons - Modern Overlay Style */}
            {user.email === profile.email && (
              <>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none" />

                {/* Button Container */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 pb-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0 z-30">
                  <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-1.5 py-1 shadow-lg">
                    <DeleteProfileImage
                      onDeleted={() =>
                        setProfile((prev) => ({
                          ...prev,
                          profile_image: null,
                        }))
                      }
                    />
                    <div className="w-px h-3 bg-gray-300" />
                    <EditImage
                      userId={profile.user_id}
                      onUpdate={(newImagePath) =>
                        setProfile((prev) => ({
                          ...prev,
                          profile_image: newImagePath,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Alternative: Corner Buttons (Comment out the above and uncomment this for corner style) */}
                {/* <div className="absolute bottom-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-30">
                  <div className="flex items-center gap-2">
                    <EditImage
                      userId={profile.user_id}
                      onUpdate={(newImagePath) =>
                        setProfile((prev) => ({
                          ...prev,
                          profile_image: newImagePath,
                        }))
                      }
                    />
                    <DeleteProfileImage
                      onDeleted={() =>
                        setProfile((prev) => ({
                          ...prev,
                          profile_image: null,
                        }))
                      }
                    />
                  </div>
                </div> */}
              </>
            )}
          </div>
        </div>

        {/* Profile Card Content */}
        <div className="bg-white pt-32 pb-8 px-4 sm:px-6 md:px-10 rounded-2xl shadow-2xl w-full relative mt-5 transition-all duration-300 hover:shadow-3xl">
          <div className="flex-1 w-full relative min-h-[250px] text-center">
            {/* Rating */}
            {profile.role === "provider" && (
              <div
                className="mb-2 cursor-pointer"
                onClick={() => {
                  const reviewsSection =
                    document.getElementById("customer-reviews");
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
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102E50] mb-2 mt-4">
              {`${
                profile.firstname.charAt(0).toUpperCase() +
                profile.firstname.slice(1)
              } ${
                profile.lastname.charAt(0).toUpperCase() +
                profile.lastname.slice(1)
              }`}
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
              <Phone size={18} className="text-[#102E50]" />
              <a
                href={`tel:${profile.phone}`}
                className="hover:underline hover:text-[#102E50] transition"
              >
                {profile.phone || "Not provided"}
              </a>
            </div>

            {/* Bio & Skills */}
            {profile.role === "provider" && (
              <div className="mt-6 text-left max-w-2xl mx-auto bg-[#FFF6E9]/50 p-4 sm:p-6 rounded-xl border border-[#F5C45E]/20 transition-all duration-300 hover:border-[#F5C45E]/40">
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
                  navigate(`/LiveChat/${data.user_id}`, {
                    state: { sender: user, reciver: data },
                  })
                }
                className="absolute top-2 right-2 flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-medium rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-xl text-white z-10"
                style={{
                  background:
                    "linear-gradient(135deg, #F5C45E 0%, #E78B48 50%, #BE3D2A 100%)",
                }}
              >
                <MessageCircle size={18} />
                <span className="hidden sm:inline">Send Message</span>
                <span className="sm:hidden">Message</span>
              </button>
            )}

            {/* Edit Profile Form */}
            {isEditing && (
              <div className="mt-6 bg-gradient-to-br from-[#FFF6E9] to-white border border-[#BE3D2A] rounded-2xl p-4 sm:p-6 shadow-xl w-full animate-fade-in transition-all duration-300">
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
                className="absolute bottom-2 right-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 hover:shadow-2xl group"
                style={{ background: "#BE3D2A", color: "#FFF6E9" }}
              >
                <Edit2
                  size={18}
                  className="sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-200"
                />
              </button>
            )}
          </div>
        </div>

        {profile.user_id !== user_id ? (
          <ActivitiesList user_id={user_id}></ActivitiesList>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
