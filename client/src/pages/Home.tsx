import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProfileCard } from "@/components/ProfileCard";
import { EventCard } from "@/components/EventCard";
import { MembershipTiers } from "@/components/MembershipTiers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid, List, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

import profile1 from "@assets/stock_images/professional_portrai_3025a04c.jpg";
import profile2 from "@assets/stock_images/professional_portrai_07fd91f6.jpg";
import profile3 from "@assets/stock_images/professional_portrai_bf75e54d.jpg";
import profile4 from "@assets/stock_images/professional_portrai_e26f6d71.jpg";
import profile5 from "@assets/stock_images/professional_portrai_8c02a881.jpg";
import profile6 from "@assets/stock_images/professional_portrai_c9cad671.jpg";

import event1 from "@assets/stock_images/speed_dating_event_w_632f8e09.jpg";
import event2 from "@assets/stock_images/wine_tasting_event_w_a29f56e4.jpg";
import event3 from "@assets/stock_images/outdoor_brunch_meetu_882c572a.jpg";
import event4 from "@assets/stock_images/elegant_art_gallery__8af27d7a.jpg";
import event5 from "@assets/stock_images/cooking_class_with_d_1d5f94a6.jpg";

export default function Home() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [topModels, setTopModels] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopModels = async () => {
      try {
        // First try to get featured models
        const featuredResponse = await apiRequest("GET", "/api/profiles/featured");
        if (featuredResponse.models && featuredResponse.models.length > 0) {
          setTopModels(featuredResponse.models);
        } else {
          // Fallback to top models if no featured models
          const response = await apiRequest("GET", "/api/profiles/top-models");
          setTopModels(response.profiles || []);
        }
      } catch (error) {
        console.error("Failed to fetch top models:", error);
        setTopModels([]); // Ensure topModels is an empty array on error
      }
    };
    fetchTopModels();
  }, []);

  //todo: remove mock functionality
  const mockProfiles = [
    {
      id: "1",
      name: "Amara Johnson",
      age: 28,
      image: profile1,
      location: "Atlanta, GA",
      profession: "Marketing Director",
      interests: ["Travel", "Fitness", "Art"],
      matchPercentage: 92,
      isOnline: true,
      isVerified: true,
    },
    {
      id: "2",
      name: "Marcus Williams",
      age: 32,
      image: profile2,
      location: "Los Angeles, CA",
      profession: "Software Engineer",
      interests: ["Technology", "Music", "Cooking"],
      matchPercentage: 88,
      isOnline: false,
      isVerified: true,
    },
    {
      id: "3",
      name: "Zara Thompson",
      age: 26,
      image: profile3,
      location: "New York, NY",
      profession: "Fashion Designer",
      interests: ["Fashion", "Art", "Dance"],
      matchPercentage: 85,
      isOnline: true,
      isVerified: false,
    },
    {
      id: "4",
      name: "David Brown",
      age: 30,
      image: profile4,
      location: "Chicago, IL",
      profession: "Doctor",
      interests: ["Sports", "Reading", "Travel"],
      matchPercentage: 90,
      isOnline: false,
      isVerified: true,
    },
    {
      id: "5",
      name: "Nia Davis",
      age: 27,
      image: profile5,
      location: "Miami, FL",
      profession: "Entrepreneur",
      interests: ["Business", "Yoga", "Wine"],
      matchPercentage: 87,
      isOnline: true,
      isVerified: false,
    },
    {
      id: "6",
      name: "Jordan Smith",
      age: 31,
      image: profile6,
      location: "Houston, TX",
      profession: "Architect",
      interests: ["Design", "Photography", "Movies"],
      matchPercentage: 91,
      isOnline: false,
      isVerified: true,
    },
  ];

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
      description: "Kick off a lazy Sunday with brunch and craft beers at a local gem",
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
      description: "Learn to cook a meal together, then enjoy it over wine",
      image: event5,
      category: "Cultural Events",
      date: "Saturday, Dec 23",
      time: "5:00 PM - 9:00 PM",
      location: "Culinary Studio, Chicago",
      price: 65,
      spotsAvailable: 6,
      totalSpots: 20,
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4 py-16">
        {topModels.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-gradient-to-r from-primary to-chart-2 text-white border-0">
                <Crown className="h-4 w-4 mr-2" />
                Featured Models
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                Top Premium Models
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with our most popular verified models
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {topModels.map((model) => (
                <ProfileCard 
                  key={model.id} 
                  id={model.id}
                  name={model.name}
                  age={model.age}
                  image={model.photos[0] || ''}
                  location={model.location}
                  profession={model.profession || ''}
                  interests={model.interests}
                  isOnline={model.isOnline}
                  isVerified={model.isVerified}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            Event Categories
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose from a variety of curated events designed to help you connect
          </p>
          <CategoryGrid />
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">
                Discover Your Perfect Match
              </h2>
              <p className="text-muted-foreground">
                Browse thousands of verified profiles and find someone special
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                data-testid="button-view-grid"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                data-testid="button-view-list"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
            {mockProfiles.map((profile) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" data-testid="button-load-more-profiles">
              Load More Profiles
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            Dating Events & Meetups
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join exclusive events, speed dating sessions, and social meetups
          </p>

          <div className="space-y-6">
            {mockEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" data-testid="button-load-more-events">
              Load More Events
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4">
            Membership Plans
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the plan that fits your dating journey
          </p>
          <MembershipTiers />
        </section>

        <section className="bg-gradient-to-br from-primary to-chart-2 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Find Your Match?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of singles finding meaningful connections every day
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90" data-testid="button-join-now">
            Join Now - It's Free
          </Button>
        </section>
      </div>
    </div>
  );
}
