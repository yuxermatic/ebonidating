import { Card } from "@/components/ui/card";
import { Calendar, Wine, Video, Palette, Mountain, Music } from "lucide-react";

const categories = [
  { name: "Speed Dating", icon: Calendar, color: "bg-chart-1" },
  { name: "Wine Tasting", icon: Wine, color: "bg-chart-2" },
  { name: "Virtual Events", icon: Video, color: "bg-chart-5" },
  { name: "Cultural Events", icon: Palette, color: "bg-chart-3" },
  { name: "Outdoor Activities", icon: Mountain, color: "bg-chart-4" },
  { name: "Music & Dance", icon: Music, color: "bg-primary" },
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Card
            key={category.name}
            className="p-6 hover-elevate active-elevate-2 cursor-pointer text-center"
            data-testid={`card-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className={`${category.color} text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-medium text-sm">{category.name}</h3>
          </Card>
        );
      })}
    </div>
  );
}
