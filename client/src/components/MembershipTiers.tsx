import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, Star, Zap } from "lucide-react"

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started",
    icon: Star,
    features: ["Browse profiles", "Basic matching", "Limited messages (5/day)", "View events", "Standard support"],
    buttonText: "Get Started",
    featured: false,
  },
  {
    name: "Premium",
    price: "$19.99",
    period: "/month",
    description: "Most popular choice",
    icon: Zap,
    features: [
      "Everything in Basic",
      "Unlimited messages",
      "Advanced filters",
      "See who liked you",
      "Event discounts (20% off)",
      "Priority support",
      "Read receipts",
    ],
    buttonText: "Upgrade to Premium",
    featured: true,
  },
  {
    name: "VIP",
    price: "$39.99",
    period: "/month",
    description: "Ultimate dating experience",
    icon: Crown,
    features: [
      "Everything in Premium",
      "Featured profile placement",
      "Free event entry (2/month)",
      "Video chat access",
      "Exclusive VIP events",
      "Personal matchmaker",
      "Profile verification badge",
      "Concierge support",
    ],
    buttonText: "Go VIP",
    featured: false,
  },
]

export function MembershipTiers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tiers.map((tier) => {
        const Icon = tier.icon
        return (
          <Card
            key={tier.name}
            className={`p-8 relative overflow-hidden transition-all duration-300 ${
              tier.featured
                ? "border-2 border-primary shadow-2xl scale-105 bg-gradient-to-b from-primary/5 to-background"
                : "hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 ${tier.featured ? "bg-primary/10" : "bg-muted/50"} rounded-full -translate-y-16 translate-x-16`}
            />

            {tier.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-primary to-chart-2 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              </div>
            )}

            <div className="text-center mb-8 relative">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                  tier.featured ? "bg-gradient-to-br from-primary to-chart-2" : "bg-muted"
                }`}
              >
                <Icon className={`h-8 w-8 ${tier.featured ? "text-white" : "text-foreground"}`} />
              </div>

              <h3 className="text-3xl font-serif font-bold mb-2">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  {tier.price}
                </span>
                {tier.period && <span className="text-muted-foreground text-lg">{tier.period}</span>}
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className={`shrink-0 mt-0.5 ${tier.featured ? "text-primary" : "text-muted-foreground"}`}>
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full font-semibold text-base py-6 transition-all hover:scale-105 ${
                tier.featured ? "bg-gradient-to-r from-primary to-chart-2 hover:shadow-xl" : ""
              }`}
              variant={tier.featured ? "default" : "outline"}
              data-testid={`button-select-${tier.name.toLowerCase()}`}
            >
              {tier.buttonText}
            </Button>
          </Card>
        )
      })}
    </div>
  )
}
