import { useState } from "react";
import { Check, ChevronRight, MapPin, Clock, ShoppingBasket, CreditCard, X } from "lucide-react";

type BillingCycle = "daily" | "monthly" | "annual";

interface CheckoutFlowProps {
  plan: { name: string; price: number; cycle: BillingCycle } | null;
  onClose: () => void;
}

const vegetables = [
  "Tomatoes 🍅", "Spinach 🥬", "Carrots 🥕", "Brinjal 🍆", "Capsicum 🫑",
  "Onions 🧅", "Potatoes 🥔", "Ladies Finger 🌿", "Bitter Gourd", "Ridge Gourd",
  "Bottle Gourd", "Beans", "Peas", "Cabbage", "Cauliflower 🥦",
  "Coriander", "Methi Leaves", "Curry Leaves", "Drum Stick", "Taro Root",
  "Ginger 🫚", "Garlic", "Green Chilli 🌶️", "Cucumber 🥒", "Radish",
];

const steps = [
  { id: 1, label: "Plan", icon: ShoppingBasket },
  { id: 2, label: "Address", icon: MapPin },
  { id: 3, label: "Veggies", icon: Check },
  { id: 4, label: "Payment", icon: CreditCard },
];

const CheckoutFlow = ({ plan, onClose }: CheckoutFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState("");
  const [slot, setSlot] = useState<"6-7am" | "7-8am">("6-7am");
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([
    "Tomatoes 🍅", "Spinach 🥬", "Carrots 🥕", "Onions 🧅",
  ]);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [completed, setCompleted] = useState(false);

  const toggleVeggie = (v: string) => {
    setSelectedVeggies((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const formatPrice = (p: number) => `₹${p.toLocaleString("en-IN")}`;
  const cycleLabel = plan?.cycle === "daily" ? "/day" : plan?.cycle === "monthly" ? "/month" : "/year";

  if (completed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
        <div className="bg-card rounded-3xl p-10 max-w-md w-full text-center shadow-2xl animate-scale-in">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
            style={{ background: "var(--gradient-green)" }}
          >
            ✅
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "hsl(var(--earth-green))" }}>
            Aavya is Coming Home! 🎉
          </h2>
          <p className="text-sm mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
            Your <strong>{plan?.name}</strong> subscription is confirmed.
          </p>
          <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
            First delivery: <strong>Tomorrow by {slot === "6-7am" ? "7:00 AM" : "8:00 AM"}</strong>
          </p>
          <div
            className="rounded-2xl p-4 mb-6 text-sm"
            style={{ background: "hsl(var(--earth-green) / 0.08)", color: "hsl(var(--earth-green))" }}
          >
            🌱 You just saved 25 plastic bags this month. Aavya thanks you!
          </div>
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-semibold border"
              style={{ borderColor: "hsl(var(--earth-green))", color: "hsl(var(--earth-green))" }}
              onClick={() => {
                const msg = `I just subscribed to Aavya Farms - fresh vegetables delivered before sunrise! 🌱 No middlemen, no plastic. Join me: https://aavya.farm`;
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              📱 Share on WhatsApp
            </button>
            <button onClick={onClose} className="flex-1 btn-primary py-3 text-sm rounded-xl">
              Track Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>
            Start Your Subscription
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 px-6 py-4 border-b border-border">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2">
              <button
                onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                className={`step-dot ${currentStep === step.id ? "active" : currentStep > step.id ? "done" : ""}`}
              >
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </button>
              <span
                className="text-xs font-medium hidden sm:block"
                style={{
                  color:
                    currentStep === step.id
                      ? "hsl(var(--earth-green))"
                      : "hsl(var(--muted-foreground))",
                }}
              >
                {step.label}
              </span>
              {i < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-1" style={{ color: "hsl(var(--muted-foreground))" }} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Plan Confirmation */}
          {currentStep === 1 && plan && (
            <div className="space-y-4">
              <h3 className="font-bold text-base">Confirm Your Plan</h3>
              <div
                className="rounded-2xl p-5"
                style={{ background: "hsl(var(--earth-green) / 0.06)", border: "1px solid hsl(var(--earth-green) / 0.2)" }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg" style={{ color: "hsl(var(--earth-green))" }}>
                      {plan.name}
                    </p>
                    <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Billed {plan.cycle}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold" style={{ color: "hsl(var(--earth-green))" }}>
                      {formatPrice(plan.price)}
                    </p>
                    <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {cycleLabel}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                {["Cancel Anytime", "7-Day Trial", "Eco Packaging"].map((t) => (
                  <div
                    key={t}
                    className="rounded-xl p-3 font-medium"
                    style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
                  >
                    ✅ {t}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h3 className="font-bold text-base">Delivery Details</h3>
              <div>
                <label className="text-sm font-medium block mb-2">Full Delivery Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Flat 4B, Sri Residency, Jubilee Hills, Hyderabad — 500033"
                  className="w-full px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2"
                  style={{
                    borderColor: "hsl(var(--border))",
                    background: "hsl(var(--background))",
                  }}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-3">Delivery Slot</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "6-7am", label: "6:00 – 7:00 AM", sub: "Early Bird — Most Popular" },
                    { id: "7-8am", label: "7:00 – 8:00 AM", sub: "Slightly Later" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSlot(s.id as "6-7am" | "7-8am")}
                      className="p-4 rounded-xl border text-left transition-all"
                      style={{
                        borderColor: slot === s.id ? "hsl(var(--earth-green))" : "hsl(var(--border))",
                        background:
                          slot === s.id ? "hsl(var(--earth-green) / 0.06)" : "transparent",
                      }}
                    >
                      <Clock className="w-4 h-4 mb-1" style={{ color: "hsl(var(--earth-green))" }} />
                      <p className="text-sm font-semibold">{s.label}</p>
                      <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Veggie Preferences */}
          {currentStep === 3 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base">Choose Your Vegetables</h3>
                <span className="badge-green">{selectedVeggies.length} selected</span>
              </div>
              <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                We'll include your preferences when available. Our farmers will supplement with the freshest seasonal picks.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {vegetables.map((v) => (
                  <button
                    key={v}
                    onClick={() => toggleVeggie(v)}
                    className={`veggie-check text-left ${selectedVeggies.includes(v) ? "selected" : ""}`}
                  >
                    {selectedVeggies.includes(v) && (
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--earth-green))" }} />
                    )}
                    <span className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>
                      {v}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <h3 className="font-bold text-base">Payment Method</h3>
              <div className="space-y-3">
                {[
                  { id: "upi", label: "UPI / GPay / PhonePe", sub: "Instant · No charges", emoji: "📱" },
                  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", emoji: "💳" },
                  { id: "netbanking", label: "Net Banking", sub: "All major banks supported", emoji: "🏦" },
                  { id: "wallet", label: "Wallets", sub: "Paytm, Amazon Pay, MobiKwik", emoji: "👛" },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className="w-full p-4 rounded-xl border flex items-center gap-3 text-left transition-all"
                    style={{
                      borderColor:
                        paymentMethod === pm.id ? "hsl(var(--earth-green))" : "hsl(var(--border))",
                      background:
                        paymentMethod === pm.id ? "hsl(var(--earth-green) / 0.06)" : "transparent",
                    }}
                  >
                    <span className="text-2xl">{pm.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold">{pm.label}</p>
                      <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {pm.sub}
                      </p>
                    </div>
                    {paymentMethod === pm.id && (
                      <div
                        className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "hsl(var(--earth-green))" }}
                      >
                        <Check className="w-3 h-3 text-cream" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {plan && (
                <div
                  className="rounded-2xl p-4 text-sm"
                  style={{ background: "hsl(var(--muted))" }}
                >
                  <div className="flex justify-between mb-1">
                    <span style={{ color: "hsl(var(--muted-foreground))" }}>{plan.name}</span>
                    <span className="font-semibold">{formatPrice(plan.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "hsl(var(--muted-foreground))" }}>Delivery</span>
                    <span className="font-semibold" style={{ color: "hsl(var(--earth-green))" }}>FREE</span>
                  </div>
                  <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold">
                    <span>Total ({plan.cycle})</span>
                    <span style={{ color: "hsl(var(--earth-green))" }}>{formatPrice(plan.price)}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Nav */}
        <div className="p-6 border-t border-border flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              className="flex-1 py-3 rounded-xl border text-sm font-semibold transition-all"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={() => {
              if (currentStep < 4) {
                setCurrentStep((s) => s + 1);
              } else {
                setCompleted(true);
              }
            }}
            className="flex-1 btn-primary py-3 rounded-xl text-sm justify-center"
          >
            {currentStep === 4 ? "🎉 Confirm & Pay" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
