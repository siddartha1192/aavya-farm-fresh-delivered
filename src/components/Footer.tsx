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
        href="https://wa.me/919121839191?text=Hi%20Som!%20I%27d%20like%20to%20know%20more%20about%20Aavya%27s%20vegetable%20subscription."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-pulse-green"
        style={{ background: "#25D366" }}
        aria-label="Chat with Som on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="28"
          height="28"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
