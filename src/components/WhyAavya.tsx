import { useEffect, useRef } from "react";
import { Clock, Recycle, Wheat, ShieldCheck, ArrowDownCircle, MapPin } from "lucide-react";

const stats = [
  {
    icon: Clock,
    number: "24 Hr",
    label: "Harvest to Home",
    desc: "From our fields to your doorstep in under 24 hours — nutrients intact, freshness guaranteed.",
    accent: "hsl(var(--earth-green))",
    accentBg: "hsl(154 41% 30% / 0.08)",
  },
  {
    icon: Recycle,
    number: "300+",
    label: "Plastic Bags Saved",
    desc: "Every Aavya customer prevents 300+ single-use plastic bags from reaching landfills annually.",
    accent: "hsl(var(--sunrise-orange-dark))",
    accentBg: "hsl(27 80% 55% / 0.08)",
  },
  {
    icon: Wheat,
    number: "1,000",
    label: "Acres of Farmland",
    desc: "1000 acres of our own certified farmland — no outsourcing, no unknown sources, ever.",
    accent: "hsl(var(--earth-green))",
    accentBg: "hsl(154 41% 30% / 0.08)",
  },
  {
    icon: ShieldCheck,
    number: "Zero",
    label: "Chemical Additives",
    desc: "No pesticides, no artificial ripeners, no preservatives. Just pure, natural vegetables.",
    accent: "hsl(var(--sunrise-orange-dark))",
    accentBg: "hsl(27 80% 55% / 0.08)",
  },
  {
    icon: ArrowDownCircle,
    number: "₹0",
    label: "Middlemen Markup",
    desc: "Direct farm-to-home pricing. What you pay goes to the farmer, not a chain of traders.",
    accent: "hsl(var(--earth-green))",
    accentBg: "hsl(154 41% 30% / 0.08)",
  },
  {
    icon: MapPin,
    number: "Open",
    label: "Visit Our Farm",
    desc: "Our farm is open to you. Come see exactly how your food is grown — transparency is our promise.",
    accent: "hsl(var(--sunrise-orange-dark))",
    accentBg: "hsl(27 80% 55% / 0.08)",
  },
];

const WhyAavya = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-aavya" className="py-24 section-cream" ref={sectionRef}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <p className="section-tag">Why Choose Aavya</p>
          <h2 className="section-title">
            Nature's Daily Gift,{" "}
            <span style={{ color: "hsl(var(--earth-green))" }}>Backed by Numbers</span>
          </h2>
          <p className="section-subtitle">
            Every box you receive is a vote for cleaner soil, healthier families, and a better Hyderabad.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="reveal group"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  className="h-full rounded-2xl p-6 transition-all duration-300 border"
                  style={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    boxShadow: "var(--shadow-sm)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: stat.accentBg }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      style={{ color: stat.accent }}
                    />
                  </div>

                  {/* Number */}
                  <div
                    className="text-2xl font-bold mb-0.5 tracking-tight"
                    style={{ color: stat.accent }}
                  >
                    {stat.number}
                  </div>

                  {/* Label */}
                  <div
                    className="text-sm font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: "hsl(var(--foreground) / 0.75)", letterSpacing: "0.04em" }}
                  >
                    {stat.label}
                  </div>

                  {/* Divider */}
                  <div
                    className="w-8 h-px mb-3"
                    style={{ background: "hsl(var(--border))" }}
                  />

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <div
          className="mt-14 rounded-2xl px-10 py-8 text-center reveal"
          style={{ background: "var(--gradient-earth)" }}
        >
          <p
            className="text-lg md:text-xl font-medium italic mb-3"
            style={{ color: "hsl(var(--cream-white) / 0.9)" }}
          >
            "Aavya means blessing. Every vegetable we send is our blessing to your family — grown with love, delivered with purpose."
          </p>
          <p
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "hsl(var(--sunrise-orange))" }}
          >
            — Founder, Aavya Farms, Hyderabad
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhyAavya;
