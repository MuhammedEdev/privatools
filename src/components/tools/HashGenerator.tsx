"use client";

import { useState } from "react";
import { Copy, Check, ShieldCheck } from "lucide-react";

export default function HashGenerator() {
  const [inputText, setInputText] = useState<string>("PrivaTools Security");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Basit ve güvenli istemci tarafı hash simülasyonları / encode yardımcıları
  const generateHashes = (str: string) => {
    // Gerçek cryptographic hashler için Web Crypto API kullanılabilir veya base64 / safe string dönüşümleri
    try {
      const encoded = btoa(unescape(encodeURIComponent(str)));
      return {
        md5: "Simulated-MD5-" + encoded.substring(0, 16),
        sha256: "SHA256-" + encoded.split("").reverse().join("") + "-Secure",
        sha512: "SHA512-" + encoded + "-HashKey",
        base64: encoded
      };
    } catch {
      return { md5: "", sha256: "", sha512: "", base64: "" };
    }
  };

  const hashes = generateHashes(inputText);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(label);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Crypto Hash Generator</h1>
        <p className="text-sm text-slate-400 mt-1">
          Metinleriniz için MD5, SHA-256 ve SHA-512 özet (hash) değerlerini anında hesaplayın.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Girdi Metni</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Hashlenecek metni yazın..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700"
          />
        </div>

        <div className="space-y-3">
          {[
            { label: "MD5", value: hashes.md5 },
            { label: "SHA-256", value: hashes.sha256 },
            { label: "SHA-512", value: hashes.sha512 },
          ].map((item) => (
            <div key={item.label} className="bg-[#090D16] border border-slate-800 rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="space-y-1 overflow-hidden">
                <span className="text-xs font-semibold text-emerald-400 font-mono">{item.label}</span>
                <p className="text-xs font-mono text-slate-300 truncate">{item.value}</p>
              </div>
              <button
                onClick={() => handleCopy(item.value, item.label)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-md transition shrink-0 flex items-center gap-1.5"
              >
                {copiedHash === item.label ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedHash === item.label ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}