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
      {/* ── Background image — boosted brightness ── */}
      <div className="absolute inset-0">
        <img
          src={heroFarm}
          alt="Aavya Farmland — 1000 acres of lush green fields in Hyderabad"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.1) saturate(1.2)" }}
        />
        {/* Clean dark-to-transparent gradient — not green-tinted */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.18) 65%, transparent 100%)",
            ].join(", "),
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6 pb-28 pt-40 max-w-5xl">
        {/* Eyebrow tag */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 animate-fade-up"
          style={{
            background: "rgba(244, 162, 97, 0.2)",
            border: "1px solid rgba(244, 162, 97, 0.5)",
          }}
        >
          <Leaf size={14} style={{ color: "#F4A261" }} />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#F4A261" }}
          >
            Farm to Family — Fresh in 24 Hours
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span
            className="block"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            1000 Acres of Freshness,
          </span>
          <span
            className="block mt-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#F4A261",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            Delivered Before Sunrise
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="mb-9 max-w-xl animate-fade-up"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            animationDelay: "0.2s",
          }}
        >
          No middlemen. No plastic. No compromise.
          <br className="hidden sm:block" />
          <span style={{ color: "rgba(255,255,255,0.65)" }}>
            Seedha khet se, aapke ghar tak — Hyderabad's freshest vegetables.
          </span>
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            onClick={onSubscribeClick}
            className="group inline-flex items-center gap-2 px-9 py-4 rounded-full font-semibold text-base transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #F4A261, #E76F51)",
              color: "#FFFFFF",
              boxShadow: "0 6px 24px rgba(244, 162, 97, 0.45)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 32px rgba(244, 162, 97, 0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(244, 162, 97, 0.45)";
            }}
          >
            Start Your Subscription
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              border: "1.5px solid rgba(255, 255, 255, 0.4)",
              color: "#FFFFFF",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
              e.currentTarget.style.transform = "translateY(0)";
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon size={15} strokeWidth={2} style={{ color: "#F4A261" }} />
              <span
                className="text-xs font-semibold tracking-wide"
                style={{ color: "rgba(255, 255, 255, 0.92)" }}
              >
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
