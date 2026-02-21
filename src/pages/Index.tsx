import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyAavya from "@/components/WhyAavya";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import CheckoutFlow from "@/components/CheckoutFlow";
import ImpactTracker from "@/components/ImpactTracker";
import ContentSection from "@/components/ContentSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

type BillingCycle = "daily" | "monthly" | "annual";

const Index = () => {
  const [checkoutPlan, setCheckoutPlan] = useState<{
    name: string;
    price: number;
    cycle: BillingCycle;
  } | null>(null);

  const handleSubscribeClick = () => {
    setCheckoutPlan({ name: "Family Pack", price: 4200, cycle: "monthly" });
  };

  const handleSelectPlan = (plan: { name: string; price: number; cycle: BillingCycle }) => {
    setCheckoutPlan(plan);
  };

  return (
    <main className="font-poppins">
      {/* SEO Meta */}
      <title>Aavya Farms — Fresh Vegetables Delivered Before Sunrise | Hyderabad</title>

      <Navigation onSubscribeClick={handleSubscribeClick} />
      <Hero onSubscribeClick={handleSubscribeClick} />
      <WhyAavya />
      <SubscriptionPlans onSelectPlan={handleSelectPlan} />
      <ImpactTracker />
      <ContentSection />
      <Testimonials />
      <Footer />

      {/* Checkout Modal */}
      {checkoutPlan && (
        <CheckoutFlow
          plan={checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </main>
  );
};

export default Index;
