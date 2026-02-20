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

        {/* Founder Note */}
        <div
          className="mt-14 rounded-2xl reveal overflow-hidden"
          style={{ background: "var(--gradient-earth)" }}
        >
          <div className="px-10 md:px-14 py-10 md:py-12">

              {/* Decorative open-quote */}
              <div
                className="mb-4 leading-none select-none"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "5rem",
                  lineHeight: 0.8,
                  color: "hsl(var(--sunrise-orange) / 0.45)",
                  fontWeight: 700,
                }}
              >
                "
              </div>

              {/* Quote body — Playfair italic, left-aligned */}
              <p
                className="mb-8"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
                  lineHeight: 1.8,
                  color: "hsl(52 85% 90%)",
                }}
              >
                My father was paid ₹4 for tomatoes that sold for ₹60 in the
                market — that injustice is why Aavya exists. Every box we
                deliver is a promise kept to the farmer who grew it and the
                family who deserves it fresh.
              </p>

              {/* Divider */}
              <div
                className="w-12 h-px mb-6"
                style={{ background: "hsl(var(--sunrise-orange) / 0.5)" }}
              />

              {/* Attribution */}
              <div className="flex items-center gap-4">
                {/* Initials avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    background: "hsl(var(--sunrise-orange) / 0.18)",
                    border: "1px solid hsl(var(--sunrise-orange) / 0.35)",
                    color: "hsl(var(--sunrise-orange))",
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  VR
                </div>

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "hsl(52 90% 92%)" }}
                  >
                    Vikram Reddy
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase"
                    style={{
                      color: "hsl(var(--sunrise-orange) / 0.8)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Founder & CEO · Aavya Farms, Hyderabad
                  </p>
                </div>
              </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default WhyAavya;
