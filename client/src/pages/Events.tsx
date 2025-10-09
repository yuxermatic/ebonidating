import { EventCard } from "@/components/EventCard";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import event1 from "@assets/stock_images/speed_dating_event_w_632f8e09.jpg";
import event2 from "@assets/stock_images/wine_tasting_event_w_a29f56e4.jpg";
import event3 from "@assets/stock_images/outdoor_brunch_meetu_882c572a.jpg";
import event4 from "@assets/stock_images/elegant_art_gallery__8af27d7a.jpg";
import event5 from "@assets/stock_images/cooking_class_with_d_1d5f94a6.jpg";
import event6 from "@assets/stock_images/speed_dating_event_w_e27549c9.jpg";

export default function Events() {
  //todo: remove mock functionality
  const mockEvents = [
    {
      id: "1",
      title: "Speed Dating Night - Ages 25-35",
      description: "Fast-paced 5-minute conversations to spark connections",
      image: event1,
      category: "Speed Dating",
      date: "Friday, Dec 15",
      time: "7:00 PM - 10:00 PM",
      location: "The Rooftop Lounge, Atlanta",
      price: 45,
      spotsAvailable: 12,
      totalSpots: 30,
    },
    {
      id: "2",
      title: "Wine Tasting & Social Mixer",
      description: "Sample premium wines while mingling with other singles",
      image: event2,
      category: "Wine Tasting",
      date: "Saturday, Dec 16",
      time: "6:00 PM - 9:00 PM",
      location: "Vineyard Loft, Los Angeles",
      price: 55,
      spotsAvailable: 8,
      totalSpots: 25,
    },
    {
      id: "3",
      title: "Brunch & Brews Meetup",
      description: "Kick off a lazy Sunday with brunch and craft beers",
      image: event3,
      category: "Outdoor Activities",
      date: "Sunday, Dec 17",
      time: "11:00 AM - 2:00 PM",
      location: "Rooftop Café, Miami",
      price: 35,
      spotsAvailable: 15,
      totalSpots: 40,
    },
    {
      id: "4",
      title: "Art Gallery Opening & Mixer",
      description: "Appreciate art while meeting cultured singles",
      image: event4,
      category: "Cultural Events",
      date: "Friday, Dec 22",
      time: "7:30 PM - 10:00 PM",
      location: "Modern Gallery, NYC",
      price: 40,
      spotsAvailable: 20,
      totalSpots: 50,
    },
    {
      id: "5",
      title: "Cooking Class & Dinner Date",
      description: "Learn to cook together, then enjoy it over wine",
      image: event5,
      category: "Cultural Events",
      date: "Saturday, Dec 23",
      time: "5:00 PM - 9:00 PM",
      location: "Culinary Studio, Chicago",
      price: 65,
      spotsAvailable: 6,
      totalSpots: 20,
    },
    {
      id: "6",
      title: "Singles Networking Happy Hour",
      description: "Professional networking meets social dating",
      image: event6,
      category: "Speed Dating",
      date: "Thursday, Dec 21",
      time: "6:00 PM - 9:00 PM",
      location: "Sky Bar, Boston",
      price: 30,
      spotsAvailable: 25,
      totalSpots: 60,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
          Dating Events & Meetups
        </h1>
        <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join exclusive events, speed dating sessions, and social meetups to connect
          with verified singles in your area
        </p>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search events by name, location, or category..."
              className="pl-10"
              data-testid="input-search-events"
            />
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-serif font-bold mb-6">Event Categories</h2>
        <CategoryGrid />
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold">Upcoming Events</h2>
          <Button variant="outline" data-testid="button-filter-events">
            Filter
          </Button>
        </div>

        <div className="space-y-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" data-testid="button-load-more-events">
            Load More Events
          </Button>
        </div>
      </section>
    </div>
  );
}
