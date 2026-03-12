import Pricing from "../components/Pricing";
import CTASection from "../components/CTASection";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we prorate billing.",
  },
  {
    q: "Is there a free trial?",
    a: "All paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex) and can accommodate invoicing for Enterprise customers.",
  },
  {
    q: "Do you offer discounts for nonprofits or education?",
    a: "Yes! We offer 50% off for qualifying nonprofits and educational institutions. Contact us to apply.",
  },
  {
    q: "What happens when my trial ends?",
    a: "You'll be prompted to choose a plan. If you don't upgrade, you'll be moved to the Free plan with a 250 issue limit.",
  },
  {
    q: "Can I export my data?",
    a: "Absolutely. You can export all your data at any time in JSON, CSV, or via our API.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        className="w-full text-left py-4 flex items-center justify-between gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] font-medium text-white/75 group-hover:text-white transition-colors">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`text-white/30 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="pb-4 text-[14px] text-white/45 leading-relaxed"
        >
          {a}
        </motion.div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="pt-20">
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[52px] md:text-[64px] font-bold text-white tracking-[-0.03em] leading-tight mb-4"
          >
            Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-white/40"
          >
            Start free. Scale as you grow.
          </motion.p>
        </div>
      </section>

      <Pricing />

      <section className="py-20 max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <HelpCircle size={20} className="text-white/30" />
          <h2 className="text-[28px] font-bold text-white tracking-[-0.02em]">
            Frequently asked questions
          </h2>
        </div>
        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
