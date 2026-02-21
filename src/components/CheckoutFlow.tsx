import { useState } from "react";
import { Check, ChevronRight, MapPin, Clock, ShoppingBasket, CreditCard, X, Leaf, Share2 } from "lucide-react";

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
  { id: 3, label: "Veggies", icon: Leaf },
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

  /* ── Confirmation screen ── */
  if (completed) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      >
        <div
          className="rounded-3xl p-10 max-w-md w-full text-center animate-scale-in"
          style={{
            background: "hsl(var(--card))",
            boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px hsl(var(--border))",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "hsl(var(--earth-green) / 0.1)" }}
          >
            <Check className="w-8 h-8" style={{ color: "hsl(var(--earth-green))" }} />
          </div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "hsl(var(--foreground))" }}
          >
            You're All Set!
          </h2>
          <p className="text-sm mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
            Your <strong style={{ color: "hsl(var(--earth-green))" }}>{plan?.name}</strong> subscription is confirmed.
          </p>
          <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
            First delivery: <strong>Tomorrow by {slot === "6-7am" ? "7:00 AM" : "8:00 AM"}</strong>
          </p>

          <div
            className="rounded-xl p-4 mb-6 flex items-center gap-3"
            style={{ background: "hsl(var(--earth-green) / 0.06)", border: "1px solid hsl(var(--earth-green) / 0.15)" }}
          >
            <Leaf size={18} style={{ color: "hsl(var(--earth-green))", flexShrink: 0 }} />
            <p className="text-xs text-left" style={{ color: "hsl(var(--earth-green))" }}>
              You just saved <strong>25 plastic bags</strong> this month. Aavya thanks you!
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                border: "1.5px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
                background: "transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(var(--muted))"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              onClick={() => {
                const msg = `I just subscribed to Aavya Farms - fresh vegetables delivered before sunrise! 🌱 No middlemen, no plastic. Join me: https://aavya.farm`;
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              <Share2 size={14} />
              Share
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "hsl(var(--earth-green))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "var(--shadow-md)",
              }}
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main checkout flow ── */
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in"
        style={{
          background: "hsl(var(--card))",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px hsl(var(--border))",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-7 py-5"
          style={{ borderBottom: "1px solid hsl(var(--border))" }}
        >
          <div>
            <h2 className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>
              {currentStep === 1 && "Confirm Your Plan"}
              {currentStep === 2 && "Delivery Details"}
              {currentStep === 3 && "Your Preferences"}
              {currentStep === 4 && "Complete Payment"}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
              Step {currentStep} of 4
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
            style={{ background: "hsl(var(--muted))" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(var(--border))"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(var(--muted))"; }}
          >
            <X className="w-4 h-4" style={{ color: "hsl(var(--muted-foreground))" }} />
          </button>
        </div>

        {/* ── Step Progress ── */}
        <div className="px-7 py-4" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <div className="flex items-center gap-1">
            {steps.map((step, i) => {
              const isActive = currentStep === step.id;
              const isDone = currentStep > step.id;
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center gap-1 flex-1">
                  <button
                    onClick={() => isDone && setCurrentStep(step.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200"
                    style={{
                      background: isActive ? "hsl(var(--earth-green) / 0.08)" : isDone ? "hsl(var(--earth-green) / 0.04)" : "transparent",
                      cursor: isDone ? "pointer" : "default",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isActive
                          ? "hsl(var(--earth-green))"
                          : isDone
                          ? "hsl(var(--earth-green) / 0.15)"
                          : "hsl(var(--muted))",
                      }}
                    >
                      {isDone ? (
                        <Check className="w-3.5 h-3.5" style={{ color: "hsl(var(--earth-green))" }} />
                      ) : (
                        <Icon
                          className="w-3.5 h-3.5"
                          style={{
                            color: isActive
                              ? "hsl(var(--primary-foreground))"
                              : "hsl(var(--muted-foreground))",
                          }}
                        />
                      )}
                    </div>
                    <span
                      className="text-xs font-semibold hidden sm:block"
                      style={{
                        color: isActive
                          ? "hsl(var(--earth-green))"
                          : isDone
                          ? "hsl(var(--earth-green-light))"
                          : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {step.label}
                    </span>
                  </button>
                  {i < steps.length - 1 && (
                    <div
                      className="flex-1 h-px mx-1"
                      style={{
                        background: isDone ? "hsl(var(--earth-green) / 0.3)" : "hsl(var(--border))",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {/* Step 1: Plan Confirmation */}
          {currentStep === 1 && plan && (
            <div className="space-y-5">
              <div
                className="rounded-xl p-5"
                style={{
                  background: "hsl(var(--earth-green) / 0.04)",
                  border: "1.5px solid hsl(var(--earth-green) / 0.15)",
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg" style={{ color: "hsl(var(--earth-green))" }}>
                      {plan.name}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
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
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Cancel Anytime", icon: "✕" },
                  { label: "7-Day Trial", icon: "⏱" },
                  { label: "Eco Packaging", icon: "🌿" },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: "hsl(var(--muted) / 0.6)", border: "1px solid hsl(var(--border))" }}
                  >
                    <p className="text-lg mb-1">{t.icon}</p>
                    <p className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {t.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="Flat 4B, Sri Residency, Jubilee Hills, Hyderabad — 500033"
                  className="w-full px-4 py-3 rounded-xl text-sm resize-none transition-all duration-200 focus:outline-none"
                  style={{
                    border: "1.5px solid hsl(var(--border))",
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(var(--earth-green))"; e.currentTarget.style.boxShadow = "0 0 0 3px hsl(var(--earth-green) / 0.1)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Delivery Slot
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "6-7am", label: "6:00 – 7:00 AM", sub: "Early Bird · Most Popular" },
                    { id: "7-8am", label: "7:00 – 8:00 AM", sub: "Flexible Morning" },
                  ].map((s) => {
                    const isSelected = slot === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSlot(s.id as "6-7am" | "7-8am")}
                        className="p-4 rounded-xl text-left transition-all duration-200"
                        style={{
                          border: `1.5px solid ${isSelected ? "hsl(var(--earth-green))" : "hsl(var(--border))"}`,
                          background: isSelected ? "hsl(var(--earth-green) / 0.05)" : "transparent",
                          boxShadow: isSelected ? "0 0 0 3px hsl(var(--earth-green) / 0.08)" : "none",
                        }}
                      >
                        <Clock className="w-4 h-4 mb-2" style={{ color: isSelected ? "hsl(var(--earth-green))" : "hsl(var(--muted-foreground))" }} />
                        <p className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>{s.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{s.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Veggie Preferences */}
          {currentStep === 3 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Pick your favorites — we'll include them when available
                </p>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "hsl(var(--earth-green) / 0.1)", color: "hsl(var(--earth-green))" }}
                >
                  {selectedVeggies.length} selected
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {vegetables.map((v) => {
                  const isSelected = selectedVeggies.includes(v);
                  return (
                    <button
                      key={v}
                      onClick={() => toggleVeggie(v)}
                      className="flex items-center gap-2 p-2.5 rounded-lg text-left transition-all duration-150"
                      style={{
                        border: `1.5px solid ${isSelected ? "hsl(var(--earth-green))" : "hsl(var(--border))"}`,
                        background: isSelected ? "hsl(var(--earth-green) / 0.05)" : "transparent",
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
                        style={{
                          border: isSelected ? "none" : "1.5px solid hsl(var(--border))",
                          background: isSelected ? "hsl(var(--earth-green))" : "transparent",
                        }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" style={{ color: "hsl(var(--primary-foreground))" }} />}
                      </div>
                      <span className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>
                        {v}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="space-y-2">
                {[
                  { id: "upi", label: "UPI / GPay / PhonePe", sub: "Instant · No charges", emoji: "📱" },
                  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", emoji: "💳" },
                  { id: "netbanking", label: "Net Banking", sub: "All major banks supported", emoji: "🏦" },
                  { id: "wallet", label: "Wallets", sub: "Paytm, Amazon Pay, MobiKwik", emoji: "👛" },
                ].map((pm) => {
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className="w-full p-4 rounded-xl flex items-center gap-4 text-left transition-all duration-200"
                      style={{
                        border: `1.5px solid ${isSelected ? "hsl(var(--earth-green))" : "hsl(var(--border))"}`,
                        background: isSelected ? "hsl(var(--earth-green) / 0.04)" : "transparent",
                        boxShadow: isSelected ? "0 0 0 3px hsl(var(--earth-green) / 0.08)" : "none",
                      }}
                    >
                      <span className="text-xl w-8 text-center">{pm.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>{pm.label}</p>
                        <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                          {pm.sub}
                        </p>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          border: isSelected ? "none" : "1.5px solid hsl(var(--border))",
                          background: isSelected ? "hsl(var(--earth-green))" : "transparent",
                        }}
                      >
                        {isSelected && <Check className="w-3 h-3" style={{ color: "hsl(var(--primary-foreground))" }} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Order summary */}
              {plan && (
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "hsl(var(--muted) / 0.5)",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Order Summary
                  </p>
                  <div className="flex justify-between mb-2 text-sm">
                    <span style={{ color: "hsl(var(--muted-foreground))" }}>{plan.name}</span>
                    <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>{formatPrice(plan.price)}</span>
                  </div>
                  <div className="flex justify-between mb-3 text-sm">
                    <span style={{ color: "hsl(var(--muted-foreground))" }}>Delivery</span>
                    <span className="font-semibold" style={{ color: "hsl(var(--earth-green))" }}>FREE</span>
                  </div>
                  <div
                    className="pt-3 flex justify-between font-bold text-sm"
                    style={{ borderTop: "1px solid hsl(var(--border))" }}
                  >
                    <span style={{ color: "hsl(var(--foreground))" }}>Total ({plan.cycle})</span>
                    <span style={{ color: "hsl(var(--earth-green))" }}>{formatPrice(plan.price)}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="px-7 py-5 flex gap-3"
          style={{ borderTop: "1px solid hsl(var(--border))" }}
        >
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                border: "1.5px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
                background: "transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(var(--muted))"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
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
            className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              background: "hsl(var(--earth-green))",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "var(--shadow-md)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
          >
            {currentStep === 4 ? "Confirm & Pay" : "Continue"}
            {currentStep < 4 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;
