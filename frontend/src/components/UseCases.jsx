import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Landmark, ShieldCheck, Users } from "lucide-react";

const cases = [
  {
    icon: Landmark,
    label: "Courts",
    headline: "Prevent forged court orders",
    body: "Automatically verify court judgments and legal orders before enforcement using AI analysis and official databases.",
    color: "#6366f1",
  },
  {
    icon: Building2,
    label: "Banks & Finance",
    headline: "Stop document fraud in loans",
    body: "Detect forged property documents, affidavits and legal papers submitted during loan or financial applications.",
    color: "#ec4899",
  },
  {
    icon: ShieldCheck,
    label: "Government",
    headline: "Secure official documents",
    body: "Verify government circulars, certificates, and official notifications using blockchain backed verification logs.",
    color: "#10b981",
  },
  {
    icon: Users,
    label: "Citizens & Lawyers",
    headline: "Instant document authenticity",
    body: "Lawyers and citizens can instantly check whether a legal document is genuine or manipulated.",
    color: "#f59e0b",
  },
];

export default function UseCases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute left-1/2 top-1/2 w-[700px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[12px] text-white/35 uppercase tracking-[0.2em] mb-4">
            Use Cases
          </p>

          <h2 className="text-[42px] md:text-[52px] font-bold text-white tracking-[-0.03em] leading-tight">
            Built for the legal
            <br />
            <span className="text-white/35">verification ecosystem</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => {
            const Icon = c.icon;

            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/[0.04] blur-xl transition-opacity" />

                <div className="relative z-10">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border border-white/[0.08]"
                    style={{ backgroundColor: `${c.color}15` }}
                  >
                    <Icon size={20} style={{ color: c.color }} />
                  </div>

                  <div className="text-[12px] uppercase tracking-widest text-white/35 mb-2">
                    {c.label}
                  </div>

                  <h3 className="text-[22px] font-semibold text-white mb-3 group-hover:text-white">
                    {c.headline}
                  </h3>

                  <p className="text-[14px] text-white/45 leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
