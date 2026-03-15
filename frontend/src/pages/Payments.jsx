import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, ArrowLeft } from "lucide-react";
import { getPayments } from "../services/dashboardService";
import { auth } from "../firebase/firebase";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/auth");
      return;
    }
    (async () => {
      try {
        const list = await getPayments();
        setPayments(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-4"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
          <div className="flex items-center gap-3">
            <CreditCard size={24} className="text-[#5e6ad2]" />
            <h1 className="text-[28px] font-bold text-white tracking-[-0.03em]">
              Payment history
            </h1>
          </div>
          <p className="text-sm text-white/45 mt-1">
            All your VeriLex plan payments and receipts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-[#111118] border border-white/[0.08] rounded-xl overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center text-white/50 text-sm">
              Loading payments…
            </div>
          ) : payments.length === 0 ? (
            <div className="p-12 text-center text-white/50 text-sm">
              No payments yet. Purchase a plan from the{" "}
              <Link to="/pricing" className="text-[#5e6ad2] hover:underline">
                pricing page
              </Link>
              .
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-[11px] font-semibold text-white/50 uppercase tracking-wider px-5 py-3">
                      Plan
                    </th>
                    <th className="text-[11px] font-semibold text-white/50 uppercase tracking-wider px-5 py-3">
                      Amount
                    </th>
                    <th className="text-[11px] font-semibold text-white/50 uppercase tracking-wider px-5 py-3">
                      Status
                    </th>
                    <th className="text-[11px] font-semibold text-white/50 uppercase tracking-wider px-5 py-3">
                      Payment ID
                    </th>
                    <th className="text-[11px] font-semibold text-white/50 uppercase tracking-wider px-5 py-3">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, i) => (
                    <tr
                      key={p.razorpay_payment_id || i}
                      className="border-b border-white/[0.04] last:border-0"
                    >
                      <td className="px-5 py-3 text-sm font-medium text-white capitalize">
                        {p.plan || "—"}
                      </td>
                      <td className="px-5 py-3 text-sm text-white/70">
                        {p.amount != null ? `₹${Number(p.amount / 100).toLocaleString()}` : "—"}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                            (p.status || "").toLowerCase() === "success"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : (p.status || "").toLowerCase() === "failed"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {p.status || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-white/50 font-mono max-w-[180px] truncate">
                        {p.razorpay_payment_id || "—"}
                      </td>
                      <td className="px-5 py-3 text-sm text-white/50">
                        {p.created_at
                          ? new Date(p.created_at).toLocaleDateString(undefined, {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
