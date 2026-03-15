import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Key, Zap, BarChart3, BookOpen, CreditCard } from "lucide-react";
import { getDashboard } from "../services/dashboardService";
import { auth } from "../firebase/firebase";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/auth");
      return;
    }
    (async () => {
      try {
        const dash = await getDashboard();
        setData(dash);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <span className="text-sm text-[#5e6ad2]">Loading dashboard…</span>
      </div>
    );
  }

  const { api_key, plan, usage_count } = data;

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16 pb-16">
      <header className="border-b border-white/10 bg-[#0d0d16]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50" fill="#5e6ad2" />
            </svg>
            <span className="text-white text-sm font-semibold">VeriLex AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/payments"
              className="text-xs text-white/60 hover:text-white flex items-center gap-1"
            >
              <CreditCard size={14} />
              Payments
            </Link>
            <Link
              to="/api-docs"
              className="text-xs text-white/60 hover:text-white flex items-center gap-1"
            >
              <BookOpen size={14} />
              API docs
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 mt-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-white text-[24px] font-bold tracking-[-0.03em]">
            Developer Dashboard
          </h1>
          <p className="text-sm text-white/45">
            Manage your API key, subscription plan, and usage for the VeriLex API.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-[#111118] border border-white/10 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Zap size={14} className="text-[#5e6ad2]" />
              Subscription plan
            </div>
            <div className="text-lg text-white font-semibold capitalize">
              {plan || "free"}
            </div>
          </div>

          <div className="bg-[#111118] border border-white/10 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <BarChart3 size={14} className="text-emerald-400" />
              API usage
            </div>
            <div className="text-lg text-white font-semibold">
              {usage_count ?? 0}
            </div>
            <div className="text-xs text-white/35">Total calls</div>
          </div>

          <div className="bg-[#111118] border border-white/10 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Key size={14} className="text-amber-300" />
              API key
            </div>
            <code className="block text-xs text-[#a5b4fc] bg-black/40 rounded-md px-3 py-2 break-all">
              {api_key || "No API key yet — complete a plan purchase."}
            </code>
          </div>
        </div>
      </section>
    </main>
  );
}