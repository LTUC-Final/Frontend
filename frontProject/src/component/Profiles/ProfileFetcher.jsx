import ProfileCard from "./ProfileCard";

export default function ProfileFetcher({ profile, refreshTrigger, user_id }) {
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="relative w-full overflow-hidden bg-background mb-0">
      {/* Full Width Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Extra Wide Background Layer */}
        <div className="absolute inset-x-0 top-0 w-[700%] h-64 sm:h-80 left-1/2 -translate-x-1/2 bg-pulsing-circle blur-md opacity-50" />      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
        <ProfileCard
          role={profile.role}
          data={profile}
          refreshTrigger={refreshTrigger}
          user_id={user_id}
        />
      </div>
    </div>
  );
}
