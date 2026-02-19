import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Priya Mehta",
    location: "Gachibowli",
    rating: 5,
    text: "I switched to Aavya 8 months ago and I genuinely cannot go back to supermarket vegetables. The spinach alone has changed my morning smoothie completely. My hemoglobin has improved — doctor confirmed!",
    plan: "Family Pack",
    saved: "240 bags",
  },
  {
    name: "Ramesh Babu",
    location: "Madhapur",
    rating: 5,
    text: "Delivery at 6:15 AM, every single day. No excuses, no delays. The vegetables are still cool from the morning mist when they arrive. This is what farm-fresh actually means.",
    plan: "Premium Organic",
    saved: "480 bags",
  },
  {
    name: "Kavitha Reddy",
    location: "Kondapur",
    rating: 5,
    text: "The farm visit we booked was magical. My kids held freshly picked tomatoes and couldn't believe food comes from actual soil. Aavya is not just delivering vegetables — they're delivering values.",
    plan: "Daily Essentials",
    saved: "180 bags",
  },
  {
    name: "Dr. Suresh Iyer",
    location: "Banjara Hills",
    rating: 5,
    text: "As a nutritionist I recommend Aavya to my patients. The 24-hour harvest-to-home cycle preserves nutrients that commercial supply chains destroy in 3–7 days of storage.",
    plan: "Premium Organic",
    saved: "600 bags",
  },
  {
    name: "Ananya Singh",
    location: "Jubilee Hills",
    rating: 5,
    text: "Zero plastic, zero stress. The jute bags are beautiful. My neighbors ask about the branding on my doorstep every morning. It's become a lifestyle statement honestly!",
    plan: "Family Pack",
    saved: "350 bags",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const t = testimonials[activeIndex];

  return (
    <section className="py-24 section-cream" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <p className="section-tag">💬 What Hyderabad Says</p>
          <h2 className="section-title">
            Real Families,{" "}
            <span style={{ color: "hsl(var(--earth-green))" }}>Real Stories</span>
          </h2>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-3 gap-4 mb-16 reveal">
          {[
            { number: "98%", label: "On-Time Delivery" },
            { number: "4.8/5", label: "Customer Rating" },
            { number: "2%", label: "Return Rate" },
          ].map((m) => (
            <div
              key={m.label}
              className="text-center p-6 rounded-2xl"
              style={{ background: "hsl(var(--earth-green) / 0.06)", border: "1px solid hsl(var(--earth-green) / 0.15)" }}
            >
              <div
                className="text-3xl font-extrabold mb-1"
                style={{ color: "hsl(var(--earth-green))" }}
              >
                {m.number}
              </div>
              <div className="text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto reveal">
          <div className="testimonial-card text-center">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array(t.rating).fill("⭐").map((s, i) => (
                <span key={i} className="text-lg">{s}</span>
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="text-lg md:text-xl font-medium leading-relaxed mb-8 italic"
              style={{ color: "hsl(var(--foreground))" }}
            >
              "{t.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                style={{ background: "var(--gradient-green)", color: "hsl(var(--primary-foreground))" }}
              >
                {t.name[0]}
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  📍 {t.location} · {t.plan}
                </p>
              </div>
              <div className="ml-4 badge-green">
                ♻️ {t.saved} saved
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? "24px" : "8px",
                  height: "8px",
                  background:
                    i === activeIndex
                      ? "hsl(var(--earth-green))"
                      : "hsl(var(--earth-green) / 0.25)",
                }}
              />
            ))}
          </div>
        </div>

        {/* All testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {testimonials.slice(0, 3).map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="testimonial-card reveal cursor-pointer"
              style={{
                transitionDelay: `${i * 0.1}s`,
                opacity: activeIndex === i ? 1 : 0.75,
                borderColor: activeIndex === i ? "hsl(var(--earth-green))" : undefined,
              }}
              onClick={() => setActiveIndex(i)}
            >
              <div className="flex gap-1 mb-3">
                {Array(testimonial.rating).fill("⭐").map((s, idx) => (
                  <span key={idx} className="text-sm">{s}</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "hsl(var(--foreground) / 0.8)" }}>
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--gradient-green)", color: "hsl(var(--primary-foreground))" }}
                >
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold">{testimonial.name}</p>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
