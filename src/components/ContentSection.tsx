import { useState, useEffect, useRef } from "react";
import vegetablesFresh from "@/assets/vegetables-fresh.jpg";

type Tab = "Health Benefits" | "Farm Stories" | "Eco Impact" | "Recipes";

const articles = [
  {
    tab: "Health Benefits",
    title: "Why Farm-Fresh Spinach Has 3x More Iron Than Store-Bought",
    excerpt: "The moment a vegetable is harvested, its nutrient clock starts ticking. Here's why the 24-hour window changes everything for your family's health.",
    author: "Raju Goud",
    authorRole: "Head Farmer, Aavya",
    readTime: "5 min read",
    emoji: "🌿",
    color: "hsl(var(--earth-green) / 0.08)",
    tag: "Nutrition",
  },
  {
    tab: "Farm Stories",
    title: "Meet Raju: The Farmer Behind Your Daily Vegetables",
    excerpt: "30 years of farming wisdom, calloused hands that know every soil type, and a smile that lights up at 4 AM. This is the man growing your food.",
    author: "Aavya Editorial",
    authorRole: "Farm Correspondent",
    readTime: "8 min read",
    emoji: "🧑‍🌾",
    color: "hsl(var(--deep-brown) / 0.06)",
    tag: "Story",
  },
  {
    tab: "Eco Impact",
    title: "How Aavya Saved 4.2 Lakh Plastic Bags in 6 Months",
    excerpt: "Numbers don't lie. Our jute-bag initiative has been Hyderabad's most impactful zero-waste food program. Here's the full data breakdown.",
    author: "Priya Reddy",
    authorRole: "Sustainability Lead",
    readTime: "6 min read",
    emoji: "♻️",
    color: "hsl(var(--sunrise-orange) / 0.06)",
    tag: "Impact",
  },
  {
    tab: "Recipes",
    title: "5 Recipes That Use Aavya's Winter Box — From Telangana Kitchens",
    excerpt: "Palak dal, drumstick sambar, methi paratha, raw papaya curry, and a secret gongura recipe passed down from our farmer's grandmother.",
    author: "Chef Lakshmi",
    authorRole: "Aavya Recipe Partner",
    readTime: "10 min read",
    emoji: "🍽️",
    color: "hsl(154 41% 30% / 0.06)",
    tag: "Recipe",
  },
  {
    tab: "Eco Impact",
    title: "The Hidden Cost of That ₹20 Tomato at the Supermarket",
    excerpt: "Plastic packaging, cold storage energy, middlemen margins, and chemical ripeners — the true cost of your supermarket tomato is shocking.",
    author: "Dr. Anand Sharma",
    authorRole: "Food Systems Researcher",
    readTime: "7 min read",
    emoji: "🍅",
    color: "hsl(var(--earth-green) / 0.06)",
    tag: "Economy",
  },
  {
    tab: "Health Benefits",
    title: "Ayurvedic Vegetables in Your Daily Aavya Box — A Guide",
    excerpt: "Methi for digestion, drumstick for immunity, bitter gourd for sugar balance — your Aavya box is already an Ayurvedic pharmacy.",
    author: "Dr. Meenakshi",
    authorRole: "Nutritionist Partner",
    readTime: "9 min read",
    emoji: "🌱",
    color: "hsl(var(--sunrise-orange) / 0.06)",
    tag: "Ayurveda",
  },
];

const tabs: Tab[] = ["Health Benefits", "Farm Stories", "Eco Impact", "Recipes"];

const ContentSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Health Benefits");
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = articles.filter((a) => a.tab === activeTab);

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
    <section id="stories" className="py-24 section-cream" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal">
          <div>
            <p className="section-tag">📰 Stories & Knowledge</p>
            <h2 className="section-title">
              From Our Farm,{" "}
              <span style={{ color: "hsl(var(--earth-green))" }}>For Your Life</span>
            </h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={
                  activeTab === tab
                    ? {
                        background: "hsl(var(--earth-green))",
                        color: "hsl(var(--primary-foreground))",
                      }
                    : {
                        background: "hsl(var(--muted))",
                        color: "hsl(var(--muted-foreground))",
                      }
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Featured + Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured */}
          {filtered.length > 0 && (
            <div className="lg:col-span-2 article-card reveal group">
              <div className="relative overflow-hidden" style={{ height: "240px" }}>
                <img
                  src={vegetablesFresh}
                  alt={filtered[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--foreground) / 0.7), transparent)" }} />
                <div
                  className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "hsl(var(--sunrise-orange))", color: "hsl(var(--foreground))" }}
                >
                  {filtered[0].tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 leading-snug" style={{ color: "hsl(var(--foreground))" }}>
                  {filtered[0].title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {filtered[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{ background: "hsl(var(--earth-green) / 0.1)" }}
                    >
                      {filtered[0].emoji}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                        {filtered[0].author}
                      </p>
                      <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {filtered[0].authorRole}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {filtered[0].readTime}
                  </span>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  {["📱 WhatsApp", "🐦 Twitter", "📘 Facebook"].map((s) => (
                    <button
                      key={s}
                      className="text-xs px-3 py-1 rounded-full font-medium transition-colors"
                      style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Side articles */}
          <div className="flex flex-col gap-5">
            {filtered.slice(1).map((article, i) => (
              <div
                key={article.title}
                className="article-card p-5 reveal"
                style={{
                  background: article.color,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "hsl(var(--card))" }}
                  >
                    {article.emoji}
                  </div>
                  <div>
                    <div className="badge-green mb-2">{article.tag}</div>
                    <h4 className="text-sm font-bold leading-snug mb-2" style={{ color: "hsl(var(--foreground))" }}>
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      <span>{article.author}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="text-sm font-semibold py-3 rounded-xl border transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              style={{ borderColor: "hsl(var(--earth-green))", color: "hsl(var(--earth-green))" }}
            >
              Read All {activeTab} Articles →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
