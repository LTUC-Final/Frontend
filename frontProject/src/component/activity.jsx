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
        console.log("ddddddddddddddddddddddddddddddddd");
      } catch (error) {
        console.error("Error fetching user reactions:", error);
      }
    };

    fetchData();
  }, [user_id, port]);

  return (
    <section className="space-y-4">
      {activities.length > 0 ? (
        <div className="relative flex items-center">
          <div className="flex-grow border-t-2 border-[#E78B48]"></div>
          <h2 className="px-4 text-2xl font-bold text-[#102E50]">Activities</h2>
          <div className="flex-grow border-t-2 border-[#E78B48]"></div>
        </div>
      ) : (
        <></>
      )}
      <section className="space-y-6 p-6">
        {/* Header with line */}
        {/* <div className="relative flex items-center">
          <div className="flex-grow border-t-2 border-[#E78B48]"></div>
          <h2 className="px-4 text-2xl font-bold text-[#102E50]">Activities</h2>
          <div className="flex-grow border-t-2 border-[#E78B48]"></div>
        </div> */}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act) => {
            const rc = getReactionConfig(act.reaction_type);
            const Icon = rc.icon;

            return (
              <li
                key={`${act.product_id}-${act.user_id}`}
                className="rounded-2xl border-2 border-[#E78B48]/30 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${rc.gradient}`} />
                {/* Card content */}
                <div className="p-5 space-y-4">
                  {/* Description text
                  <div className="bg-[#FFF6E9] rounded-lg p-3 border border-[#F5C45E]/30">
                    <p className="text-sm text-[#102E50] leading-relaxed">
                      You reacted with{" "}
                      <span
                        className={`font-bold bg-gradient-to-r ${rc.gradient} bg-clip-text text-transparent`}
                      >
                        {rc.label}
                      </span>{" "}
                      to {act.firstname} {act.lastname}'s{" "}
                      <span className="font-bold text-[#E78B48]">
                        {act.product_name}
                      </span>{" "}
                      product
                    </p>
                  </div> */}

                  {/* Product and reaction info */}
                  <div className="flex items-start gap-4">
                    <img
                      // src={act.image || act.profile_image}

                      src={act.image ? act.image : `../src/assets/NoImage.png`}
                      alt={act.product_name}
                      className="w-20 h-20 rounded-lg object-cover flex-none"
                    />

                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="truncate">
                        <h3 className="text-base font-bold truncate text-[#102E50]">
                          {act.product_name}
                        </h3>
                      </div>

                      <div
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r text-white shadow-md hover:shadow-lg transition-shadow ${rc.gradient}`}
                        title={rc.label}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{rc.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#E78B48]/20" />

                  {/* Provider info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        act.profile_image
                          ? act.profile_image
                          : `https://ui-avatars.com/api/?name=${act.firstname}+${act.lastname}&background=102E50&color=fff`
              }
                      alt={`${act.firstname} ${act.lastname}`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#F5C45E] shadow-sm"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#102E50]">
                        {act.firstname} {act.lastname}
                      </div>
                      <div className="text-xs text-[#102E50]/60">Provider</div>
                    </div>
                  </div>
                </div>{" "}
              </li>
            );
          })}
        </ul>
        {activities.length === 0 && user.role !== "provider" ? (
          <div className="text-center text-base text-[#102E50]/60 py-12 bg-[#FFF6E9] rounded-2xl border-2 border-[#E78B48]/30">
            <Heart className="w-12 h-12 mx-auto mb-3 text-[#E78B48]/40" />
            <p className="font-semibold">No activities yet.</p>
          </div>
        ) : (
          <></>
        )}
      </section>
    </section>
  );
}
