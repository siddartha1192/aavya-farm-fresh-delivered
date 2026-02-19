import { useEffect, useRef, useState } from "react";
import { Users, MapPin, Recycle, Wind, Award } from "lucide-react";

const stats = [
  { icon: Users,   number: "18,420", label: "Subscribers Across Hyderabad" },
  { icon: MapPin,  number: "5",      label: "Active Delivery Zones"        },
  { icon: Recycle, number: "42.1L",  label: "Plastic Bags Eliminated"      },
  { icon: Wind,    number: "21.6T",  label: "Tonnes of CO₂ Offset"         },
];

const tiers = [
  {
    level: "I",
    label: "Bronze",
    sublabel: "Eco Starter",
    threshold: 100,
    months: 4,
    color: "#C8845A",
    borderColor: "rgba(200, 132, 90, 0.3)",
    bgColor: "rgba(200, 132, 90, 0.08)",
  },
  {
    level: "II",
    label: "Silver",
    sublabel: "Eco Advocate",
    threshold: 500,
    months: 20,
    color: "#B0B5BC",
    borderColor: "rgba(176, 181, 188, 0.3)",
    bgColor: "rgba(176, 181, 188, 0.08)",
  },
  {
    level: "III",
    label: "Gold",
    sublabel: "Eco Champion",
    threshold: 1000,
    months: 40,
    color: "#D4A44C",
    borderColor: "rgba(212, 164, 76, 0.3)",
    bgColor: "rgba(212, 164, 76, 0.08)",
  },
];

function useCountUp(target: number, duration = 2200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Smooth section dividers ─────────────────────────────────────── */
// Top wave: fills with the colour of the section ABOVE (bg-background cream)
const TopWave = () => (
  <div
    className="absolute top-0 left-0 w-full overflow-hidden leading-none"
    style={{ height: "72px" }}
    aria-hidden
  >
    <svg
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <path
        d="M0,0 C360,72 1080,0 1440,54 L1440,0 Z"
        fill="hsl(52 95% 97%)"
      />
    </svg>
  </div>
);

// Bottom wave: fills with the colour of the section BELOW (section-cream start)
const BottomWave = () => (
  <div
    className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
    style={{ height: "72px" }}
    aria-hidden
  >
    <svg
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <path
        d="M0,72 C360,0 1080,72 1440,18 L1440,72 Z"
        fill="hsl(52 95% 97%)"
      />
    </svg>
  </div>
);

/* ─── Component ────────────────────────────────────────────────────── */
const ImpactTracker = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const bags = useCountUp(4210000, 2200, started);
  const goalTotal = 5000000;
  const pct = Math.min(Math.round((bags / goalTotal) * 100), 100);

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
      { threshold: 0.25 }
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative"
      style={{
        background: "var(--gradient-earth)",
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      {/* ── Transition waves ── */}
      <TopWave />
      <BottomWave />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* ── Header ── */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "hsl(var(--sunrise-orange))" }}
          >
            Plastic-Free Impact
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
            style={{ color: "hsl(var(--cream-white))" }}
          >
            Together, We're Healing{" "}
            <span style={{ color: "hsl(var(--sunrise-orange))" }}>Hyderabad</span>
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "hsl(52 95% 85%)" }}
          >
            Every subscription is a pledge. Every delivery is a step toward a cleaner city.
          </p>
        </div>

        {/* ── Live Counter ── */}
        <div className="reveal mb-14">
          <div
            className="rounded-2xl px-8 py-10 text-center"
            style={{
              background: "hsl(var(--cream-white) / 0.06)",
              border: "1px solid hsl(var(--cream-white) / 0.14)",
            }}
          >
            <div
              className="font-extrabold leading-none mb-3"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                background: "var(--gradient-orange)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {bags.toLocaleString("en-IN")}
            </div>
            <p
              className="text-sm font-semibold mb-8 uppercase tracking-widest"
              style={{ color: "hsl(52 90% 82%)" }}
            >
              Plastic bags saved by the Aavya community
            </p>

            {/* Progress bar */}
            <div className="max-w-sm mx-auto">
              <div
                className="h-1.5 rounded-full overflow-hidden mb-2.5"
                style={{ background: "hsl(var(--cream-white) / 0.12)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-[2200ms] ease-out"
                  style={{
                    width: `${pct}%`,
                    background: "var(--gradient-orange)",
                  }}
                />
              </div>
              <div className="flex justify-between">
                <span
                  className="text-xs font-bold"
                  style={{ color: "hsl(var(--sunrise-orange))" }}
                >
                  {pct}% reached
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: "hsl(52 80% 72%)" }}
                >
                  Goal: 50,00,000
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Community Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 reveal">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl p-5 text-center"
                style={{
                  background: "hsl(var(--cream-white) / 0.06)",
                  border: "1px solid hsl(var(--cream-white) / 0.12)",
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ background: "hsl(var(--cream-white) / 0.1)" }}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.6}
                    style={{ color: "hsl(var(--sunrise-orange))" }}
                  />
                </div>
                <div
                  className="text-xl font-extrabold tracking-tight mb-1"
                  style={{ color: "hsl(52 95% 95%)" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs font-medium leading-snug"
                  style={{ color: "hsl(52 70% 75%)" }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Tier System ── */}
        <div className="reveal">
          <div className="flex items-center gap-3 mb-8">
            <Award
              size={15}
              strokeWidth={1.6}
              style={{ color: "hsl(var(--sunrise-orange))" }}
            />
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "hsl(52 70% 75%)" }}
            >
              Eco Membership Tiers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.label}
                className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: tier.bgColor,
                  border: `1px solid ${tier.borderColor}`,
                }}
              >
                {/* Level badge + duration pill */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background: `${tier.color}20`,
                      color: tier.color,
                      border: `1px solid ${tier.color}38`,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {tier.level}
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${tier.color}18`,
                      color: tier.color,
                    }}
                  >
                    ~{tier.months} mo
                  </span>
                </div>

                {/* Tier name */}
                <div
                  className="text-base font-bold mb-0.5"
                  style={{ color: tier.color }}
                >
                  {tier.label}
                </div>
                <div
                  className="text-xs font-semibold mb-4 uppercase tracking-wide"
                  style={{ color: "hsl(52 60% 70%)" }}
                >
                  {tier.sublabel}
                </div>

                {/* Divider */}
                <div
                  className="h-px w-full mb-4"
                  style={{ background: `${tier.color}25` }}
                />

                {/* Unlock condition */}
                <p
                  className="text-xs font-medium"
                  style={{ color: "hsl(52 55% 68%)" }}
                >
                  Save{" "}
                  <span
                    style={{ color: "hsl(52 90% 88%)", fontWeight: 700 }}
                  >
                    {tier.threshold}+
                  </span>{" "}
                  plastic bags to unlock
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactTracker;
