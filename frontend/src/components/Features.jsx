import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  ShieldCheck,
  FileSearch,
  Database,
  Fingerprint,
  ScanText,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Fraud Detection",
    desc: "Advanced machine learning models analyze seals, signatures, and document layouts to detect forged legal documents.",
    color: "#f59e0b",
  },
  {
    icon: Database,
    title: "Government Database Verification",
    desc: "Cross-check documents with trusted sources like DigiLocker, eCourts, and MCA registries for real-time validation.",
    color: "#6366f1",
  },
  {
    icon: Fingerprint,
    title: "Digital Signature Validation",
    desc: "Verify PKI-based digital signatures used in official court and government documents.",
    color: "#10b981",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Audit Logs",
    desc: "All verification results are stored in tamper-proof blockchain logs for transparency and traceability.",
    color: "#3b82f6",
  },
  {
    icon: ScanText,
    title: "Document Tampering Detection",
    desc: "AI scans fonts, formatting patterns, metadata, and seals to detect manipulated or altered documents.",
    color: "#ec4899",
  },
  {
    icon: FileSearch,
    title: "Identity Fraud Detection",
    desc: "Detect impersonation attempts by cross-checking identity information against verified databases.",
    color: "#8b5cf6",
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative p-7 rounded-2xl 
      bg-white/[0.03] border border-white/[0.07] 
      hover:bg-white/[0.05] hover:border-white/[0.12] 
      transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div
        className="absolute -top-10 -left-10 w-32 h-32 opacity-0 
        group-hover:opacity-20 blur-3xl transition"
        style={{ backgroundColor: feature.color }}
      />

      <div
        className="relative w-10 h-10 rounded-xl flex items-center 
        justify-center mb-5 border border-white/[0.08]"
        style={{ backgroundColor: `${feature.color}20` }}
      >
        <Icon size={18} style={{ color: feature.color }} />
      </div>

      <h3
        className="text-[16px] font-semibold text-white/90 mb-2 
      group-hover:text-white transition-colors"
      >
        {feature.title}
      </h3>

      <p
        className="text-[13.5px] text-white/40 leading-relaxed 
      group-hover:text-white/60 transition-colors"
      >
        {feature.desc}
      </p>

      <div
        className="absolute bottom-0 left-6 right-6 h-[1px] 
        opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.color}60, transparent)`,
        }}
      />
    </motion.div>
  );
}

export default function Features() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[12px] text-white/30 uppercase tracking-[0.18em] font-medium mb-4"
          >
            Core Capabilities
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[40px] md:text-[54px] font-bold text-white tracking-[-0.02em] leading-tight"
          >
            AI-Powered Legal
            <br />
            <span className="text-white/40">Document Verification</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl mx-auto text-white/40 text-[15px]"
          >
            VeriLex AI detects forged legal documents and verifies their
            authenticity using machine learning, trusted government databases,
            and secure blockchain audit trails.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
