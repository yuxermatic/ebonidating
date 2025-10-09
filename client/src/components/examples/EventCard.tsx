import { EventCard } from "../EventCard";
import eventImage from "@assets/stock_images/speed_dating_event_w_632f8e09.jpg";

export default function EventCardExample() {
  return (
    <div className="p-4">
      <EventCard
        id="1"
        title="Speed Dating Night - Ages 25-35"
        description="Fast-paced 5-minute conversations to spark connections"
        image={eventImage}
        category="Speed Dating"
        date="Friday, Dec 15"
        time="7:00 PM - 10:00 PM"
        location="The Rooftop Lounge, Atlanta"
        price={45}
        spotsAvailable={12}
        totalSpots={30}
      />
    </div>
  );
}
