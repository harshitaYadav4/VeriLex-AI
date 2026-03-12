import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Search,
  Database,
  CheckCircle,
} from "lucide-react";

const initialDocs = [
  {
    id: "DOC-201",
    name: "Property Ownership Agreement.pdf",
    type: "Legal Contract",
    status: "verified",
    risk: "low",
    source: "eCourts Database",
  },
  {
    id: "DOC-202",
    name: "Company Registration Certificate.pdf",
    type: "Corporate Document",
    status: "review",
    risk: "medium",
    source: "MCA Registry",
  },
  {
    id: "DOC-203",
    name: "Government Permit License.pdf",
    type: "Government Document",
    status: "fraud",
    risk: "high",
    source: "Verification Failed",
  },
  {
    id: "DOC-204",
    name: "Rental Agreement.pdf",
    type: "Legal Contract",
    status: "verified",
    risk: "low",
    source: "Blockchain Record",
  },
];

const statusConfig = {
  verified: {
    label: "Verified",
    color: "#10b981",
    icon: ShieldCheck,
  },
  review: {
    label: "Needs Review",
    color: "#f59e0b",
    icon: Search,
  },
  fraud: {
    label: "Fraud Detected",
    color: "#ef4444",
    icon: AlertTriangle,
  },
};

const riskColors = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
};

export default function Demo() {
  const [docs] = useState(initialDocs);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = docs.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedDoc = docs.find((d) => d.id === selected);

  return (
    <main className="pt-20 min-h-screen bg-[#0a0a0a]">
      <section className="py-14 text-center">
        <h1 className="text-[44px] font-bold text-white mb-3">
          VeriLex AI Demo
        </h1>

        <p className="text-white/40 text-[15px]">
          Simulated AI verification of legal and government documents.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="relative max-w-sm mb-8">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full bg-white/[0.05] border border-white/[0.07] rounded-lg pl-9 pr-3 py-2 text-[13px] text-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-white/[0.05] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.05] text-white/60 text-[13px]">
              Uploaded Documents
            </div>

            {filtered.map((doc) => {
              const sc = statusConfig[doc.status];
              const Icon = sc.icon;

              return (
                <motion.div
                  key={doc.id}
                  layout
                  onClick={() => setSelected(doc.id)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-white/[0.03] hover:bg-white/[0.03] ${
                    selected === doc.id ? "bg-white/[0.05]" : ""
                  }`}
                >
                  <FileText size={16} className="text-white/40" />

                  <div className="flex-1">
                    <p className="text-[13px] text-white/80">{doc.name}</p>
                    <span className="text-[11px] text-white/30">{doc.id}</span>
                  </div>

                  <Icon size={16} style={{ color: sc.color }} />
                </motion.div>
              );
            })}
          </div>

          {selectedDoc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-white/[0.05] rounded-xl p-6"
            >
              <h2 className="text-[18px] text-white font-semibold mb-4">
                Verification Result
              </h2>

              <div className="space-y-4 text-[14px]">
                <div>
                  <span className="text-white/40">Document</span>
                  <p className="text-white/80">{selectedDoc.name}</p>
                </div>

                <div>
                  <span className="text-white/40">Type</span>
                  <p className="text-white/80">{selectedDoc.type}</p>
                </div>

                <div>
                  <span className="text-white/40">Verification Status</span>
                  <p
                    className="font-medium"
                    style={{
                      color: statusConfig[selectedDoc.status].color,
                    }}
                  >
                    {statusConfig[selectedDoc.status].label}
                  </p>
                </div>

                <div>
                  <span className="text-white/40">Fraud Risk</span>
                  <p
                    className="font-medium"
                    style={{
                      color: riskColors[selectedDoc.risk],
                    }}
                  >
                    {selectedDoc.risk.toUpperCase()}
                  </p>
                </div>

                <div>
                  <span className="text-white/40">Verification Source</span>
                  <p className="text-white/80 flex items-center gap-2">
                    <Database size={14} />
                    {selectedDoc.source}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.05]">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={16} />
                    AI authenticity analysis completed
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
