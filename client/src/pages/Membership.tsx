import { MembershipTiers } from "@/components/MembershipTiers";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Membership() {
  const benefits = [
    "Connect with verified Black singles",
    "Access to exclusive dating events",
    "Advanced matching algorithm",
    "Safe and secure platform",
    "Premium customer support",
    "Mobile app access",
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Choose Your Membership Plan
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock premium features and enhance your dating experience
        </p>
      </div>

      <MembershipTiers />

      <div className="mt-16">
        <Card className="p-8">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">
            Why Join Eboni Dating Premium?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full shrink-0">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          All plans include a 7-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
