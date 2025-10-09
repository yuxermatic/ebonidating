import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ProfileCardProps {
  id: string;
  name: string;
  age: number;
  image: string;
  location: string;
  profession: string;
  interests: string[];
  matchPercentage?: number;
  isOnline?: boolean;
  isVerified?: boolean;
}

export function ProfileCard({
  name,
  age,
  image,
  location,
  profession,
  interests,
  matchPercentage,
  isOnline,
  isVerified,
}: ProfileCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="overflow-hidden hover-elevate relative group">
      <div className="relative aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {matchPercentage && (
          <div className="absolute top-3 left-3">
            <div className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">
              {matchPercentage}% Match
            </div>
          </div>
        )}

        {isOnline && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-chart-4 text-white border-0">
              Online
            </Badge>
          </div>
        )}

        <Button
          size="icon"
          variant="secondary"
          className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ${isOnline ? 'top-14' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
          data-testid={`button-like-${name.toLowerCase().replace(' ', '-')}`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-chart-2 text-chart-2' : ''}`} />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold" data-testid={`text-profile-name-${name.toLowerCase().replace(' ', '-')}`}>
              {name}, {age}
            </h3>
            {isVerified && (
              <CheckCircle2 className="h-5 w-5 text-chart-5" />
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-white/90 mb-2">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-white/80 mb-3">
            <Briefcase className="h-3 w-3" />
            <span>{profession}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {interests.slice(0, 3).map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="bg-white/20 text-white border-0 text-xs"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Button className="w-full" data-testid={`button-view-profile-${name.toLowerCase().replace(' ', '-')}`}>
          View Profile
        </Button>
      </div>
    </Card>
  );
}
