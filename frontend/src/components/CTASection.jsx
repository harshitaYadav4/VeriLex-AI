import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0c18]/60 to-transparent pointer-events-none" />

      <div
        className="absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2 
      w-[900px] h-[500px] 
      bg-[radial-gradient(circle_at_center,#5c6ac420,transparent_70%)] 
      blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div
            className="w-20 h-20 mx-auto mb-10 rounded-2xl 
          bg-white/[0.05] border border-white/[0.08] 
          flex items-center justify-center shadow-lg"
          >
            <ShieldCheck size={30} className="text-white/80" />
          </div>

          <h2
            className="text-[44px] md:text-[64px] font-bold 
          tracking-[-0.03em] leading-[1.05] mb-6 
          bg-gradient-to-b from-white to-white/40 
          bg-clip-text text-transparent"
          >
            Stop Legal Document Fraud
            <br />
            With AI Verification
          </h2>

          <p
            className="text-[17px] text-white/45 leading-relaxed 
          mb-12 max-w-xl mx-auto"
          >
            VeriLex AI verifies court orders, government notifications, and
            legal documents in seconds using advanced AI analysis, digital
            signature validation, and trusted government database verification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo"
              className="group flex items-center gap-2 px-7 py-3.5 
              bg-white text-black text-[15px] font-semibold 
              rounded-xl hover:bg-white/90 transition-all 
              shadow-xl shadow-white/10"
            >
              Try Verification Demo
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="/technology"
              className="px-7 py-3.5 border border-white/[0.12] 
              text-white/70 text-[15px] font-medium rounded-xl 
              hover:bg-white/[0.05] hover:text-white 
              hover:border-white/20 transition-all"
            >
              See How It Works
            </Link>
          </div>

          <p className="mt-8 text-[12px] text-white/25 tracking-wide">
            AI Fraud Detection · Digital Signature Verification · Government
            Database Validation · Blockchain Audit Logs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
