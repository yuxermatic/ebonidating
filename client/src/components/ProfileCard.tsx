"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Briefcase, CheckCircle2 } from "lucide-react"
import { useState } from "react"

interface ProfileCardProps {
  id: string
  name: string
  age: number
  image: string
  location: string
  profession: string
  interests: string[]
  matchPercentage?: number
  isOnline?: boolean
  isVerified?: boolean
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
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative group touch-manipulation">
      <div className="relative aspect-[3/4]">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {matchPercentage && (
          <div className="absolute top-4 left-4 animate-fade-in">
            <div className="bg-gradient-to-r from-primary to-chart-2 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
              {matchPercentage}% Match
            </div>
          </div>
        )}

        {isOnline && (
          <div className="absolute top-4 right-4 animate-fade-in">
            <Badge variant="secondary" className="bg-chart-4 text-white border-0 shadow-lg animate-pulse">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Online
            </Badge>
          </div>
        )}

        <Button
          size="icon"
          variant="secondary"
          className={`absolute ${isOnline ? "top-16" : "top-4"} right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg`}
          onClick={() => setIsLiked(!isLiked)}
          data-testid={`button-like-${name.toLowerCase().replace(" ", "-")}`}
        >
          <Heart className={`h-5 w-5 transition-all ${isLiked ? "fill-chart-2 text-chart-2 scale-110" : ""}`} />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className="text-2xl font-bold"
              data-testid={`text-profile-name-${name.toLowerCase().replace(" ", "-")}`}
            >
              {name}, {age}
            </h3>
            {isVerified && <CheckCircle2 className="h-6 w-6 text-chart-5 drop-shadow-lg" />}
          </div>
          <div className="flex items-center gap-2 text-sm text-white/95 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="font-medium">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90 mb-3">
            <Briefcase className="h-4 w-4" />
            <span>{profession}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.slice(0, 3).map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="bg-white/25 backdrop-blur-sm text-white border-0 text-xs font-medium"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-b from-background to-muted/20">
        <Button
          className="w-full font-semibold hover:scale-105 transition-transform"
          data-testid={`button-view-profile-${name.toLowerCase().replace(" ", "-")}`}
        >
          View Profile
        </Button>
      </div>
    </Card>
  )
}
