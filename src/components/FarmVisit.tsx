import { useEffect, useRef } from "react";
import farmerRaju from "@/assets/farmer-raju.jpg";
import heroFarm from "@/assets/hero-farm.jpg";
import vegetablesFresh from "@/assets/vegetables-fresh.jpg";

const farmers = [
  {
    name: "Raju Goud",
    specialty: "Leafy Greens & Spinach",
    experience: "30 Years",
    quote: "I wake up at 3 AM every day — not because I have to, but because my vegetables deserve it.",
    emoji: "🥬",
  },
  {
    name: "Krishnaiah",
    specialty: "Root Vegetables & Gourds",
    experience: "22 Years",
    quote: "The soil remembers everything. Treat it well and it will feed a thousand families.",
    emoji: "🥕",
  },
  {
    name: "Ramulamma",
    specialty: "Tomatoes & Capsicum",
    experience: "18 Years",
    quote: "My tomatoes are my children. I know each variety by taste, not just by sight.",
    emoji: "🍅",
  },
];


const FarmVisit = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="our-farm" className="py-24 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <p className="section-tag">🚜 Our Farm</p>
          <h2 className="section-title">
            1000 Acres of{" "}
            <span style={{ color: "hsl(var(--earth-green))" }}>Transparency</span>
          </h2>
          <p className="section-subtitle">
            Our farm is your farm. Walk through the fields, meet the farmers, and eat lunch in the farmhouse. No secrets, ever. Aapka swagat hai!
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 reveal">
          <div className="md:col-span-2 rounded-3xl overflow-hidden" style={{ height: "320px" }}>
            <img src={heroFarm} alt="Aavya Farm" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl overflow-hidden flex-1">
              <img src={farmerRaju} alt="Farmer Raju" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div
              className="rounded-3xl p-5 flex items-center justify-center flex-1 text-center"
              style={{ background: "var(--gradient-earth)" }}
            >
              <div>
                <div className="text-3xl mb-2">📹</div>
                <p className="text-sm font-semibold" style={{ color: "hsl(var(--cream-white))" }}>
                  Live Farm Camera
                </p>
                <p className="text-xs mt-1" style={{ color: "hsl(var(--cream-white) / 0.6)" }}>
                  Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Farm Visit CTA */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 reveal"
          style={{ background: "hsl(var(--earth-green) / 0.06)", border: "1px solid hsl(var(--earth-green) / 0.2)" }}
        >
          <div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: "hsl(var(--earth-green))" }}>
              Book a Farm Visit 🌾
            </h3>
            <p className="text-sm leading-relaxed max-w-lg" style={{ color: "hsl(var(--muted-foreground))" }}>
              Bring your family on a weekend. See vegetables being harvested at sunrise, learn composting from our farmers, enjoy a farm breakfast, and understand exactly what Aavya means — seedha khet se.
            </p>
            <div className="flex gap-4 mt-4 text-sm">
              {["🚌 Transport Included", "🍽️ Farm Breakfast", "📸 Harvest Experience"].map((f) => (
                <span key={f} className="badge-green">{f}</span>
              ))}
            </div>
          </div>
          <button className="btn-orange flex-shrink-0 whitespace-nowrap">
            📅 Book Visit
          </button>
        </div>

        {/* Farmer Profiles */}
        <div className="reveal">
          <h3 className="text-2xl font-bold text-center mb-8">
            Meet the Hands Behind Your Food
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {farmers.map((farmer, i) => (
              <div
                key={farmer.name}
                className="card-organic text-center reveal"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ background: "hsl(var(--earth-green) / 0.1)" }}
                >
                  {farmer.emoji}
                </div>
                <h4 className="font-bold text-base mb-1">{farmer.name}</h4>
                <p className="text-xs font-semibold mb-1" style={{ color: "hsl(var(--earth-green))" }}>
                  {farmer.specialty}
                </p>
                <p className="badge-green mb-4 inline-block">{farmer.experience} Experience</p>
                <p className="text-sm italic leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  "{farmer.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmVisit;
