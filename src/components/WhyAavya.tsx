import { useEffect, useRef } from "react";

const stats = [
  {
    emoji: "⏰",
    number: "24 Hr",
    label: "Harvest to Home",
    desc: "From our fields to your doorstep in under 24 hours — nutrients intact, freshness guaranteed.",
    color: "var(--gradient-green)",
  },
  {
    emoji: "♻️",
    number: "300+",
    label: "Plastic Bags Saved",
    desc: "Every Aavya customer prevents 300+ single-use plastic bags from reaching landfills annually.",
    color: "var(--gradient-orange)",
  },
  {
    emoji: "🌾",
    number: "1000",
    label: "Acres of Farmland",
    desc: "1000 acres of our own certified farmland — no outsourcing, no unknown sources, ever.",
    color: "var(--gradient-earth)",
  },
  {
    emoji: "🚫",
    number: "Zero",
    label: "Chemical Additives",
    desc: "No pesticides, no artificial ripeners, no preservatives. Just pure, natural vegetables.",
    color: "var(--gradient-green)",
  },
  {
    emoji: "💰",
    number: "0",
    label: "Middlemen Markup",
    desc: "Direct farm-to-home pricing. What you pay goes to the farmer, not a chain of traders.",
    color: "var(--gradient-orange)",
  },
  {
    emoji: "🚜",
    number: "Open",
    label: "Visit Our Farm Anytime",
    desc: "Our farm is open to you. Come see exactly how your food is grown — transparency is our promise.",
    color: "var(--gradient-earth)",
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
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <p className="section-tag">🌿 Why Choose Aavya</p>
          <h2 className="section-title">
            Nature's Daily Gift,{" "}
            <span style={{ color: "hsl(var(--earth-green))" }}>Backed by Numbers</span>
          </h2>
          <p className="section-subtitle">
            Aavya isn't just a vegetable delivery — it's a movement. Every box you receive is a vote for cleaner soil, healthier families, and a better Hyderabad.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card-organic reveal group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: stat.color }}
              >
                {stat.emoji}
              </div>

              {/* Number */}
              <div
                className="text-3xl font-extrabold mb-1"
                style={{ color: "hsl(var(--earth-green))" }}
              >
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-base font-bold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div
          className="mt-16 rounded-3xl p-10 text-center reveal"
          style={{ background: "var(--gradient-earth)" }}
        >
          <p
            className="text-xl md:text-2xl font-semibold italic mb-4"
            style={{ color: "hsl(var(--cream-white))" }}
          >
            "Aavya means blessing. Every vegetable we send is our blessing to your family — grown with love, delivered with purpose."
          </p>
          <p className="text-sm font-medium" style={{ color: "hsl(var(--sunrise-orange))" }}>
            — Founder, Aavya Farms, Hyderabad
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyAavya;
