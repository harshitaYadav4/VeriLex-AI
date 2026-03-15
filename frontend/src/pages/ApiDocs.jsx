import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy, Check, ChevronRight } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ENDPOINT = "https://api.verilex.ai";

const EXAMPLES = {
  javascript: `// JavaScript (fetch)
fetch("${ENDPOINT}/fraud-check", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
  },
  body: JSON.stringify({
    amount: 2500,
    location: "Mumbai, IN",
    device_type: "iOS"
  })
})
  .then(res => res.json())
  .then(data => {
    console.log("Fraud result:", data.result);
    console.log("Risk score:", data.risk_score);
  });`,

  python: `# Python (requests)
import requests

response = requests.post(
    "${ENDPOINT}/fraud-check",
    headers={
        "Content-Type": "application/json",
        "x-api-key": "YOUR_API_KEY",
    },
    json={
        "amount": 2500,
        "location": "Mumbai, IN",
        "device_type": "iOS",
    },
)

data = response.json()
print("Fraud result:", data["result"])
print("Risk score:", data["risk_score"])`,

  response: `// Example response
{
  "result": "fraudulent",
  "risk_score": 0.92,
  "reasons": ["ip_mismatch", "velocity_check_failed"]
}`,
};

const LANG_MAP = { javascript: "javascript", python: "python", response: "json" };

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState("javascript");
  const [copied, setCopied] = useState(false);
 
  function copy() {
    navigator.clipboard.writeText(EXAMPLES[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
 
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", padding: "0 0 80px" }}>
      {/* Top bar */}
      <div style={{ borderBottom: "1px solid #1e1e2e", background: "#0d0d16", padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 10, height: 60 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <svg width="22" height="22" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#5e6ad2" /></svg>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>VeriLex AI</span>
          </Link>
          <ChevronRight size={14} color="#374151" />
          <span style={{ color: "#6b7280", fontSize: 14 }}>API Documentation</span>
        </div>
      </div>
 
      <div style={{ maxWidth: 900, margin: "48px auto", padding: "0 32px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <span style={{ display: "inline-block", background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 100, padding: "4px 12px", color: "#a5b4fc", fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
              REST API · v1
            </span>
            <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12 }}>
              VeriLex API Reference
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 15, lineHeight: 1.7, maxWidth: 600 }}>
              Integrate AI-powered fraud detection into your app in minutes. Send a document URL — get back a fraud risk score, risk level, and actionable recommendation.
            </p>
          </div>
 
          {/* Authentication */}
          <Section title="Authentication">
            <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              All requests require your API key in the <Code>x-api-key</Code> header. Get your key from the{" "}
              <Link to="/dashboard" style={{ color: "#5e6ad2", textDecoration: "none" }}>dashboard</Link>.
            </p>
            <CodeBlock lang="bash" code={`x-api-key: sk_verilex_xxxxxxxxxxxxxxxxx`} />
          </Section>
 
          {/* Endpoint */}
          <Section title="POST /fraud-check">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ background: "#1a2e1a", border: "1px solid #14532d", borderRadius: 6, padding: "4px 10px", color: "#4ade80", fontSize: 12, fontWeight: 700 }}>POST</span>
              <code style={{ color: "#a5b4fc", fontSize: 14 }}>{ENDPOINT}/fraud-check</code>
            </div>
            <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Runs a fraud check on a single transaction and returns a risk score.
            </p>
 
            {/* Request body */}
            <h4 style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Request Body</h4>
            <ParamTable rows={[
              { name: "amount", type: "number", required: true, desc: "Transaction amount in smallest currency unit" },
              { name: "location", type: "string", required: true, desc: "Location of the transaction (e.g. city, country code)" },
              { name: "device_type", type: "string", required: true, desc: "Device type / platform used to initiate the transaction" },
            ]} />
 
            {/* Response */}
            <h4 style={{ color: "#e5e7eb", fontSize: 13, fontWeight: 600, margin: "24px 0 10px" }}>Response Fields</h4>
            <ParamTable rows={[
              { name: "result", type: "string", required: "-", desc: "fraudulent / suspicious / clean" },
              { name: "risk_score", type: "float", required: "-", desc: "0.0 (low risk) to 1.0 (high risk)" },
              { name: "reasons", type: "array", required: "-", desc: "List of rules or checks that contributed to the decision" },
            ]} />
          </Section>
 
          {/* Code examples */}
          <Section title="Integration Examples">
            <div style={{ display: "flex", gap: 4, marginBottom: 0 }}>
              {Object.keys(EXAMPLES).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: activeTab === tab ? "#1a1a2e" : "transparent",
                    border: "1px solid",
                    borderColor: activeTab === tab ? "#2d2d4e" : "transparent",
                    borderBottom: "none",
                    borderRadius: "6px 6px 0 0",
                    padding: "7px 14px",
                    color: activeTab === tab ? "#e5e7eb" : "#6b7280",
                    fontSize: 13,
                    fontWeight: activeTab === tab ? 600 : 400,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ position: "relative", borderRadius: "0 8px 8px 8px", overflow: "hidden", border: "1px solid #1e1e2e" }}>
              <button
                onClick={copy}
                style={{ position: "absolute", top: 12, right: 12, background: "#1a1a2e", border: "1px solid #2d2d4e", borderRadius: 6, padding: "5px 10px", color: "#9ca3af", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, zIndex: 1 }}
              >
                {copied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <SyntaxHighlighter
                language={LANG_MAP[activeTab]}
                style={oneDark}
                customStyle={{ margin: 0, borderRadius: 0, background: "#0d0d16", fontSize: 13, padding: "24px 20px" }}
              >
                {EXAMPLES[activeTab]}
              </SyntaxHighlighter>
            </div>
          </Section>
 
          {/* Error codes */}
          <Section title="Error Codes">
            <ParamTable rows={[
              { name: "401", type: "Unauthorized", required: "-", desc: "Missing or invalid API key" },
              { name: "402", type: "Payment Required", required: "-", desc: "API key plan has no remaining quota" },
              { name: "422", type: "Unprocessable", required: "-", desc: "Invalid document URL or unsupported format" },
              { name: "429", type: "Too Many Requests", required: "-", desc: "Rate limit exceeded" },
              { name: "500", type: "Server Error", required: "-", desc: "Internal error — contact support" },
            ]} />
          </Section>
 
          {/* CTA */}
          <div style={{ background: "linear-gradient(135deg, #111118, #1a1a2e)", border: "1px solid #2d2d4e", borderRadius: 16, padding: "32px", textAlign: "center", marginTop: 48 }}>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Ready to integrate?</h3>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>Get your API key in seconds — start with the free tier.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link to="/auth" style={{ background: "#5e6ad2", color: "#fff", textDecoration: "none", padding: "10px 22px", borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
                Get API Key
              </Link>
              <Link to="/pricing" style={{ background: "#1a1a2e", color: "#d1d5db", textDecoration: "none", padding: "10px 22px", borderRadius: 8, fontWeight: 600, fontSize: 14, border: "1px solid #2d2d4e" }}>
                View Pricing
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
 
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #1e1e2e" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
 
function Code({ children }) {
  return (
    <code style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 4, padding: "2px 6px", color: "#a5b4fc", fontSize: 13 }}>
      {children}
    </code>
  );
}
 
function CodeBlock({ lang, code }) {
  return (
    <SyntaxHighlighter language={lang} style={oneDark} customStyle={{ borderRadius: 8, fontSize: 13, background: "#0d0d16", border: "1px solid #1e1e2e" }}>
      {code}
    </SyntaxHighlighter>
  );
}
 
function ParamTable({ rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          {["Field", "Type", "Required", "Description"].map((h) => (
            <th key={h} style={{ textAlign: "left", color: "#6b7280", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "6px 10px", borderBottom: "1px solid #1e1e2e", background: "#0d0d16" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "#0d0d16" }}>
            <td style={{ padding: "10px 10px", borderBottom: "1px solid #111" }}><code style={{ color: "#a5b4fc" }}>{row.name}</code></td>
            <td style={{ padding: "10px 10px", color: "#fbbf24", borderBottom: "1px solid #111" }}>{row.type}</td>
            <td style={{ padding: "10px 10px", color: row.required === true ? "#34d399" : "#6b7280", borderBottom: "1px solid #111" }}>{row.required === true ? "yes" : row.required === false ? "no" : row.required}</td>
            <td style={{ padding: "10px 10px", color: "#9ca3af", borderBottom: "1px solid #111" }}>{row.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}