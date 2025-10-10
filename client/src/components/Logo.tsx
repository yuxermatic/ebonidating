
import { Heart } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="bg-gradient-to-br from-primary to-chart-2 text-white p-2 rounded-lg">
          <Heart className="h-5 w-5 fill-current" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-chart-4 rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-xl font-bold leading-none">Eboni</span>
        <span className="text-xs text-muted-foreground leading-none">Dating</span>
      </div>
    </div>
  );
}
