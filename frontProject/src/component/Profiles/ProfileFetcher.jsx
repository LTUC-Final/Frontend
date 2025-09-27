
import ProfileCard from "./ProfileCard";

export default function ProfileFetcher({ profile ,refreshTrigger}) {
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="bg-background px-4">        
      <div className="max-w-3xl mx-auto mb-15">  
        <ProfileCard role={profile.role} data={profile} refreshTrigger={refreshTrigger}/>
      </div>
    </div>
  );
}
