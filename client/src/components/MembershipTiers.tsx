import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Browse profiles",
      "Basic matching",
      "Limited messages (5/day)",
      "View events",
      "Standard support"
    ],
    buttonText: "Get Started",
    featured: false,
  },
  {
    name: "Premium",
    price: "$19.99",
    period: "/month",
    description: "Most popular choice",
    features: [
      "Everything in Basic",
      "Unlimited messages",
      "Advanced filters",
      "See who liked you",
      "Event discounts (20% off)",
      "Priority support",
      "Read receipts"
    ],
    buttonText: "Upgrade to Premium",
    featured: true,
  },
  {
    name: "VIP",
    price: "$39.99",
    period: "/month",
    description: "Ultimate dating experience",
    features: [
      "Everything in Premium",
      "Featured profile placement",
      "Free event entry (2/month)",
      "Video chat access",
      "Exclusive VIP events",
      "Personal matchmaker",
      "Profile verification badge",
      "Concierge support"
    ],
    buttonText: "Go VIP",
    featured: false,
  }
];

export function MembershipTiers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={`p-6 ${
            tier.featured
              ? "border-2 border-primary shadow-lg relative"
              : ""
          }`}
        >
          {tier.featured && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-2xl font-serif font-bold mb-2">{tier.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold">{tier.price}</span>
              {tier.period && (
                <span className="text-muted-foreground">{tier.period}</span>
              )}
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            className="w-full"
            variant={tier.featured ? "default" : "outline"}
            data-testid={`button-select-${tier.name.toLowerCase()}`}
          >
            {tier.buttonText}
          </Button>
        </Card>
      ))}
    </div>
  );
}
