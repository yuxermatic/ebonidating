"use client"

import { ProfileCard } from "@/components/ProfileCard"
import { FilterSidebar } from "@/components/FilterSidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import profile1 from "@assets/stock_images/professional_portrai_3025a04c.jpg"
import profile2 from "@assets/stock_images/professional_portrai_07fd91f6.jpg"
import profile3 from "@assets/stock_images/professional_portrai_bf75e54d.jpg"
import profile4 from "@assets/stock_images/professional_portrai_e26f6d71.jpg"
import profile5 from "@assets/stock_images/professional_portrai_8c02a881.jpg"
import profile6 from "@assets/stock_images/professional_portrai_c9cad671.jpg"
import profile7 from "@assets/stock_images/professional_portrai_3939cdbb.jpg"
import profile8 from "@assets/stock_images/professional_portrai_e3c1b5a1.jpg"

export default function Browse() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string | null>(null)

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
    {
      id: "7",
      name: "Layla Robinson",
      age: 29,
      image: profile7,
      location: "Dallas, TX",
      profession: "Teacher",
      interests: ["Reading", "Hiking", "Cooking"],
      matchPercentage: 86,
      isOnline: true,
      isVerified: true,
    },
    {
      id: "8",
      name: "Isaiah Moore",
      age: 33,
      image: profile8,
      location: "Philadelphia, PA",
      profession: "Attorney",
      interests: ["Law", "Basketball", "Travel"],
      matchPercentage: 89,
      isOnline: false,
      isVerified: true,
    },
  ]

  const quickFilters = [
    { id: "online", label: "Online Now", icon: "🟢" },
    { id: "verified", label: "Verified", icon: "✓" },
    { id: "new", label: "New Members", icon: "✨" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-80 shrink-0 sticky top-20 self-start">
          <FilterSidebar />
        </aside>

        <main className="flex-1">
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-serif font-bold mb-2 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  Discover Your Perfect Match
                </h1>
                <p className="text-muted-foreground text-lg">{mockProfiles.length} Profiles Found</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="transition-all hover:scale-110"
                  data-testid="button-view-grid"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="transition-all hover:scale-110"
                  data-testid="button-view-list"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent" data-testid="button-open-filters">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex flex-wrap gap-2">
                {quickFilters.map((filter) => (
                  <Badge
                    key={filter.id}
                    variant={selectedQuickFilter === filter.id ? "default" : "outline"}
                    className="cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all px-4 py-2 text-sm"
                    onClick={() => setSelectedQuickFilter(selectedQuickFilter === filter.id ? null : filter.id)}
                    data-testid={`badge-quick-filter-${filter.id}`}
                  >
                    <span className="mr-2 text-base">{filter.icon}</span>
                    {filter.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "grid-cols-1 max-w-3xl"} gap-6`}
          >
            {mockProfiles.map((profile) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="px-8 hover:scale-105 transition-transform" data-testid="button-load-more">
              Load More Profiles
            </Button>
            <p className="text-sm text-muted-foreground mt-4">Showing {mockProfiles.length} of 847 profiles</p>
          </div>
        </main>
      </div>
    </div>
  )
}
