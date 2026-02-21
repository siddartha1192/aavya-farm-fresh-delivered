import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

/* ─── Inline SVG illustrations — one per article ─────────────────────── */

// 1. Nutrition — layered leaf with radial glow
const NutritionIllustration = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <circle cx="100" cy="65" r="52" fill={accent} fillOpacity="0.10" />
    <circle cx="100" cy="65" r="36" fill={accent} fillOpacity="0.12" />
    {/* Leaf body */}
    <path d="M100 105 C62 105 44 72 68 46 C80 32 120 32 132 46 C156 72 138 105 100 105Z"
      fill={accent} fillOpacity="0.35" />
    <path d="M100 100 C68 100 52 74 73 51 C83 40 117 40 127 51 C148 74 132 100 100 100Z"
      fill={accent} fillOpacity="0.55" />
    {/* Central vein */}
    <line x1="100" y1="52" x2="100" y2="100" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
    {/* Side veins */}
    <path d="M100 65 Q88 61 83 55" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
    <path d="M100 65 Q112 61 117 55" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
    <path d="M100 78 Q87 73 80 67" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
    <path d="M100 78 Q113 73 120 67" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
    {/* Sun spark */}
    <circle cx="100" cy="30" r="7" fill={accent} fillOpacity="0.5" />
    <line x1="100" y1="19" x2="100" y2="14" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
    <line x1="109" y1="21" x2="113" y2="17" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
    <line x1="91" y1="21" x2="87" y2="17" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
  </svg>
);

// 2. Farm Story — rolling hills + sunrise
const FarmIllustration = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    {/* Sky glow */}
    <ellipse cx="100" cy="55" rx="55" ry="30" fill={accent} fillOpacity="0.12" />
    {/* Sun */}
    <circle cx="100" cy="48" r="16" fill={accent} fillOpacity="0.45" />
    <circle cx="100" cy="48" r="10" fill={accent} fillOpacity="0.75" />
    {/* Sun rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 100 + 19 * Math.cos(rad);
      const y1 = 48 + 19 * Math.sin(rad);
      const x2 = 100 + 26 * Math.cos(rad);
      const y2 = 48 + 26 * Math.sin(rad);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.55" />;
    })}
    {/* Back hill */}
    <path d="M0 100 Q50 68 100 82 Q150 95 200 72 L200 130 L0 130Z" fill={accent} fillOpacity="0.18" />
    {/* Front hill */}
    <path d="M0 115 Q40 85 90 95 Q140 105 200 88 L200 130 L0 130Z" fill={accent} fillOpacity="0.32" />
    {/* Ground band */}
    <rect x="0" y="118" width="200" height="12" fill={accent} fillOpacity="0.45" />
    {/* Small plant sprout */}
    <path d="M100 118 L100 106" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
    <path d="M100 110 C100 110 92 104 90 97" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
    <path d="M100 108 C100 108 108 102 110 95" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
  </svg>
);

// 3. Eco Impact — circular recycling arrows
const RecycleIllustration = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <circle cx="100" cy="65" r="50" fill={accent} fillOpacity="0.08" />
    {/* Three arc arrows forming recycling loop */}
    <path d="M100 22 A45 45 0 0 1 139 87" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
    <path d="M139 87 A45 45 0 0 1 61 87" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
    <path d="M61 87 A45 45 0 0 1 100 22" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
    {/* Arrow heads */}
    <polygon points="100,22 92,34 108,34" fill={accent} fillOpacity="0.8" />
    <polygon points="139,87 130,77 144,78" fill={accent} fillOpacity="0.8" />
    <polygon points="61,87 56,76 70,78" fill={accent} fillOpacity="0.8" />
    {/* Center leaf */}
    <path d="M100 78 C88 78 82 68 88 60 C91 55 109 55 112 60 C118 68 112 78 100 78Z"
      fill={accent} fillOpacity="0.6" />
    <line x1="100" y1="60" x2="100" y2="78" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8" />
  </svg>
);

// 4. Recipe — bowl with steam
const RecipeIllustration = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    {/* Steam wisps */}
    <path d="M75 72 C72 66 78 60 75 54 C72 48 78 42 75 36" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.55" fill="none" />
    <path d="M100 68 C97 62 103 56 100 50 C97 44 103 38 100 32" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.55" fill="none" />
    <path d="M125 72 C122 66 128 60 125 54 C122 48 128 42 125 36" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.55" fill="none" />
    {/* Bowl rim */}
    <ellipse cx="100" cy="85" rx="46" ry="10" fill={accent} fillOpacity="0.35" />
    {/* Bowl body */}
    <path d="M54 85 Q56 112 100 115 Q144 112 146 85Z" fill={accent} fillOpacity="0.28" />
    <path d="M60 85 Q62 108 100 111 Q138 108 140 85Z" fill={accent} fillOpacity="0.18" />
    {/* Spoon */}
    <line x1="148" y1="80" x2="162" y2="58" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
    <ellipse cx="163" cy="55" rx="5" ry="7" stroke={accent} strokeWidth="2" strokeOpacity="0.6" fill="none" transform="rotate(30 163 55)" />
    {/* Contents dots */}
    <circle cx="88" cy="95" r="4" fill={accent} fillOpacity="0.5" />
    <circle cx="100" cy="100" r="4" fill={accent} fillOpacity="0.5" />
    <circle cx="112" cy="95" r="4" fill={accent} fillOpacity="0.5" />
  </svg>
);

// 5. Economy — tomato cross-section
const EconomyIllustration = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    {/* Outer ring */}
    <circle cx="100" cy="65" r="48" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.5" strokeOpacity="0.3" />
    {/* Middle ring */}
    <circle cx="100" cy="65" r="34" fill={accent} fillOpacity="0.20" stroke={accent} strokeWidth="1.5" strokeOpacity="0.4" />
    {/* Inner */}
    <circle cx="100" cy="65" r="20" fill={accent} fillOpacity="0.35" stroke={accent} strokeWidth="1.5" strokeOpacity="0.5" />
    {/* Core */}
    <circle cx="100" cy="65" r="8" fill={accent} fillOpacity="0.65" />
    {/* Tomato spokes */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 100 + 8 * Math.cos(rad);
      const y1 = 65 + 8 * Math.sin(rad);
      const x2 = 100 + 33 * Math.cos(rad);
      const y2 = 65 + 33 * Math.sin(rad);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="1.2" strokeOpacity="0.45" />;
    })}
    {/* Stem */}
    <path d="M100 17 C100 17 100 14 100 12" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
    <path d="M100 16 C97 10 90 8 88 10" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" fill="none" />
    <path d="M100 16 C103 10 110 8 112 10" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" fill="none" />
  </svg>
);

// 6. Ayurveda — petal/lotus motif
const AyurvedaIllustration = ({ accent }: { accent: string }) => (
  <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <circle cx="100" cy="65" r="50" fill={accent} fillOpacity="0.07" />
    {/* 6 petals */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const cx2 = 100 + 28 * Math.cos(rad);
      const cy2 = 65 + 28 * Math.sin(rad);
      return (
        <ellipse
          key={i}
          cx={cx2} cy={cy2}
          rx="14" ry="22"
          fill={accent}
          fillOpacity={i % 2 === 0 ? 0.35 : 0.22}
          stroke={accent}
          strokeWidth="1"
          strokeOpacity="0.4"
          transform={`rotate(${deg + 90} ${cx2} ${cy2})`}
        />
      );
    })}
    {/* Center circle */}
    <circle cx="100" cy="65" r="13" fill={accent} fillOpacity="0.6" />
    <circle cx="100" cy="65" r="7" fill={accent} fillOpacity="0.9" />
    {/* Outer halo */}
    <circle cx="100" cy="65" r="50" stroke={accent} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="4 6" />
  </svg>
);

/* ─── Article data with SVG illustration components ───────────────────── */
const articles = [
  {
    tab: "Health Benefits",
    title: "Why Farm-Fresh Spinach Has 3x More Iron Than Store-Bought",
    excerpt:
      "The moment a vegetable is harvested, its nutrient clock starts ticking. Here's why the 24-hour window changes everything for your family's health.",
    author: "Raju Goud",
    authorRole: "Head Farmer, Aavya",
    readTime: "5 min read",
    Illustration: NutritionIllustration,
    cardBg: "linear-gradient(145deg, hsl(154 41% 22%) 0%, hsl(154 41% 32%) 100%)",
    accent: "hsl(154 55% 62%)",
    tag: "Nutrition",
    tagColor: "hsl(154 41% 28%)",
  },
  {
    tab: "Farm Stories",
    title: "Meet Raju: The Farmer Behind Your Daily Vegetables",
    excerpt:
      "30 years of farming wisdom, calloused hands that know every soil type, and a smile that lights up at 4 AM. This is the man growing your food.",
    author: "Aavya Editorial",
    authorRole: "Farm Correspondent",
    readTime: "8 min read",
    Illustration: FarmIllustration,
    cardBg: "linear-gradient(145deg, hsl(18 41% 24%) 0%, hsl(18 41% 34%) 100%)",
    accent: "hsl(27 70% 62%)",
    tag: "Story",
    tagColor: "hsl(18 45% 35%)",
  },
  {
    tab: "Eco Impact",
    title: "How Aavya Saved 4.2 Lakh Plastic Bags in 6 Months",
    excerpt:
      "Numbers don't lie. Our jute-bag initiative has been Hyderabad's most impactful zero-waste food program. Here's the full data breakdown.",
    author: "Priya Reddy",
    authorRole: "Sustainability Lead",
    readTime: "6 min read",
    Illustration: RecycleIllustration,
    cardBg: "linear-gradient(145deg, hsl(27 75% 28%) 0%, hsl(27 80% 40%) 100%)",
    accent: "hsl(27 88% 65%)",
    tag: "Impact",
    tagColor: "hsl(27 80% 38%)",
  },
  {
    tab: "Recipes",
    title: "5 Recipes That Use Aavya's Winter Box — From Telangana Kitchens",
    excerpt:
      "Palak dal, drumstick sambar, methi paratha, raw papaya curry, and a secret gongura recipe passed down from our farmer's grandmother.",
    author: "Chef Lakshmi",
    authorRole: "Aavya Recipe Partner",
    readTime: "10 min read",
    Illustration: RecipeIllustration,
    cardBg: "linear-gradient(145deg, hsl(35 55% 25%) 0%, hsl(35 55% 36%) 100%)",
    accent: "hsl(35 75% 62%)",
    tag: "Recipe",
    tagColor: "hsl(35 55% 35%)",
  },
  {
    tab: "Eco Impact",
    title: "The Hidden Cost of That ₹20 Tomato at the Supermarket",
    excerpt:
      "Plastic packaging, cold storage energy, middlemen margins, and chemical ripeners — the true cost of your supermarket tomato is shocking.",
    author: "Dr. Anand Sharma",
    authorRole: "Food Systems Researcher",
    readTime: "7 min read",
    Illustration: EconomyIllustration,
    cardBg: "linear-gradient(145deg, hsl(5 55% 26%) 0%, hsl(10 60% 36%) 100%)",
    accent: "hsl(10 72% 62%)",
    tag: "Economy",
    tagColor: "hsl(8 58% 36%)",
  },
  {
    tab: "Health Benefits",
    title: "Ayurvedic Vegetables in Your Daily Aavya Box — A Guide",
    excerpt:
      "Methi for digestion, drumstick for immunity, bitter gourd for sugar balance — your Aavya box is already an Ayurvedic pharmacy.",
    author: "Dr. Meenakshi",
    authorRole: "Nutritionist Partner",
    readTime: "9 min read",
    Illustration: AyurvedaIllustration,
    cardBg: "linear-gradient(145deg, hsl(154 50% 18%) 0%, hsl(154 45% 28%) 100%)",
    accent: "hsl(154 50% 58%)",
    tag: "Ayurveda",
    tagColor: "hsl(154 45% 26%)",
  },
];

const VISIBLE = 3;
const TOTAL = articles.length;
const MAX_INDEX = TOTAL - VISIBLE;

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

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(goNext, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext]);

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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <span
              className="text-sm font-medium tabular-nums"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {currentIndex + 1} / {MAX_INDEX + 1}
            </span>
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--earth-green))";
                (e.currentTarget as HTMLElement).style.background = "hsl(var(--earth-green) / 0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: "hsl(var(--earth-green))", color: "hsl(var(--primary-foreground))" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
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
            {articles.map((article) => {
              const { Illustration } = article;
              return (
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
                      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    {/* ── Illustrated header ── */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        height: "148px",
                        background: article.cardBg,
                      }}
                    >
                      {/* SVG illustration fills the header */}
                      <div
                        className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                        style={{ padding: "12px 20px" }}
                      >
                        <Illustration accent={article.accent} />
                      </div>

                      {/* Category badge — bottom left */}
                      <div
                        className="absolute bottom-3 left-4 text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(0,0,0,0.28)",
                          backdropFilter: "blur(6px)",
                          color: article.accent,
                          border: `1px solid ${article.accent}55`,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {article.tag}
                      </div>

                      {/* Read time — bottom right */}
                      <div
                        className="absolute bottom-3 right-4 text-xs font-medium"
                        style={{ color: `${article.accent}cc` }}
                      >
                        {article.readTime}
                      </div>
                    </div>

                    {/* ── Card body ── */}
                    <div className="p-5 flex flex-col" style={{ minHeight: "190px" }}>
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

                      {/* Author row */}
                      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={{
                              background: article.accent + "22",
                              color: article.accent,
                              border: `1px solid ${article.accent}44`,
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
                              {article.authorRole}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ color: article.accent }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={goPrev}
              className="w-9 h-9 rounded-full border flex items-center justify-center"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
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
