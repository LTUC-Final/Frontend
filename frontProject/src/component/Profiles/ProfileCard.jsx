import { use, useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProfileCard({ data, onEditImage }) {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.UserInfo.user);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    ...data

  });
  console.log("dadada", data);
  console.log("data local", user);



  if (!profile) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full flex justify-center">
        <p className="text-gray-500">No profile data available</p>
      </div>
    );
  }
  console.log("prof", profile);

  return (
    <>
      <h1 className="flex justify-center mt-15">Profile Overview</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full flex justify-center">
        <div className="flex items-center gap-6 max-w-4xl w-full">
          <div className="flex flex-col items-center">
            <img
              src={
                profile.profile_image ||
                `https://ui-avatars.com/api/?name=${profile.firstname}+${profile.lastname}&background=random&color=fff`
              }
              alt={`${profile.firstname || "User"} ${profile.lastname || ""}`}
              className="w-32 h-32  mb-4 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <button
                onClick={() => {
                  navigate("/LiveChat", {state:{ sender: user , reciver : data }})

                }}
                className="mt-9 ml-80 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                send message
              </button></div>
            {user.email === profile.email ?
              (<div>
                <button
                  onClick={onEditImage}
                  className="mt-10 px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Edit Image
                </button>

              </div>
              ) : (<div></div>)}

          </div>

          <div className="flex-1">
            {isEditing ? (
              <EditProfile
                profile={profile}
                onUpdate={(updatedProfile) => {
                  setProfile(updatedProfile);
                  setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800">
                  {profile.firstname || "Unknown"} {profile.lastname || "User"}
                </h2>
                <h2 className="text-lg text-gray-600">
                  Email: {profile.email || "Not provided"}
                </h2>
                <p className="text-gray-600 mt-2">
                  Phone: {profile.phone || "Not provided"}
                </p>

                {profile.role === "provider" ? (
                  <div className="mt-4">
                    <p className="text-gray-700">
                      <strong>Bio:</strong> {profile.bio || "Not provided"}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <strong>Skills:</strong> {profile.skills || "Not provided"}
                    </p>

                  </div>
                ) : (<div></div>)}
                {user.email === profile.email ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-9 ml-80 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>

                ) : (<div></div>)}


              </>

            )}
          </div>
        </div>


      </div>

    </>
  );
}
