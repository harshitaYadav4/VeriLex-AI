import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Shield, Globe, RefreshCw } from "lucide-react";

const techFeatures = [
  {
    icon: Cpu,
    title: "AI Document Analysis",
    desc: "Deep learning models analyze seals, signatures, fonts and layouts to detect forgery patterns.",
    color: "#6366f1",
  },
  {
    icon: Shield,
    title: "Government API Integration",
    desc: "Real-time verification through DigiLocker, API Setu, eCourts and MCA databases.",
    color: "#10b981",
  },
  {
    icon: Globe,
    title: "Blockchain Audit Trail",
    desc: "Verification results are stored in immutable blockchain logs ensuring transparency.",
    color: "#3b82f6",
  },
  {
    icon: RefreshCw,
    title: "Explainable Fraud Detection",
    desc: "Each fraud detection decision includes a clear explanation for investigators.",
    color: "#f59e0b",
  },
];

export default function Technology() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c18]/40 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 w-[700px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[12px] text-white/35 uppercase tracking-[0.2em] mb-4">
              Technology
            </p>

            <h2 className="text-[42px] md:text-[50px] font-bold text-white leading-tight tracking-[-0.03em] mb-6">
              Advanced Verification
              <br />
              <span className="bg-gradient-to-r from-white/80 to-white/30 text-transparent bg-clip-text">
                Technology
              </span>
            </h2>

            <p className="text-[16px] text-white/45 leading-relaxed mb-10 max-w-lg">
              VeriLex AI combines machine learning, government API verification,
              and blockchain audit logs to detect forged legal documents in real
              time while maintaining full transparency and traceability.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "<2s", label: "verification time" },
                { value: "99%", label: "fraud detection accuracy" },
                { value: "Immutable", label: "audit logs" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl"
                >
                  <div className="text-[24px] font-semibold text-white mb-1">
                    {m.value}
                  </div>

                  <div className="text-[12px] text-white/40">{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {techFeatures.map((f, i) => {
              const Icon = f.icon;

              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/5 blur-xl rounded-2xl transition-opacity" />

                  <div
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-white/[0.08]"
                    style={{ backgroundColor: `${f.color}15` }}
                  >
                    <Icon size={18} style={{ color: f.color }} />
                  </div>

                  <h3 className="text-[15px] font-semibold text-white/85 group-hover:text-white transition-colors mb-2">
                    {f.title}
                  </h3>

                  <p className="text-[13px] text-white/40 leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
