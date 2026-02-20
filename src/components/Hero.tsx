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

      {/* ── Background image — lighter overlay so the farm breathes ── */}
      <div className="absolute inset-0">
        <img
          src={heroFarm}
          alt="Aavya Farmland"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.08) saturate(1.1)" }}
        />
        {/* Lighter, centred vignette — reveals the sky & greenery */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(154 41% 12% / 0.38) 0%, hsl(154 35% 10% / 0.60) 55%, hsl(18 41% 12% / 0.78) 100%)",
          }}
        />
        {/* Subtle warm spotlight in the centre to lift brightness */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, hsl(45 90% 90% / 0.10) 0%, transparent 70%)",
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
          {/* Line 1 — light weight Poppins, airy & editorial */}
          <span
            className="block"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 5.5vw, 4.2rem)",
              letterSpacing: "0.06em",
              color: "hsl(52 90% 93%)",
              textShadow: "0 2px 24px hsl(154 41% 10% / 0.45)",
              textTransform: "uppercase",
            }}
          >
            1000 Acres of Freshness
          </span>

          {/* Line 2 — Playfair Display italic, warm orange, premium serif accent */}
          <span
            className="block"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
              letterSpacing: "-0.01em",
              color: "hsl(var(--sunrise-orange))",
              textShadow: "0 4px 32px hsl(27 80% 45% / 0.40)",
              lineHeight: 1.15,
            }}
          >
            Delivered Before Sunrise
          </span>
        </h1>

        {/* Single, punchy sub-headline */}
        <p
          className="font-light mb-10 animate-fade-up"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "hsl(52 70% 82%)",
            textShadow: "0 1px 12px hsl(154 41% 10% / 0.4)",
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
                background: "hsl(var(--cream-white) / 0.10)",
                border: "1px solid hsl(var(--cream-white) / 0.22)",
                color: "hsl(var(--cream-white))",
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
