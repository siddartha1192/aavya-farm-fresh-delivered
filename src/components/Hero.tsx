import heroFarm from "@/assets/hero-farm.jpg";
import { ArrowRight, Play, Leaf, PackageX, Clock, Users } from "lucide-react";

interface HeroProps {
  onSubscribeClick: () => void;
}

const trustBadges = [
  { icon: Leaf,     text: "Chemical-Free" },
  { icon: PackageX, text: "Zero Plastic"  },
  { icon: Clock,    text: "6 AM Delivery" },
  { icon: Users,    text: "Direct Farmer" },
];

const Hero = ({ onSubscribeClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background image — full brightness, no dark overlay ── */}
      <div className="absolute inset-0">
        <img
          src={heroFarm}
          alt="Aavya Farmland"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.25) saturate(1.15)" }}
        />
        {/* Subtle warm spotlight — adds atmospheric depth without darkening */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 38%, hsl(45 90% 95% / 0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-24 pb-32 max-w-4xl">

        {/* Headline */}
        <h1
          className="leading-tight mb-5 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Line 1 — Poppins semi-bold: solid, structured, uppercase anchor */}
          <span
            className="block"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
              letterSpacing: "0.10em",
              color: "#ffffff",
              textShadow: "0 1px 3px rgba(0,0,0,0.95), 0 3px 10px rgba(0,0,0,0.80), 0 6px 30px rgba(0,0,0,0.55)",
              textTransform: "uppercase",
            }}
          >
            1000 Acres of Freshness
          </span>

          {/* Line 2 — Playfair Display italic bold: elegant serif contrast, pure white */}
          <span
            className="block"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
              letterSpacing: "-0.01em",
              color: "#ffffff",
              textShadow: "0 1px 3px rgba(0,0,0,0.95), 0 3px 12px rgba(0,0,0,0.80), 0 8px 36px rgba(0,0,0,0.50)",
              lineHeight: 1.15,
            }}
          >
            Delivered Before Sunrise
          </span>
        </h1>

        {/* Single, punchy sub-headline */}
        <p
          className="mb-10 animate-fade-up"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            textShadow: "0 1px 3px rgba(0,0,0,0.95), 0 2px 12px rgba(0,0,0,0.75)",
            animationDelay: "0.2s",
          }}
        >
          No middlemen · No plastic · No compromise
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <button onClick={onSubscribeClick} className="btn-primary group">
            Start Your Subscription
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="btn-secondary group">
            <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            See Our Farm
          </button>
        </div>

        {/* Trust badges — Lucide icons, no emojis */}
        <div
          className="flex flex-wrap justify-center gap-3 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {trustBadges.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.38)",
                color: "#ffffff",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon size={13} strokeWidth={1.8} style={{ color: "hsl(var(--sunrise-orange))" }} />
              <span className="text-xs font-semibold tracking-wide">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom wave into the next section ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
