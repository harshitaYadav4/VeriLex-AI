import { Link } from "react-router-dom";

const footerLinks = {
  Product: ["Features", "Changelog", "Roadmap", "Pricing", "Status"],
  Company: ["About", "Blog", "Careers", "Press", "Legal"],
  Resources: ["Documentation", "API", "Integrations", "Community", "Support"],
  Developers: ["GitHub", "API Reference", "CLI", "Webhooks", "Examples"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-6 h-6">
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
              <span className="text-white font-semibold text-[15px]">
                Linear
              </span>
            </Link>
            <p className="text-[13px] text-white/35 leading-relaxed max-w-[220px]">
              The new standard for modern software development.
            </p>
            <div className="flex gap-3 mt-5">
              {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all text-[11px] font-medium"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[12px] font-semibold text-white/50 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-[13px] text-white/35 hover:text-white/70 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/25">
            © {new Date().getFullYear()} Linear Fictional Clone. Built for
            demonstration purposes.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <Link
                key={l}
                to="#"
                className="text-[12px] text-white/25 hover:text-white/50 transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
