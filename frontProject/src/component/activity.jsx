import axios from "axios";
import { Award, Handshake, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const REACTIONS = [
  {
    type: "love",
    label: "Love",
    icon: Heart,
    gradient: "from-red-400 to-pink-500",
  },
  {
    type: "support",
    label: "Support",
    icon: Handshake,
    gradient: "from-green-400 to-emerald-500",
  },
  {
    type: "proud",
    label: "Proud",
    icon: Award,
    gradient: "from-yellow-400 to-amber-500",
  },
];

function getReactionConfig(type) {
  return REACTIONS.find((r) => r.type === type) || REACTIONS[0];
}

export default function ActivitiesList({ user_id }) {
  const port = import.meta.env.VITE_PORT;
  const { user } = useSelector((state) => state.UserInfo);
  const userId = user?.user_id;
  const [activities, setActivities] = useState([]);
  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
  console.log(userId);
  console.log(user_id);

  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${port}/getUserReactions/${user_id}`
        );
        setActivities(response.data);
        console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
        console.log(response.data);
        console.log("ddddddddddddddddddddddddddddddddddd");
      } catch (error) {
        console.error("Error fetching user reactions:", error);
      }
    };

    fetchData();
  }, [user_id, port]);

  return (
    <section className="space-y-4">
      {activities.length > 0 ? (
        <h2 className="text-lg font-semibold">Activities</h2>
      ) : (
        <></>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((act) => {
          const rc = getReactionConfig(act.reaction_type);
          const Icon = rc.icon;

          return (
            <li
              key={`${act.product_id}-${act.user_id}`}
              className="flex flex-col rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-start gap-3">
                <img
                  // src={act.image || act.profile_image}

                  src={
                    act.image
                      ? act.image.startsWith("http")
                        ? act.image
                        : `http://localhost:${port}${act.image}`
                      : `../src/assets/NoImage.png`
                  }
                  alt={act.product_name}
                  className="w-20 h-20 rounded-lg object-cover flex-none"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="truncate">
                      <div className="text-sm font-medium truncate">
                        {act.product_name}
                      </div>
                      {/* <div className="text-xs text-gray-500 truncate">
                        {act.description}
                      </div> */}
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r text-white ${rc.gradient}`}
                        title={rc.label}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{rc.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center gap-3 ml-auto">
                    <img
                      src={
                        act.profile_image
                          ? act.profile_image.startsWith("http")
                            ? act.profile_image
                            : `http://localhost:${port}${act.profile_image}`
                          : `https://ui-avatars.com/api/?name=${act.firstname}+${act.lastname}&background=random&color=fff`
                      }
                      alt={`${act.firstname} ${act.lastname}`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-xs text-gray-600">
                      <div className="font-medium text-sm">
                        {act.firstname} {act.lastname}
                      </div>
                      {/* <div className"truncate">{act.bio || "No bio"}</div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                {/* <div>
                  Provider ID:{" "}
                  <span className="font-medium text-gray-700">
                    {act.provider_id}
                  </span>
                </div>
                <div>
                  Product ID:{" "}
                  <span className="font-medium text-gray-700">
                    {act.product_id}
                  </span>
                </div> */}
              </div>
            </li>
          );
        })}
      </ul>

      {activities.length === 0 && user.role !== "provider" ? (
        <div className="text-center text-sm text-gray-500 py-8">
          No activities yet.
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
