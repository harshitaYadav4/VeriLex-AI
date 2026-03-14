import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Upload,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-white/60">
            <Star size={12} className="text-yellow-400" fill="currentColor" />
            AI Legal Verification Platform
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-[52px] md:text-[72px] font-bold text-white leading-[1.05] tracking-[-0.03em] mt-6 mb-6"
        >
          Verify Legal Documents
          <br />
          <span className="text-white/40">with AI Precision</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="max-w-xl text-[17px] text-white/50 mb-10"
        >
          VeriLex AI detects forged court orders, legal notices, and official
          documents using machine learning, database verification, and
          tamper-proof audit trails.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex gap-3"
        >
          <Link
            to="/demo"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90"
          >
            Try Demo
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/features"
            className="px-6 py-3 border border-white/10 text-white/70 rounded-lg hover:bg-white/[0.05]"
          >
            Learn more
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 w-full max-w-4xl"
        >
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl">
            <div className="bg-[#111] px-4 py-3 border-b border-white/[0.06] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            \
            <div className="bg-[#0d0d0d] p-8 grid md:grid-cols-3 gap-6">
              \
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-5 text-center">
                <Upload className="mx-auto text-indigo-400 mb-3" />
                <p className="text-sm text-white/70">Upload Document</p>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-5 text-center">
                <ScanSearch className="mx-auto text-yellow-400 mb-3" />
                <p className="text-sm text-white/70">AI Analysis</p>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-5 text-center">
                <ShieldCheck className="mx-auto text-green-400 mb-3" />
                <p className="text-sm text-white/70">Verification Result</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
