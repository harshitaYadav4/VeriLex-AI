import { motion } from "framer-motion";

const logos = [
  {
    name: "DigiLocker",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 fill-white/40 group-hover:fill-white transition-all"
      >
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
      </svg>
    ),
  },
  {
    name: "eCourts",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 fill-white/40 group-hover:fill-white transition-all"
      >
        <path d="M12 2l10 6v8l-10 6L2 16V8l10-6z" />
      </svg>
    ),
  },
  {
    name: "API Setu",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 fill-white/40 group-hover:fill-white transition-all"
      >
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    name: "MCA",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 fill-white/40 group-hover:fill-white transition-all"
      >
        <rect x="4" y="4" width="16" height="16" rx="3" />
      </svg>
    ),
  },
  {
    name: "UIDAI",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 fill-white/40 group-hover:fill-white transition-all"
      >
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>
    ),
  },
  {
    name: "Blockchain",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 fill-white/40 group-hover:fill-white transition-all"
      >
        <path d="M12 2l6 4v8l-6 4-6-4V6l6-4z" />
      </svg>
    ),
  },
];

const allLogos = [...logos, ...logos, ...logos];

export default function LogoCloud() {
  return (
    <section className="py-20 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-12 px-6">
        <p className="text-[13px] uppercase tracking-[0.25em] text-white/30 font-medium">
          Trusted verification ecosystem
        </p>

        <h3 className="mt-3 text-white/80 text-[18px] font-medium">
          Integrated with government & digital verification platforms
        </h3>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        <motion.div
          className="flex items-center gap-20"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center w-28 flex-shrink-0 cursor-pointer transition-all"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-white/10 transition-opacity" />

              <div className="relative scale-100 group-hover:scale-110 transition-transform">
                {logo.svg}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
