import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { signupWithEmail, loginWithEmail, loginWithGoogle } from "../services/authService";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#111118] border border-white/10 rounded-2xl p-8"
      >
        <Link to="/" className="flex items-center gap-2 mb-8">
          <svg width="28" height="28" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="#5e6ad2" />
          </svg>
          <span className="text-white font-semibold text-[18px] tracking-tight">
            VeriLex AI
          </span>
        </Link>

        <h1 className="text-white text-[22px] font-bold tracking-[-0.03em] mb-2">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-white/50 text-sm mb-6">
          {mode === "login"
            ? "Sign in to access your dashboard and API keys."
            : "Start detecting fraud with the VeriLex API."}
        </p>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/40 text-red-200 text-xs rounded-lg px-3 py-2 mb-4">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="email"
              className="w-full bg-[#050509] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#5e6ad2]"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="password"
              className="w-full bg-[#050509] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#5e6ad2]"
              placeholder="Password"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5e6ad2] hover:bg-[#4f5db5] disabled:bg-[#3d4085] text-white text-sm font-semibold rounded-lg py-2.5 mt-1 transition-colors"
          >
            {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/40">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-white/10 rounded-lg py-2.5 text-sm text-white/80 hover:bg-white/5"
        >
          <span className="text-xs bg-white rounded-[4px] px-1.5 py-0.5 text-black font-semibold">
            G
          </span>
          Continue with Google
        </button>

        <p className="text-center text-xs text-white/45 mt-6">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
            className="text-[#5e6ad2] font-semibold"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </main>
  );
}