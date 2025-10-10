import { Button } from "@/components/ui/button"
import { Heart, Calendar, Users, Sparkles } from "lucide-react"
import heroImage from "@assets/stock_images/speed_dating_event_w_e27549c9.jpg"
import { Link } from "wouter"

export function HeroSection() {
  return (
    <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage || "/placeholder.svg"}
          alt="Happy couples connecting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-chart-2/85" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 animate-fade-in">
          <Sparkles className="h-4 w-4 text-chart-3" />
          <span className="text-sm font-medium">Join 12,000+ Singles Finding Love</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 md:mb-8 animate-fade-in text-balance">
          Find Love, Build Connections,
          <br className="hidden sm:block" />
          <span className="text-chart-3 inline-block mt-2">Celebrate Black Love</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 max-w-3xl mx-auto text-white/95 px-4 leading-relaxed animate-fade-in text-pretty">
          Join exclusive events, speed dating sessions, and social meetups to connect with verified singles in your
          community
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in">
          <Link href="/signup">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform shadow-xl w-full sm:w-auto"
              data-testid="button-get-started"
            >
              Get Started Free
            </Button>
          </Link>
          <Link href="/events">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 bg-white/10 backdrop-blur-md text-white border-2 border-white/40 hover:bg-white/20 hover:scale-105 transition-transform w-full sm:w-auto"
              data-testid="button-browse-events"
            >
              Browse Events
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 animate-fade-in">
          <div className="flex items-center gap-4 group">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <Users className="h-7 w-7" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold">12,847</div>
              <div className="text-sm text-white/90 font-medium">Active Members</div>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <Heart className="h-7 w-7" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold">2,341</div>
              <div className="text-sm text-white/90 font-medium">Matches Today</div>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <Calendar className="h-7 w-7" />
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold">15</div>
              <div className="text-sm text-white/90 font-medium">Events This Week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
