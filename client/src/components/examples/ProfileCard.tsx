import { ProfileCard } from "../ProfileCard";
import profile1 from "@assets/stock_images/professional_portrai_3025a04c.jpg";

export default function ProfileCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <ProfileCard
        id="1"
        name="Amara Johnson"
        age={28}
        image={profile1}
        location="Atlanta, GA"
        profession="Marketing Director"
        interests={["Travel", "Fitness", "Art"]}
        matchPercentage={92}
        isOnline={true}
        isVerified={true}
      />
    </div>
  );
}
