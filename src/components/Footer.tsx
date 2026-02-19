import { Leaf, Instagram, Youtube, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const links = {
    "Quick Links": ["Why Aavya", "Subscription Plans", "Our Farm", "Impact Tracker", "Farm Stories"],
    "Support": ["FAQ", "Contact Us", "Track Order", "Pause Delivery", "Cancel Subscription"],
    "Company": ["About Aavya", "Our Farmers", "Careers", "Media", "Partner with Us"],
  };

  return (
    <footer style={{ background: "hsl(var(--earth-green-dark))" }}>
      {/* Newsletter */}
      <div
        className="border-b"
        style={{ borderColor: "hsl(var(--cream-white) / 0.1)" }}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(var(--cream-white))" }}>
                Get Weekly Farm Updates 🌾
              </h3>
              <p className="text-sm" style={{ color: "hsl(var(--cream-white) / 0.6)" }}>
                Seasonal recipes, farming stories, and exclusive subscriber offers — straight from the field to your inbox.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: "hsl(var(--cream-white) / 0.08)",
                  border: "1px solid hsl(var(--cream-white) / 0.2)",
                  color: "hsl(var(--cream-white))",
                }}
              />
              <button className="btn-orange px-6 py-3 whitespace-nowrap text-sm rounded-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "var(--gradient-orange)" }}
              >
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold" style={{ color: "hsl(var(--cream-white))" }}>
                Aavya
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--cream-white) / 0.6)" }}>
              Aavya — meaning "blessing" — is Hyderabad's most trusted farm-to-home vegetable delivery service. From our 1000-acre farmland to your table in 24 hours. Seedha khet se, aapke ghar tak.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              {[
                { Icon: Phone, text: "+91 98765 43210" },
                { Icon: Mail, text: "hello@aavya.farm" },
                { Icon: MapPin, text: "Aavya Farms, Shadnagar, Hyderabad — 509216" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-2">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--sunrise-orange))" }} />
                  <span className="text-sm" style={{ color: "hsl(var(--cream-white) / 0.6)" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "hsl(var(--cream-white) / 0.1)", color: "hsl(var(--cream-white))" }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-bold text-sm mb-4" style={{ color: "hsl(var(--cream-white))" }}>
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:opacity-100"
                      style={{ color: "hsl(var(--cream-white) / 0.55)" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Seals + Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: "hsl(var(--cream-white) / 0.1)" }}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            {["🌱 Organic Certified", "♻️ Plastic-Free", "🔒 ISO Food Safety", "✅ FSSAI Licensed"].map((seal) => (
              <span
                key={seal}
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  background: "hsl(var(--cream-white) / 0.08)",
                  color: "hsl(var(--cream-white) / 0.6)",
                }}
              >
                {seal}
              </span>
            ))}
          </div>
          <p className="text-xs" style={{ color: "hsl(var(--cream-white) / 0.35)" }}>
            © 2025 Aavya Farms Pvt. Ltd. · Hyderabad, Telangana · Made with 🌱 for healthier families
          </p>
        </div>
      </div>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Aavya!%20I%27d%20like%20to%20know%20more%20about%20your%20vegetable%20subscription."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-300 hover:scale-110 animate-pulse-green"
        style={{ background: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </footer>
  );
};

export default Footer;
