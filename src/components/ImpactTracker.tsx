import { useEffect, useRef, useState } from "react";

const badges = [
  { emoji: "🥉", label: "Bronze", threshold: 100, color: "#CD7F32" },
  { emoji: "🥈", label: "Silver", threshold: 500, color: "#A8A9AD" },
  { emoji: "🥇", label: "Gold", threshold: 1000, color: "#FFD700" },
];

const stats = [
  { number: "18,420", label: "Subscribers Across Hyderabad", emoji: "👨‍👩‍👧‍👦" },
  { number: "5", label: "Delivery Zones Active", emoji: "🗺️" },
  { number: "42.1L", label: "Plastic Bags Saved", emoji: "♻️" },
  { number: "21.6", label: "Tons of CO₂ Offset", emoji: "🌍" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

const ImpactTracker = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const bags = useCountUp(4210000, 2500, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" className="py-24 section-green" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <p
            className="section-tag"
            style={{ color: "hsl(var(--sunrise-orange))" }}
          >
            🌍 Plastic-Free Impact
          </p>
          <h2
            className="section-title"
            style={{ color: "hsl(var(--cream-white))" }}
          >
            Together, We're Healing{" "}
            <span style={{ color: "hsl(var(--sunrise-orange))" }}>Hyderabad</span>
          </h2>
          <p
            className="section-subtitle"
            style={{ color: "hsl(var(--cream-white) / 0.7)" }}
          >
            Every subscription is a pledge. Every delivery is a small revolution. Watch our community's impact grow in real-time.
          </p>
        </div>

        {/* Main Counter */}
        <div className="text-center mb-16 reveal">
          <div className="impact-counter mb-3">
            {bags.toLocaleString("en-IN")}
          </div>
          <p
            className="text-lg font-semibold"
            style={{ color: "hsl(var(--cream-white) / 0.8)" }}
          >
            🛍️ Plastic bags saved by Aavya's community
          </p>
          <div
            className="w-full max-w-md mx-auto h-3 rounded-full mt-6 overflow-hidden"
            style={{ background: "hsl(var(--cream-white) / 0.15)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-2000"
              style={{
                width: `${Math.min((bags / 5000000) * 100, 100)}%`,
                background: "var(--gradient-orange)",
              }}
            />
          </div>
          <p
            className="text-xs mt-2"
            style={{ color: "hsl(var(--cream-white) / 0.5)" }}
          >
            Goal: 50,00,000 bags · {Math.round((bags / 5000000) * 100)}% reached
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal text-center p-5 rounded-2xl"
              style={{
                background: "hsl(var(--cream-white) / 0.06)",
                border: "1px solid hsl(var(--cream-white) / 0.12)",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div
                className="text-2xl font-extrabold mb-1"
                style={{ color: "hsl(var(--sunrise-orange))" }}
              >
                {stat.number}
              </div>
              <div
                className="text-xs leading-tight"
                style={{ color: "hsl(var(--cream-white) / 0.65)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Badge System */}
        <div className="reveal">
          <h3
            className="text-xl font-bold text-center mb-8"
            style={{ color: "hsl(var(--cream-white))" }}
          >
            Earn Your Eco Badge — Aapka Yogdan Matters 🏅
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {badges.map((badge, i) => (
              <div
                key={badge.label}
                className="p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: "hsl(var(--cream-white) / 0.07)",
                  border: `2px solid ${badge.color}40`,
                }}
              >
                <div className="text-5xl mb-3">{badge.emoji}</div>
                <div
                  className="text-lg font-bold mb-1"
                  style={{ color: badge.color }}
                >
                  {badge.label} Eco Warrior
                </div>
                <div
                  className="text-sm"
                  style={{ color: "hsl(var(--cream-white) / 0.65)" }}
                >
                  Save {badge.threshold}+ plastic bags
                </div>
                <div
                  className="mt-4 text-xs px-3 py-1 rounded-full inline-block font-medium"
                  style={{ background: `${badge.color}20`, color: badge.color }}
                >
                  ~{Math.ceil(badge.threshold / 25)} months
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactTracker;
