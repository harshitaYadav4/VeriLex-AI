import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "For students, individuals, and early experimentation.",
    cta: "Start free",
    features: [
      "10 document verifications / month",
      "Basic AI fraud detection",
      "PDF metadata analysis",
      "Verification report download",
      "Community support",
    ],
  },

  {
    name: "Professional",
    price: "$29",
    desc: "For lawyers, startups, and small legal teams.",
    cta: "Start free trial",
    popular: true,
    features: [
      "500 document verifications / month",
      "Advanced AI fraud detection",
      "Blockchain verification log",
      "Government API validation",
      "Document authenticity scoring",
      "Priority verification queue",
      "Email support",
    ],
  },

  {
    name: "Enterprise",
    price: "Custom",
    desc: "For courts, banks, and government institutions.",
    cta: "Contact sales",
    features: [
      "Unlimited document verification",
      "Private blockchain audit trail",
      "Court & registry integrations",
      "Custom AI fraud models",
      "Role-based access control",
      "On-premise deployment",
      "24/7 enterprise support",
    ],
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 relative" ref={ref} id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <p className="text-[12px] text-white/30 uppercase tracking-[0.15em] mb-4">
            Pricing
          </p>

          <h2 className="text-[40px] md:text-[52px] font-bold text-white tracking-[-0.02em] leading-tight mb-6">
            Simple pricing for
            <br />
            <span className="text-white/35">AI document verification</span>
          </h2>

          <p className="text-[16px] text-white/40 max-w-xl mx-auto">
            Choose a plan based on how many legal documents you verify each
            month.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`relative p-7 rounded-2xl border flex flex-col ${
                plan.popular
                  ? "border-[#5c6ac4]/50 bg-[#5c6ac4]/[0.07]"
                  : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#5c6ac4] text-white text-[11px] font-semibold">
                    <Zap size={10} fill="white" />
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-[16px] font-semibold text-white mb-2">
                  {plan.name}
                </h3>

                <p className="text-[13px] text-white/40 mb-4">{plan.desc}</p>

                <div className="text-[38px] font-bold text-white">
                  {plan.price}
                </div>
              </div>

              <button
                className={`w-full py-2.5 rounded-lg text-[14px] font-semibold mb-6 transition-all ${
                  plan.popular
                    ? "bg-[#5c6ac4] hover:bg-[#4f5db5] text-white"
                    : "border border-white/[0.12] text-white/70 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <Check
                      size={14}
                      className="text-[#5c6ac4] mt-0.5 flex-shrink-0"
                    />

                    <span className="text-[13px] text-white/55">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
