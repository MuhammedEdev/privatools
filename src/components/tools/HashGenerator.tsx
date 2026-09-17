"use client";

import { useState, useEffect } from "react";
import { Copy, Check, ShieldCheck, Lock } from "lucide-react";

export default function HashGenerator() {
  const [input, setInput] = useState<string>("PrivaTools Güvenli Hash Aracı");
  const [sha256, setSha256] = useState<string>("");
  const [sha1, setSha1] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    generateHashes(input);
  }, [input]);

  const generateHashes = async (text: string) => {
    if (!text) {
      setSha256("");
      setSha1("");
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      // SHA-256
      const hashBuffer256 = await crypto.subtle.digest("SHA-256", data);
      const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
      const hashHex256 = hashArray256.map((b) => b.toString(16).padStart(2, "0")).join("");
      setSha256(hashHex256);

      // SHA-1
      const hashBuffer1 = await crypto.subtle.digest("SHA-1", data);
      const hashArray1 = Array.from(new Uint8Array(hashBuffer1));
      const hashHex1 = hashArray1.map((b) => b.toString(16).padStart(2, "0")).join("");
      setSha1(hashHex1);
    } catch (error) {
      console.error("Hash hesaplama hatası:", error);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Hash Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Metinleriniz için tarayıcı tabanlı güvenli SHA-256 ve SHA-1 özet (hash) değerleri üretin.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400">Girdi Metni</label>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hash üretilecek metni yazın..."
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none shadow-inner"
        />
      </div>

      <div className="space-y-4">
        {[
          { label: "SHA-256 Hash", val: sha256 },
          { label: "SHA-1 Hash", val: sha1 },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</span>
              {item.val && (
                <button
                  onClick={() => copyToClipboard(item.val, item.label)}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                >
                  {copiedKey === item.label ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === item.label ? "Kopyalandı" : "Kopyala"}
                </button>
              )}
            </div>
            <div className="bg-[#0D121F] border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400 break-all select-all">
              {item.val || "Hesaplanıyor..."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}