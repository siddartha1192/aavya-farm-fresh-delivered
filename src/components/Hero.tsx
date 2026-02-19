import heroFarm from "@/assets/hero-farm.jpg";
import { ArrowRight, Play } from "lucide-react";

interface HeroProps {
  onSubscribeClick: () => void;
}

const trustBadges = [
  { emoji: "🌱", text: "Chemical-Free" },
  { emoji: "♻️", text: "Zero Plastic" },
  { emoji: "🚴", text: "6AM Delivery" },
  { emoji: "🧑‍🌾", text: "Direct Farmer" },
];

const Hero = ({ onSubscribeClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroFarm}
          alt="Aavya Farmland"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      {/* Floating Leaf Emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute text-4xl float-leaf opacity-40" style={{ top: "15%", left: "8%" }}>🥬</span>
        <span className="absolute text-3xl float-leaf-delay opacity-30" style={{ top: "25%", right: "12%" }}>🍅</span>
        <span className="absolute text-3xl float-leaf-delay2 opacity-35" style={{ bottom: "30%", left: "15%" }}>🥕</span>
        <span className="absolute text-2xl float-leaf opacity-25" style={{ top: "60%", right: "8%" }}>🫑</span>
        <span className="absolute text-4xl float-leaf-delay opacity-20" style={{ bottom: "20%", right: "20%" }}>🌿</span>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        {/* Tag */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-up"
          style={{
            background: "hsl(var(--sunrise-orange) / 0.2)",
            border: "1px solid hsl(var(--sunrise-orange) / 0.4)",
            color: "hsl(var(--sunrise-orange))",
          }}
        >
          🌾 Seedha Khet Se — Hyderabad's Freshest Delivery
        </div>

        {/* Headline */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up"
          style={{
            color: "hsl(var(--cream-white))",
            animationDelay: "0.1s",
          }}
        >
          1000 Acres of Freshness,
          <br />
          <span style={{ color: "hsl(var(--sunrise-orange))" }}>
            Delivered Before Sunrise
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg md:text-xl mb-4 animate-fade-up"
          style={{
            color: "hsl(var(--cream-white) / 0.85)",
            animationDelay: "0.2s",
          }}
        >
          No middlemen. No plastic. No compromise.
        </p>
        <p
          className="text-base mb-10 animate-fade-up"
          style={{
            color: "hsl(var(--cream-white) / 0.65)",
            animationDelay: "0.3s",
          }}
        >
          From Our Farm to Your Family — Fresh in 24 Hours
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
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

        {/* Trust Badges */}
        <div
          className="flex flex-wrap justify-center gap-3 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          {trustBadges.map((badge) => (
            <div key={badge.text} className="badge-trust">
              <span>{badge.emoji}</span>
              <span className="text-xs font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
