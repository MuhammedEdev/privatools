"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function HashGenerator() {
  const [hashInput, setHashInput] = useState<string>("PrivaTools");
  const [sha1Output, setSha1Output] = useState<string>("");
  const [sha256Output, setSha256Output] = useState<string>("");
  const [sha512Output, setSha512Output] = useState<string>("");
  const [hashCopiedKey, setHashCopiedKey] = useState<string | null>(null);

  const computeHashes = async (text: string) => {
    setHashInput(text);
    if (!text) {
      setSha1Output("");
      setSha256Output("");
      setSha512Output("");
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const buffer1 = await crypto.subtle.digest("SHA-1", data);
    setSha1Output(Array.from(new Uint8Array(buffer1)).map(b => b.toString(16).padStart(2, '0')).join(''));

    const buffer256 = await crypto.subtle.digest("SHA-256", data);
    setSha256Output(Array.from(new Uint8Array(buffer256)).map(b => b.toString(16).padStart(2, '0')).join(''));

    const buffer512 = await crypto.subtle.digest("SHA-512", data);
    setSha512Output(Array.from(new Uint8Array(buffer512)).map(b => b.toString(16).padStart(2, '0')).join(''));
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setHashCopiedKey(key);
    setTimeout(() => setHashCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Crypto Hash Generator</h1>
        <p className="text-sm text-slate-400 mt-1">
          Web Crypto API kullanarak istemci tarafında güvenli SHA-1, SHA-256 ve SHA-512 özetleri üretin.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Girdi Metni</label>
          <textarea
            rows={4}
            value={hashInput}
            onChange={(e) => computeHashes(e.target.value)}
            placeholder="Hash çıkarılacak metni girin..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-400">SHA-1</label>
              <button
                onClick={() => copyToClipboard(sha1Output, "sha1")}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                {hashCopiedKey === "sha1" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {hashCopiedKey === "sha1" ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={sha1Output}
              className="w-full bg-[#090D16] border border-slate-800 rounded-md p-2.5 text-xs font-mono text-emerald-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-400">SHA-256</label>
              <button
                onClick={() => copyToClipboard(sha256Output, "sha256")}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                {hashCopiedKey === "sha256" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {hashCopiedKey === "sha256" ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={sha256Output}
              className="w-full bg-[#090D16] border border-slate-800 rounded-md p-2.5 text-xs font-mono text-emerald-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-400">SHA-512</label>
              <button
                onClick={() => copyToClipboard(sha512Output, "sha512")}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                {hashCopiedKey === "sha512" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {hashCopiedKey === "sha512" ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={sha512Output}
              className="w-full bg-[#090D16] border border-slate-800 rounded-md p-2.5 text-xs font-mono text-emerald-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}