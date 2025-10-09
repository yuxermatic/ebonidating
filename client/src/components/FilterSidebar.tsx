import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  onClose?: () => void;
}

export function FilterSidebar({ onClose }: FilterSidebarProps) {
  const [ageRange, setAgeRange] = useState([25, 45]);
  const [distance, setDistance] = useState([50]);
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [newMembers, setNewMembers] = useState(false);

  const interests = [
    "Travel", "Fitness", "Reading", "Music", "Art", "Cooking",
    "Dancing", "Sports", "Movies", "Technology"
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-semibold">Filters</h2>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-filters">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Age Range</Label>
          <div className="space-y-3">
            <Slider
              value={ageRange}
              onValueChange={setAgeRange}
              min={18}
              max={70}
              step={1}
              data-testid="slider-age-range"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{ageRange[0]} years</span>
              <span>{ageRange[1]} years</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">Distance</Label>
          <div className="space-y-3">
            <Slider
              value={distance}
              onValueChange={setDistance}
              min={5}
              max={100}
              step={5}
              data-testid="slider-distance"
            />
            <div className="text-sm text-muted-foreground">
              Within {distance[0]} miles
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="online-only" className="text-base font-medium">
              Online Now
            </Label>
            <Switch
              id="online-only"
              checked={onlineOnly}
              onCheckedChange={setOnlineOnly}
              data-testid="switch-online-only"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="verified-only" className="text-base font-medium">
              Verified Profiles
            </Label>
            <Switch
              id="verified-only"
              checked={verifiedOnly}
              onCheckedChange={setVerifiedOnly}
              data-testid="switch-verified-only"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="new-members" className="text-base font-medium">
              New Members
            </Label>
            <Switch
              id="new-members"
              checked={newMembers}
              onCheckedChange={setNewMembers}
              data-testid="switch-new-members"
            />
          </div>
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">Interests</Label>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge
                key={interest}
                variant={selectedInterests.includes(interest) ? "default" : "outline"}
                className="cursor-pointer hover-elevate active-elevate-2"
                onClick={() => toggleInterest(interest)}
                data-testid={`badge-interest-${interest.toLowerCase()}`}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1" data-testid="button-reset-filters">
            Reset
          </Button>
          <Button className="flex-1" data-testid="button-apply-filters">
            Apply Filters
          </Button>
        </div>
      </div>
    </Card>
  );
}
