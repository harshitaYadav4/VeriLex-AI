import { motion } from "framer-motion";
import Features from "../components/Features";
import FeatureShowcase from "../components/FeatureShowcase";
import CTASection from "../components/CTASection";

import {
  ScanText,
  Brain,
  ShieldCheck,
  Database,
  Lock,
  FileSearch,
} from "lucide-react";

const extras = [
  {
    icon: ScanText,
    title: "AI Document Scanning",
    desc: "Upload legal documents and instantly scan them for signs of tampering, forged seals, and manipulated text.",
  },
  {
    icon: Brain,
    title: "Explainable AI",
    desc: "Our AI doesn't just flag fraud — it explains why a document was marked suspicious.",
  },
  {
    icon: ShieldCheck,
    title: "Forgery Detection",
    desc: "Detect fake signatures, altered stamps, modified layouts, and other manipulation techniques.",
  },
  {
    icon: Database,
    title: "Government Database Verification",
    desc: "Cross-verify documents using trusted sources like DigiLocker, MCA registry, and eCourts.",
  },
  {
    icon: Lock,
    title: "Blockchain Audit Trail",
    desc: "Every verification result is stored securely in tamper-proof blockchain records.",
  },
  {
    icon: FileSearch,
    title: "Instant Authenticity Check",
    desc: "Lawyers, courts, banks, and citizens can verify legal documents in seconds.",
  },
];

export default function FeaturePage() {
  return (
    <main className="pt-20">
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#5c6ac4]/10 blur-3xl rounded-full" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12px] text-white/30 uppercase tracking-[0.15em] mb-4"
          >
            Features
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[52px] md:text-[64px] font-bold text-white tracking-[-0.03em] leading-tight mb-6"
          >
            Powerful tools for
            <br />
            <span className="text-white/35">legal document verification</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[17px] text-white/45 max-w-xl mx-auto"
          >
            VeriLex AI combines artificial intelligence, blockchain, and trusted
            government data sources to detect forged legal documents and ensure
            authenticity.
          </motion.p>
        </div>
      </section>

      <Features />

      <FeatureShowcase />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[32px] font-bold text-white text-center mb-12 tracking-[-0.02em]">
            Built for secure verification
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras.map((e, i) => {
              const Icon = e.icon;

              return (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-white/60" />
                  </div>

                  <div>
                    <h3 className="text-[14px] font-semibold text-white/85 mb-1">
                      {e.title}
                    </h3>

                    <p className="text-[13px] text-white/40">{e.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
