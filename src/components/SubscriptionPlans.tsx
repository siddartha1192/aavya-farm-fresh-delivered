import { useState, useEffect, useRef } from "react";
import { Check, Star, Crown, ArrowRight } from "lucide-react";

type BillingCycle = "monthly" | "daily" | "annual";

const plans = [
  {
    id: "essential",
    name: "Daily Essentials",
    emoji: "🥬",
    description: "Perfect for individuals & small families",
    prices: { daily: 93, monthly: 2800, annual: 28000 },
    annualSaving: 5600,
    features: [
      "3–4 seasonal vegetables daily",
      "2 leafy greens every week",
      "Pause up to 6 days/month",
      "6 AM or 7 AM delivery slot",
      "Eco-friendly jute packaging",
    ],
    badge: null,
    badgeStyle: {},
    color: "var(--gradient-green)",
    featured: false,
  },
  {
    id: "family",
    name: "Family Pack",
    emoji: "👨‍👩‍👧‍👦",
    description: "Ideal for families of 4 or more",
    prices: { daily: 140, monthly: 4200, annual: 42000 },
    annualSaving: 9600,
    features: [
      "5–6 vegetables daily",
      "Specialty & seasonal items",
      "Pause up to 10 days/month",
      "1 farm visit per quarter",
      "Priority customer support",
      "Free recipe cards weekly",
    ],
    badge: "⭐ Most Popular",
    badgeStyle: { background: "var(--gradient-orange)" },
    color: "var(--gradient-green)",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium Organic",
    emoji: "👑",
    description: "Certified organic, full wellness experience",
    prices: { daily: 200, monthly: 6000, annual: 60000 },
    annualSaving: 12000,
    features: [
      "All-organic certified produce",
      "Nutrition consultation monthly",
      "Unlimited delivery pauses",
      "Monthly farm visits included",
      "Dedicated account manager",
      "Exclusive seasonal boxes",
      "Ayurvedic herb add-ons",
    ],
    badge: "👑 Premium",
    badgeStyle: {
      background: "linear-gradient(135deg, #774936, #C97D4B)",
    },
    color: "linear-gradient(135deg, #774936, #C97D4B)",
    featured: false,
  },
];

interface SubscriptionPlansProps {
  onSelectPlan: (plan: { name: string; price: number; cycle: BillingCycle }) => void;
}

const SubscriptionPlans = ({ onSelectPlan }: SubscriptionPlansProps) => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getPrice = (plan: typeof plans[0]) => {
    return plan.prices[billing];
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const cycleLabel = billing === "daily" ? "/day" : billing === "monthly" ? "/month" : "/year";

  return (
    <section id="plans" className="py-24 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 reveal">
          <p className="section-tag">🌿 Subscription Plans</p>
          <h2 className="section-title">
            Choose Your{" "}
            <span style={{ color: "hsl(var(--earth-green))" }}>Aavya Box</span>
          </h2>
          <p className="section-subtitle">
            Flexible plans that adapt to your family's needs. Pause, modify, or upgrade anytime — because life is unpredictable, your vegetables shouldn't be.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12 reveal">
          <div className="toggle-pill shadow-sm">
            {(["daily", "monthly", "annual"] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling(cycle)}
                className={billing === cycle ? "active" : ""}
              >
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                {cycle === "annual" && (
                  <span
                    className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "hsl(var(--sunrise-orange) / 0.2)",
                      color: "hsl(var(--sunrise-orange-dark))",
                    }}
                  >
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`plan-card reveal ${plan.featured ? "featured" : ""}`}
              style={{
                transitionDelay: `${i * 0.15}s`,
                ...(plan.featured ? { transform: "scale(1.03)" } : {}),
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-card shadow-md"
                  style={plan.badgeStyle}
                >
                  {plan.badge}
                </div>
              )}

              {/* Icon */}
              <div className="text-4xl mb-3">{plan.emoji}</div>

              {/* Name */}
              <h3 className="text-xl font-bold mb-1" style={{ color: "hsl(var(--foreground))" }}>
                {plan.name}
              </h3>
              <p className="text-sm mb-5" style={{ color: "hsl(var(--muted-foreground))" }}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span
                  className="text-4xl font-extrabold"
                  style={{ color: "hsl(var(--earth-green))" }}
                >
                  {formatPrice(getPrice(plan))}
                </span>
                <span className="text-sm ml-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {cycleLabel}
                </span>
              </div>

              {/* Annual savings */}
              {billing === "annual" && (
                <div
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full mb-5"
                  style={{
                    background: "hsl(var(--sunrise-orange) / 0.12)",
                    color: "hsl(var(--sunrise-orange-dark))",
                  }}
                >
                  🎉 Save {formatPrice(plan.annualSaving)}/year
                </div>
              )}
              {billing !== "annual" && <div className="mb-5" />}

              {/* Divider */}
              <div className="border-t border-border my-5" />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "hsl(var(--earth-green) / 0.12)" }}
                    >
                      <Check className="w-3 h-3" style={{ color: "hsl(var(--earth-green))" }} />
                    </div>
                    <span style={{ color: "hsl(var(--foreground) / 0.8)" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() =>
                  onSelectPlan({ name: plan.name, price: getPrice(plan), cycle: billing })
                }
                className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${
                  plan.featured ? "btn-primary" : ""
                }`}
                style={
                  !plan.featured
                    ? {
                        border: "2px solid hsl(var(--earth-green))",
                        color: "hsl(var(--earth-green))",
                        background: "transparent",
                      }
                    : {}
                }
                onMouseEnter={(e) => {
                  if (!plan.featured) {
                    (e.target as HTMLElement).style.background = "hsl(var(--earth-green))";
                    (e.target as HTMLElement).style.color = "hsl(var(--primary-foreground))";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.featured) {
                    (e.target as HTMLElement).style.background = "transparent";
                    (e.target as HTMLElement).style.color = "hsl(var(--earth-green))";
                  }
                }}
              >
                Select {plan.name}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div className="text-center mt-12 reveal">
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            🔒 Cancel anytime · No hidden charges · 7-day trial available · Aapke ghar tak, hamesha
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
