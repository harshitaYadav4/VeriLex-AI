import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Upload,
  ScanSearch,
  Database,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const showcases = [
  {
    id: "upload",
    label: "Upload",
    headline: "Upload legal documents securely.",
    body: "Upload any legal document such as affidavits, contracts, or certificates. VeriLex AI processes the file securely and prepares it for fraud analysis.",
    visual: <UploadVisual />,
  },
  {
    id: "analysis",
    label: "AI Analysis",
    headline: "AI scans for forgery patterns.",
    body: "Our AI analyzes document structures, seals, signatures, metadata, and formatting inconsistencies to detect possible manipulation or fraud.",
    visual: <AIAnalysisVisual />,
  },
  {
    id: "verify",
    label: "Verification",
    headline: "Cross-check with trusted databases.",
    body: "Documents are verified against trusted sources such as DigiLocker, court registries, and government databases to confirm authenticity.",
    visual: <VerificationVisual />,
  },
];

function UploadVisual() {
  return (
    <div className="bg-[#0d0d0d] border border-white/[0.07] rounded-xl p-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/40"
      >
        <Upload size={28} className="text-indigo-400" />
      </motion.div>

      <p className="text-white/70 text-sm">
        Drag & drop or upload your document
      </p>

      <div className="mt-5 bg-white/[0.05] rounded-lg p-3 text-xs text-white/40">
        contract_document.pdf
      </div>
    </div>
  );
}

function AIAnalysisVisual() {
  const steps = [
    "Scanning signatures",
    "Checking seals",
    "Analyzing formatting",
    "Validating metadata",
  ];

  return (
    <div className="bg-[#0d0d0d] border border-white/[0.07] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4 text-white/60 text-sm">
        <ScanSearch size={16} />
        AI Analysis
      </div>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center justify-between bg-white/[0.04] border border-white/[0.05] rounded-lg px-3 py-2"
          >
            <span className="text-sm text-white/60">{s}</span>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 + 0.4 }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function VerificationVisual() {
  const sources = [
    "DigiLocker",
    "Court Registry",
    "Government Records",
    "Digital Signatures",
  ];

  return (
    <div className="bg-[#0d0d0d] border border-white/[0.07] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4 text-white/60 text-sm">
        <Database size={16} />
        Verification Sources
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sources.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="bg-white/[0.04] border border-white/[0.05] rounded-lg p-3 text-center"
          >
            <ShieldCheck size={16} className="mx-auto mb-1 text-green-400" />
            <span className="text-xs text-white/60">{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureShowcase() {
  const [active, setActive] = useState("upload");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const current = showcases.find((s) => s.id === active);

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-[42px] md:text-[54px] font-bold text-white tracking-[-0.02em] leading-tight">
            How VeriLex AI
            <br />
            <span className="text-white/35">detects legal document fraud</span>
          </h2>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.07]">
            {showcases.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`relative px-6 py-2 text-sm rounded-lg font-medium transition ${
                  active === s.id
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {active === s.id && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-white/[0.1] border border-white/[0.12] rounded-lg"
                  />
                )}

                <span className="relative z-10">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active + "text"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-[32px] font-bold text-white mb-4">
                {current.headline}
              </h3>

              <p className="text-white/45 text-[16px] leading-relaxed mb-8">
                {current.body}
              </p>

              <button className="flex items-center gap-2 text-white/60 hover:text-white transition">
                View verification process
                <ChevronRight size={16} />
              </button>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active + "visual"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {current.visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
