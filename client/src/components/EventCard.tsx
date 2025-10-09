import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  spotsAvailable: number;
  totalSpots: number;
}

export function EventCard({
  title,
  description,
  image,
  category,
  date,
  time,
  location,
  price,
  spotsAvailable,
}: EventCardProps) {
  const categoryColors: Record<string, string> = {
    "Speed Dating": "bg-chart-1 text-white",
    "Wine Tasting": "bg-chart-2 text-white",
    "Virtual Events": "bg-chart-5 text-white",
    "Cultural Events": "bg-chart-3 text-white",
    "Outdoor Activities": "bg-chart-4 text-white",
  };

  return (
    <Card className="overflow-hidden hover-elevate">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-64 h-48 md:h-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold">
              ${price}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge className={`mb-2 ${categoryColors[category] || 'bg-primary'}`}>
                {category}
              </Badge>
              <h3 className="text-xl font-semibold mb-1" data-testid={`text-event-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{spotsAvailable} spots available</span>
            </div>
          </div>

          <Button className="w-full md:w-auto" data-testid={`button-register-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            Register Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
