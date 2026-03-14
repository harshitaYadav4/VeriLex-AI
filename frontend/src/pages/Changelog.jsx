import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  Database,
  Lock,
  ScanText,
  FileSearch,
} from "lucide-react";

const entries = [
  {
    date: "March 2026",
    version: "1.3",
    tag: "AI Update",
    icon: Brain,
    title: "Explainable AI Fraud Detection",
    desc: "The fraud detection engine now provides transparent reasoning behind every verification decision.",
    items: [
      "AI explains why a document is flagged",
      "Detailed anomaly reports",
      "Improved detection accuracy",
      "Fraud pattern recognition upgrade",
    ],
  },
  {
    date: "February 2026",
    version: "1.2",
    tag: "Security",
    icon: Lock,
    title: "Blockchain Audit Trail",
    desc: "Every verification result is now stored in immutable blockchain logs.",
    items: [
      "Immutable verification records",
      "Tamper-proof audit history",
      "Secure verification tracking",
      "Decentralized storage layer",
    ],
  },
  {
    date: "January 2026",
    version: "1.1",
    tag: "Integration",
    icon: Database,
    title: "Government API Verification",
    desc: "VeriLex AI verifies documents using trusted government databases.",
    items: [
      "DigiLocker verification",
      "API Setu integration",
      "MCA registry validation",
      "eCourts order verification",
    ],
  },
  {
    date: "December 2025",
    version: "1.0",
    tag: "Launch",
    icon: ScanText,
    title: "AI Document Analysis Engine",
    desc: "First release capable of detecting forged seals, signatures and tampering.",
    items: [
      "Seal detection system",
      "Signature authenticity check",
      "Font and layout analysis",
      "Metadata inspection",
    ],
  },
  {
    date: "November 2025",
    version: "0.9",
    tag: "Prototype",
    icon: FileSearch,
    title: "Document Tampering Detection",
    desc: "Prototype model detecting edited PDFs and altered legal documents.",
    items: [
      "PDF manipulation detection",
      "Fake stamp identification",
      "Layout pattern recognition",
      "Document structure scanning",
    ],
  },
  {
    date: "October 2025",
    version: "0.8",
    tag: "Research",
    icon: ShieldCheck,
    title: "Legal Fraud Research Phase",
    desc: "Initial research and system design for AI legal document verification.",
    items: [
      "Fraud case analysis",
      "Forgery dataset collection",
      "AI model design",
      "Verification architecture planning",
    ],
  },
];

const tagColors = {
  "AI Update": "#8b5cf6",
  Security: "#22c55e",
  Integration: "#3b82f6",
  Launch: "#f59e0b",
  Prototype: "#06b6d4",
  Research: "#ef4444",
};

export default function Changelog() {
  return (
    <main className="pt-24 pb-32 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 w-[800px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12px] uppercase tracking-[0.2em] text-white/35 mb-4"
          >
            Development Timeline
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[56px] md:text-[68px] font-bold tracking-[-0.03em] mb-6
            bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
          >
            VeriLex AI Evolution
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[17px] text-white/45 max-w-xl mx-auto"
          >
            Key milestones in building an AI system that detects forged legal
            documents.
          </motion.p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <div className="relative">
          <div className="absolute left-[8px] top-0 bottom-0 w-[1px] bg-white/[0.07]" />

          <div className="space-y-16">
            {entries.map((entry, i) => {
              const Icon = entry.icon;

              return (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="pl-10 relative"
                >
                  <div
                    className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-[#0a0a0a] shadow-lg"
                    style={{
                      backgroundColor: tagColors[entry.tag],
                      boxShadow: `0 0 20px ${tagColors[entry.tag]}55`,
                    }}
                  />

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[12px] text-white/35 font-medium">
                      {entry.date}
                    </span>

                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-white/[0.08] text-white/35">
                      v{entry.version}
                    </span>

                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        color: tagColors[entry.tag],
                        backgroundColor: `${tagColors[entry.tag]}20`,
                      }}
                    >
                      {entry.tag}
                    </span>
                  </div>

                  <div className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                        <Icon size={18} className="text-white/60" />
                      </div>

                      <div>
                        <h2 className="text-[19px] font-semibold text-white mb-1">
                          {entry.title}
                        </h2>

                        <p className="text-[14px] text-white/45">
                          {entry.desc}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-2 ml-14">
                      {entry.items.map((item, j) => (
                        <li key={j} className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2" />
                          <span className="text-[13px] text-white/50">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
