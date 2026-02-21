import { useEffect, useRef, useState } from "react";
import { Users, MapPin, Recycle, Wind, Leaf, ShieldCheck, Crown } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "18,420",
    label: "Subscribers Across Hyderabad",
    accent: "hsl(154 45% 62%)",
    bg: "hsl(154 41% 50% / 0.22)",
    border: "hsl(154 41% 50% / 0.35)",
    glow: "hsl(154 41% 40% / 0.45)",
  },
  {
    icon: MapPin,
    number: "5",
    label: "Active Delivery Zones",
    accent: "hsl(27 88% 68%)",
    bg: "hsl(27 88% 66% / 0.22)",
    border: "hsl(27 88% 66% / 0.35)",
    glow: "hsl(27 88% 60% / 0.45)",
  },
  {
    icon: Recycle,
    number: "42.1L",
    label: "Plastic Bags Eliminated",
    accent: "hsl(172 45% 58%)",
    bg: "hsl(172 45% 52% / 0.2)",
    border: "hsl(172 45% 52% / 0.35)",
    glow: "hsl(172 45% 45% / 0.45)",
  },
  {
    icon: Wind,
    number: "21.6T",
    label: "Tonnes of CO₂ Offset",
    accent: "hsl(210 55% 68%)",
    bg: "hsl(210 55% 62% / 0.2)",
    border: "hsl(210 55% 62% / 0.35)",
    glow: "hsl(210 55% 55% / 0.45)",
  },
];

const tiers = [
  {
    level: "I",
    Icon: Leaf,
    label: "Bronze",
    sublabel: "Eco Starter",
    threshold: 100,
    months: 4,
    color: "#CD8B5A",
    gradient:
      "linear-gradient(145deg, rgba(205, 139, 90, 0.28) 0%, rgba(205, 139, 90, 0.10) 100%)",
    border: "rgba(205, 139, 90, 0.50)",
    glow: "0 0 24px rgba(205, 139, 90, 0.35), 0 4px 16px rgba(205, 139, 90, 0.2)",
    iconBg: "rgba(205, 139, 90, 0.22)",
    description: "Plant your first seeds of eco-consciousness",
  },
  {
    level: "II",
    Icon: ShieldCheck,
    label: "Silver",
    sublabel: "Eco Advocate",
    threshold: 500,
    months: 20,
    color: "#A8B8CA",
    gradient:
      "linear-gradient(145deg, rgba(168, 184, 202, 0.28) 0%, rgba(168, 184, 202, 0.10) 100%)",
    border: "rgba(168, 184, 202, 0.50)",
    glow: "0 0 24px rgba(168, 184, 202, 0.35), 0 4px 16px rgba(168, 184, 202, 0.2)",
    iconBg: "rgba(168, 184, 202, 0.22)",
    description: "Inspire others with your commitment to zero waste",
  },
  {
    level: "III",
    Icon: Crown,
    label: "Gold",
    sublabel: "Eco Champion",
    threshold: 1000,
    months: 40,
    color: "#D4A44C",
    gradient:
      "linear-gradient(145deg, rgba(212, 164, 76, 0.32) 0%, rgba(212, 164, 76, 0.12) 100%)",
    border: "rgba(212, 164, 76, 0.55)",
    glow: "0 0 28px rgba(212, 164, 76, 0.4), 0 4px 20px rgba(212, 164, 76, 0.25)",
    iconBg: "rgba(212, 164, 76, 0.24)",
    description: "Lead Hyderabad's green movement as an eco champion",
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
      <path d="M0,0 C360,72 1080,0 1440,54 L1440,0 Z" fill="hsl(52 95% 97%)" />
    </svg>
  </div>
);

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
      <path d="M0,72 C360,0 1080,72 1440,18 L1440,72 Z" fill="hsl(52 95% 97%)" />
    </svg>
  </div>
);

const ImpactTracker = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
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
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) =>
      observer.observe(el)
    );
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
            <div className="max-w-sm mx-auto">
              <div
                className="h-1.5 rounded-full overflow-hidden mb-2.5"
                style={{ background: "hsl(var(--cream-white) / 0.12)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-[2200ms] ease-out"
                  style={{ width: `${pct}%`, background: "var(--gradient-orange)" }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-bold" style={{ color: "hsl(var(--sunrise-orange))" }}>
                  {pct}% reached
                </span>
                <span className="text-xs font-medium" style={{ color: "hsl(52 80% 72%)" }}>
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
            const isHovered = hoveredStat === i;
            return (
              <div
                key={stat.label}
                className="rounded-xl p-5 text-center cursor-default"
                style={{
                  background: isHovered ? stat.bg : "hsl(var(--cream-white) / 0.06)",
                  border: `1px solid ${isHovered ? stat.border : "hsl(var(--cream-white) / 0.12)"}`,
                  transform: isHovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                  boxShadow: isHovered ? `0 8px 28px ${stat.glow}` : "none",
                  transition: "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-250"
                  style={{
                    background: isHovered ? stat.bg : "hsl(var(--cream-white) / 0.1)",
                    border: `1.5px solid ${isHovered ? stat.border : "transparent"}`,
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    style={{
                      color: isHovered ? stat.accent : "hsl(var(--sunrise-orange))",
                      transition: "color 0.25s",
                    }}
                  />
                </div>
                <div
                  className="text-xl font-extrabold tracking-tight mb-1 transition-colors duration-250"
                  style={{ color: isHovered ? stat.accent : "hsl(52 95% 95%)" }}
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
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: "hsl(var(--sunrise-orange) / 0.2)" }}
            >
              <Crown size={12} strokeWidth={2} style={{ color: "hsl(var(--sunrise-orange))" }} />
            </div>
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "hsl(52 70% 75%)" }}
            >
              Eco Membership Tiers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((tier, i) => {
              const TierIcon = tier.Icon;
              const isHovered = hoveredTier === i;
              return (
                <div
                  key={tier.label}
                  className="rounded-2xl p-6 cursor-default"
                  style={{
                    background: tier.gradient,
                    border: `1.5px solid ${isHovered ? tier.border : tier.border.replace("0.50", "0.28")}`,
                    boxShadow: isHovered ? tier.glow : "none",
                    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                    transition: "all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                  onMouseEnter={() => setHoveredTier(i)}
                  onMouseLeave={() => setHoveredTier(null)}
                >
                  {/* Icon + duration row */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-250"
                      style={{
                        background: tier.iconBg,
                        border: `1.5px solid ${tier.border}`,
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      <TierIcon
                        size={22}
                        strokeWidth={2}
                        style={{ color: tier.color }}
                      />
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        background: `${tier.color}22`,
                        color: tier.color,
                        border: `1px solid ${tier.color}40`,
                      }}
                    >
                      ~{tier.months} mo
                    </span>
                  </div>

                  {/* Tier name */}
                  <div
                    className="text-lg font-extrabold mb-0.5 tracking-tight"
                    style={{ color: tier.color }}
                  >
                    {tier.label}
                  </div>
                  <div
                    className="text-xs font-bold mb-3 uppercase tracking-widest"
                    style={{ color: "hsl(52 60% 70%)", letterSpacing: "0.1em" }}
                  >
                    {tier.sublabel}
                  </div>

                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: "hsl(52 55% 68%)" }}
                  >
                    {tier.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="h-px w-full mb-4"
                    style={{ background: `${tier.color}30` }}
                  />

                  {/* Unlock threshold */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium" style={{ color: "hsl(52 55% 68%)" }}>
                      Save{" "}
                      <span style={{ color: "hsl(52 90% 88%)", fontWeight: 700 }}>
                        {tier.threshold}+
                      </span>{" "}
                      bags to unlock
                    </p>
                    {/* Mini progress bar */}
                    <div
                      className="h-1 rounded-full overflow-hidden"
                      style={{ width: "60px", background: `${tier.color}20` }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: isHovered ? "60%" : "0%",
                          background: tier.color,
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactTracker;
