import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const JS_SNIPPET = `fetch("https://api.verilex.ai/fraud-check", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "API-Key": "sk_verilex_xxxxx"
  },
  body: JSON.stringify({
    document_url: "https://example.com/file.pdf"
  })
}).then(res => res.json()).then(console.log);`;

const PY_SNIPPET = `import requests

requests.post(
    "https://api.verilex.ai/fraud-check",
    headers={"API-Key": "sk_verilex_xxxxx"},
    json={"document_url": "https://example.com/file.pdf"},
)`;

const RESPONSE_SNIPPET = `{
  "fraud_score": 0.82,
  "risk_level": "medium",
  "recommendation": "manual review required"
}`;

export default function HowToIntegrate() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16 pb-16">
      <section className="max-w-4xl mx-auto px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
            <Link to="/" className="hover:text-white/70">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <span>How to integrate</span>
          </div>
          <h1 className="text-[30px] md:text-[36px] font-bold text-white tracking-[-0.03em] mb-2">
            How to integrate the VeriLex API
          </h1>
          <p className="text-sm text-white/50 max-w-xl">
            Follow this step-by-step guide to start verifying documents with the VeriLex
            fraud detection API.
          </p>
        </motion.div>

        <section className="bg-[#111118] border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white mb-1">
            1️⃣ Step 1 — Get your API key
          </h2>
          <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
            <li>
              <Link to="/auth" className="text-[#5e6ad2] hover:underline">
                Sign up
              </Link>{" "}
              for a VeriLex account.
            </li>
            <li>Choose a pricing plan (Free, Pro, or Enterprise).</li>
            <li>
              Once your plan is active, your API key will appear in the{" "}
              <Link to="/dashboard" className="text-[#5e6ad2] hover:underline">
                developer dashboard
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="bg-[#111118] border border-white/10 rounded-xl p-6 space-y-3">
          <h2 className="text-sm font-semibold text-white">
            2️⃣ Step 2 — Make an API request
          </h2>
          <p className="text-sm text-white/60">
            The VeriLex API exposes a single fraud check endpoint:
          </p>
          <code className="text-xs text-[#a5b4fc]">
            POST https://api.verilex.ai/fraud-check
          </code>
          <p className="text-xs text-white/50">
            Send the URL of the document you want to verify via the{" "}
            <code className="text-[#a5b4fc]">document_url</code> field.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="bg-[#111118] border border-white/10 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-white mb-2">
              3️⃣ JavaScript example
            </h3>
            <SyntaxHighlighter
              language="javascript"
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: 8,
                fontSize: 12,
                background: "#050509",
              }}
            >
              {JS_SNIPPET}
            </SyntaxHighlighter>
          </div>

          <div className="bg-[#111118] border border-white/10 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-white mb-2">
              4️⃣ Python example
            </h3>
            <SyntaxHighlighter
              language="python"
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: 8,
                fontSize: 12,
                background: "#050509",
              }}
            >
              {PY_SNIPPET}
            </SyntaxHighlighter>
          </div>
        </section>

        <section className="bg-[#111118] border border-white/10 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-white mb-2">
            5️⃣ Example response
          </h3>
          <SyntaxHighlighter
            language="json"
            style={oneDark}
            customStyle={{
              margin: 0,
              borderRadius: 8,
              fontSize: 12,
              background: "#050509",
            }}
          >
            {RESPONSE_SNIPPET}
          </SyntaxHighlighter>
        </section>
      </section>
    </main>
  );
}