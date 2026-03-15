import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { checkFraud } from "../services/fraudService";

export default function TestApi() {
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await checkFraud({
        amount: parseFloat(amount),
        location,
        device_type: deviceType,
      });
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to check fraud");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20 pb-16">
      <section className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-sm text-white/40 mb-3">
            <Link to="/" className="hover:text-white/70">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span>Test API</span>
          </div>
          <h1 className="text-[32px] md:text-[40px] font-bold text-white tracking-[-0.03em] mb-2">
            Fraud detection sandbox
          </h1>
          <p className="text-[15px] text-white/45 max-w-xl">
            Send a sample transaction to the VeriLex fraud engine and inspect the JSON
            response as your application would see it.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-[#111118] border border-white/[0.06] rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">
                Transaction amount (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-[#050509] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#5e6ad2]"
                placeholder="2500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full bg-[#050509] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#5e6ad2]"
                placeholder="Mumbai, IN"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">
                Device type
              </label>
              <input
                type="text"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                required
                className="w-full bg-[#050509] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-[#5e6ad2]"
                placeholder="iOS, Android, Web…"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                <AlertTriangle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5e6ad2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4f5db5] disabled:bg-[#3b407f] disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Checking…
                </>
              ) : (
                "Run fraud check"
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#050509] border border-white/[0.05] rounded-xl p-6 text-sm text-white/70"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-[0.16em]">
                Response
              </span>
              {result && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                  <CheckCircle2 size={14} />
                  Live from API
                </span>
              )}
            </div>
            <pre className="text-xs leading-relaxed whitespace-pre-wrap break-words font-mono text-white/80">
              {result
                ? JSON.stringify(result, null, 2)
                : "// Run a fraud check to see the JSON response here."}
            </pre>
          </motion.div>
        </div>
      </section>
    </main>
  );
}