import { Button } from "@/components/ui/button";
import { Heart, Calendar, Users } from "lucide-react";
import heroImage from "@assets/stock_images/speed_dating_event_w_e27549c9.jpg";

export function HeroSection() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Happy couples connecting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-chart-2/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 md:mb-6">
          Find Love, Build Connections,
          <br className="hidden sm:block" />
          <span className="text-chart-3">Celebrate Black Love</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto text-white/90 px-4">
          Join exclusive events, speed dating sessions, and social meetups to connect
          with verified singles in your community
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            size="lg"
            className="text-lg px-8 bg-white text-primary hover:bg-white/90"
            data-testid="button-get-started"
          >
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            data-testid="button-browse-events"
          >
            Browse Events
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold">12,847</div>
              <div className="text-sm text-white/80">Active Members</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <Heart className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold">2,341</div>
              <div className="text-sm text-white/80">Matches Today</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-white/80">Events This Week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
