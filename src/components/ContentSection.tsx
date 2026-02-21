import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Clock, ArrowUpRight } from "lucide-react";
import vegetablesFresh from "@/assets/vegetables-fresh.jpg";

const articles = [
  {
    tab: "Health Benefits",
    title: "Why Farm-Fresh Spinach Has 3x More Iron Than Store-Bought",
    excerpt:
      "The moment a vegetable is harvested, its nutrient clock starts ticking. Here's why the 24-hour window changes everything for your family's health.",
    author: "Raju Goud",
    authorRole: "Head Farmer, Aavya",
    readTime: "5 min read",
    emoji: "🌿",
    color: "hsl(154 41% 30% / 0.08)",
    accentColor: "hsl(154 41% 28%)",
    tag: "Nutrition",
  },
  {
    tab: "Farm Stories",
    title: "Meet Raju: The Farmer Behind Your Daily Vegetables",
    excerpt:
      "30 years of farming wisdom, calloused hands that know every soil type, and a smile that lights up at 4 AM. This is the man growing your food.",
    author: "Aavya Editorial",
    authorRole: "Farm Correspondent",
    readTime: "8 min read",
    emoji: "🧑‍🌾",
    color: "hsl(18 41% 32% / 0.07)",
    accentColor: "hsl(18 41% 38%)",
    tag: "Story",
  },
  {
    tab: "Eco Impact",
    title: "How Aavya Saved 4.2 Lakh Plastic Bags in 6 Months",
    excerpt:
      "Numbers don't lie. Our jute-bag initiative has been Hyderabad's most impactful zero-waste food program. Here's the full data breakdown.",
    author: "Priya Reddy",
    authorRole: "Sustainability Lead",
    readTime: "6 min read",
    emoji: "♻️",
    color: "hsl(27 88% 66% / 0.08)",
    accentColor: "hsl(27 80% 48%)",
    tag: "Impact",
  },
  {
    tab: "Recipes",
    title: "5 Recipes That Use Aavya's Winter Box — From Telangana Kitchens",
    excerpt:
      "Palak dal, drumstick sambar, methi paratha, raw papaya curry, and a secret gongura recipe passed down from our farmer's grandmother.",
    author: "Chef Lakshmi",
    authorRole: "Aavya Recipe Partner",
    readTime: "10 min read",
    emoji: "🍽️",
    color: "hsl(154 41% 30% / 0.07)",
    accentColor: "hsl(154 41% 28%)",
    tag: "Recipe",
  },
  {
    tab: "Eco Impact",
    title: "The Hidden Cost of That ₹20 Tomato at the Supermarket",
    excerpt:
      "Plastic packaging, cold storage energy, middlemen margins, and chemical ripeners — the true cost of your supermarket tomato is shocking.",
    author: "Dr. Anand Sharma",
    authorRole: "Food Systems Researcher",
    readTime: "7 min read",
    emoji: "🍅",
    color: "hsl(27 88% 66% / 0.08)",
    accentColor: "hsl(27 80% 48%)",
    tag: "Economy",
  },
  {
    tab: "Health Benefits",
    title: "Ayurvedic Vegetables in Your Daily Aavya Box — A Guide",
    excerpt:
      "Methi for digestion, drumstick for immunity, bitter gourd for sugar balance — your Aavya box is already an Ayurvedic pharmacy.",
    author: "Dr. Meenakshi",
    authorRole: "Nutritionist Partner",
    readTime: "9 min read",
    emoji: "🌱",
    color: "hsl(154 41% 30% / 0.08)",
    accentColor: "hsl(154 41% 28%)",
    tag: "Ayurveda",
  },
];

const VISIBLE = 3;
const TOTAL = articles.length;
const MAX_INDEX = TOTAL - VISIBLE; // 3

const ContentSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= MAX_INDEX ? 0 : prev + 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? MAX_INDEX : prev - 1));
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(goNext, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  // Swipe/drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setIsPaused(true);
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    const delta = dragStartX - clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? goNext() : goPrev();
    }
    setIsDragging(false);
    setIsPaused(false);
  };

  // Transform: move track by (currentIndex / TOTAL) * 100% of track width
  // Since track = 200% of container (6 cards × 33.33%), 1 card = 16.67% of track
  const trackOffset = (currentIndex / TOTAL) * 100;

  return (
    <section
      id="stories"
      className="py-24 section-cream overflow-hidden"
      ref={sectionRef}
    >
      <div className="container mx-auto px-6">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal">
          <div>
            <p className="section-tag">Stories & Knowledge</p>
            <h2 className="section-title">
              From Our Farm,{" "}
              <span style={{ color: "hsl(var(--earth-green))" }}>
                For Your Life
              </span>
            </h2>
            <p
              className="mt-3 text-sm max-w-md"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Real stories from the field, science-backed nutrition, and recipes
              from Telangana's best home kitchens.
            </p>
          </div>

          {/* Nav controls — desktop */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <span
              className="text-sm font-medium tabular-nums"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {currentIndex + 1} / {MAX_INDEX + 1}
            </span>
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 hover:border-earth-green"
              style={{
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "hsl(var(--earth-green))";
                (e.currentTarget as HTMLElement).style.background =
                  "hsl(var(--earth-green) / 0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "hsl(var(--border))";
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "hsl(var(--earth-green))",
                color: "hsl(var(--primary-foreground))",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Carousel Track ── */}
        <div
          className="overflow-hidden reveal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
          style={{ cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}
        >
          <div
            style={{
              display: "flex",
              width: `${(TOTAL / VISIBLE) * 100}%`,
              transform: `translateX(-${trackOffset}%)`,
              transition: "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {articles.map((article, i) => (
              <div
                key={article.title}
                style={{
                  width: `${100 / TOTAL}%`,
                  padding: "0 10px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  className="h-full rounded-2xl overflow-hidden border transition-all duration-300 group"
                  style={{
                    background: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    boxShadow: "var(--shadow-sm)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "var(--shadow-md)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "var(--shadow-sm)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  {/* Card color band */}
                  <div
                    className="h-36 flex items-center justify-center relative overflow-hidden"
                    style={{ background: article.color }}
                  >
                    <span
                      className="text-5xl select-none"
                      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }}
                    >
                      {article.emoji}
                    </span>
                    {/* Category badge */}
                    <div
                      className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: article.accentColor,
                        color: "#fff",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {article.tag}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col" style={{ minHeight: "220px" }}>
                    <h3
                      className="text-sm font-bold leading-snug mb-2 flex-shrink-0"
                      style={{
                        color: "hsl(var(--foreground))",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed mb-4 flex-1"
                      style={{
                        color: "hsl(var(--muted-foreground))",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                          style={{
                            background: article.accentColor + "1a",
                            color: article.accentColor,
                            fontWeight: 700,
                          }}
                        >
                          {article.author.charAt(0)}
                        </div>
                        <div>
                          <p
                            className="text-xs font-semibold leading-tight"
                            style={{ color: "hsl(var(--foreground))" }}
                          >
                            {article.author}
                          </p>
                          <p
                            className="text-xs leading-tight"
                            style={{ color: "hsl(var(--muted-foreground))" }}
                          >
                            {article.readTime}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: article.accentColor }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom controls ── */}
        <div className="flex items-center justify-between mt-8 reveal">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === currentIndex ? "28px" : "8px",
                  height: "8px",
                  background:
                    i === currentIndex
                      ? "hsl(var(--earth-green))"
                      : "hsl(var(--border))",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile nav buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={goPrev}
              className="w-9 h-9 rounded-full border flex items-center justify-center"
              style={{
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goNext}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "hsl(var(--earth-green))",
                color: "hsl(var(--primary-foreground))",
              }}
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Progress bar */}
          <div
            className="hidden md:block h-0.5 rounded-full overflow-hidden"
            style={{ width: "120px", background: "hsl(var(--border))" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${((currentIndex + 1) / (MAX_INDEX + 1)) * 100}%`,
                background: "hsl(var(--earth-green))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
