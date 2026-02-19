import { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";

interface NavigationProps {
  onSubscribeClick: () => void;
}

const Navigation = ({ onSubscribeClick }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Why Aavya", "Plans", "Our Farm", "Impact", "Stories"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "var(--gradient-green)" }}
          >
            <Leaf className="w-5 h-5 text-cream" />
          </div>
          <span
            className="text-2xl font-bold"
            style={{
              color: scrolled ? "hsl(var(--earth-green))" : "hsl(var(--cream-white))",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Aavya
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="nav-link text-sm font-medium transition-colors duration-200"
              style={{
                color: scrolled
                  ? "hsl(var(--foreground) / 0.75)"
                  : "hsl(var(--cream-white) / 0.85)",
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
            style={{ color: scrolled ? "hsl(var(--earth-green))" : "hsl(var(--cream-white))" }}
          >
            Login
          </button>
          <button onClick={onSubscribeClick} className="btn-primary text-sm px-6 py-2.5">
            Subscribe Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: scrolled ? "hsl(var(--foreground))" : "hsl(var(--cream-white))" }}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card/98 backdrop-blur-md border-t border-border">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="nav-link py-2 font-medium"
                style={{ color: "hsl(var(--foreground))" }}
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            ))}
            <button onClick={() => { onSubscribeClick(); setMobileOpen(false); }} className="btn-primary justify-center mt-2">
              Subscribe Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
