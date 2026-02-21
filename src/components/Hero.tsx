import heroFarm from "@/assets/hero-farm.jpg";
import { ArrowRight, Play, Leaf, PackageX, Clock, Users } from "lucide-react";

interface HeroProps {
  onSubscribeClick: () => void;
}

const trustBadges = [
  { icon: Leaf, text: "Chemical-Free" },
  { icon: PackageX, text: "Zero Plastic" },
  { icon: Clock, text: "6 AM Delivery" },
  { icon: Users, text: "Direct Farmer" },
];

const Hero = ({ onSubscribeClick }: HeroProps) => {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <img
          src={heroFarm}
          alt="Aavya Farmland — 1000 acres of lush green fields in Hyderabad"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, hsl(154 45% 8% / 0.92) 0%, hsl(154 45% 8% / 0.65) 40%, hsl(154 45% 8% / 0.25) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content — pinned to bottom ── */}
      <div className="relative z-10 container mx-auto px-6 pb-24 pt-40 max-w-5xl">
        {/* Eyebrow tag */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 animate-fade-up"
          style={{
            background: "hsl(27 88% 66% / 0.15)",
            border: "1px solid hsl(27 88% 66% / 0.4)",
          }}
        >
          <Leaf size={14} className="text-secondary" />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "hsl(27 88% 66%)" }}
          >
            Farm to Family — Fresh in 24 Hours
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span
            className="block text-white"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            1000 Acres of Freshness,
          </span>
          <span
            className="block mt-1"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "hsl(27 88% 66%)",
            }}
          >
            Delivered Before Sunrise
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-white/70 mb-8 max-w-xl animate-fade-up"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
            lineHeight: 1.6,
            animationDelay: "0.2s",
          }}
        >
          No middlemen. No plastic. No compromise.
          <br className="hidden sm:block" />
          <span className="text-white/50">
            Seedha khet se, aapke ghar tak — Hyderabad's freshest vegetables.
          </span>
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <button onClick={onSubscribeClick} className="btn-primary group">
            Start Your Subscription
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
            style={{
              background: "hsl(0 0% 100% / 0.1)",
              border: "1px solid hsl(0 0% 100% / 0.25)",
              color: "white",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "hsl(0 0% 100% / 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "hsl(0 0% 100% / 0.1)";
            }}
          >
            <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            See Our Farm
          </button>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap gap-3 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {trustBadges.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "hsl(0 0% 100% / 0.08)",
                border: "1px solid hsl(0 0% 100% / 0.15)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Icon size={14} strokeWidth={2} style={{ color: "hsl(27 88% 66%)" }} />
              <span className="text-xs font-medium tracking-wide text-white/80">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
