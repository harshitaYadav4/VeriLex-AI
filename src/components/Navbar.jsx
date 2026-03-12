import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  {
    label: "Features",
    href: "/features",
    dropdown: [
      {
        label: "AI Verification",
        desc: "Detect forged legal documents instantly",
      },
      {
        label: "Fraud Detection",
        desc: "Identify tampered seals and signatures",
      },
      {
        label: "API Verification",
        desc: "Cross-check with government databases",
      },
      {
        label: "Audit Logs",
        desc: "Immutable blockchain verification records",
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
  { label: "Demo", href: "/demo" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 relative transition-transform group-hover:scale-110">
            <svg viewBox="0 0 100 100" fill="none">
              <path
                d="M10 10L50 90L90 10"
                stroke="white"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="text-white font-semibold text-[15px] tracking-tight">
            VeriLex AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() =>
                link.dropdown && setActiveDropdown(link.label)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href || "#"}
                className={`relative flex items-center gap-1 px-3 py-2 rounded-md text-[13.5px] font-medium transition-all ${
                  location.pathname === link.href
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}

                {link.dropdown && (
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      activeDropdown === link.label ? "rotate-180" : ""
                    }`}
                  />
                )}

                {location.pathname === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-white rounded-full"
                  />
                )}
              </Link>

              <AnimatePresence>
                {link.dropdown && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                  >
                    <div className="bg-[#111] border border-white/10 rounded-xl p-2 w-64 shadow-2xl shadow-black/50 backdrop-blur-xl">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          to="#"
                          className="block px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors group"
                        >
                          <div className="text-[13px] font-medium text-white/90 group-hover:text-white">
                            {item.label}
                          </div>

                          <div className="text-[12px] text-white/40 mt-0.5">
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="#"
            className="text-[13.5px] font-medium text-white/50 hover:text-white px-3 py-2"
          >
            Log in
          </Link>

          <Link
            to="#"
            className="text-[13.5px] font-semibold text-black bg-white hover:bg-white/90 px-4 py-2 rounded-lg transition-all hover:scale-[1.03]"
          >
            Sign up
          </Link>
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href || "#"}
                  className="py-2.5 text-[14px] font-medium text-white/60 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-3 border-t border-white/[0.06] flex flex-col gap-2">
                <Link className="py-2.5 text-[14px] font-medium text-white/60">
                  Log in
                </Link>

                <Link className="py-2.5 text-[14px] font-semibold text-center text-black bg-white rounded-lg">
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
