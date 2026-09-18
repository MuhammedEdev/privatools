"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, KeyRound, Layers } from "lucide-react";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState<string>(() => crypto.randomUUID());
  const [bulkUuids, setBulkUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedBulk, setCopiedBulk] = useState<boolean>(false);

  const generateSingle = () => {
    setUuid(crypto.randomUUID());
  };

  const generateBulk = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(crypto.randomUUID());
    }
    setBulkUuids(list);
  };

  const copyToClipboard = (text: string, isBulk: boolean = false) => {
    navigator.clipboard.writeText(text);
    if (isBulk) {
      setCopiedBulk(true);
      setTimeout(() => setCopiedBulk(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro UUID Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Kriptografik olarak güvenli v4 UUID kimlikleri tekli veya toplu olarak üretin.
          </p>
        </div>
      </div>

      {/* Tekli UUID Bölümü */}
      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5"><KeyRound className="w-3.5 h-3.5 text-emerald-400" /> Tekil UUID (v4)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#0D121F] border border-slate-800 rounded-lg p-3 font-mono text-emerald-400 text-sm tracking-wide truncate shadow-inner">
            {uuid}
          </div>
          <button
            onClick={generateSingle}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-3 rounded-lg transition border border-slate-700"
            title="Yenile"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => copyToClipboard(uuid, false)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-3 rounded-lg transition text-xs flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
        </div>
      </div>

      {/* Toplu UUID Bölümü */}
      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Layers className="w-3.5 h-3.5 text-emerald-400" /> Toplu UUID Üretimi
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Adet:</span>
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-16 bg-[#0D121F] border border-slate-800 rounded-md p-1.5 text-white font-mono text-center focus:outline-none"
              />
            </div>
            <button
              onClick={generateBulk}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs py-2 px-4 rounded-lg transition border border-slate-700"
            >
              Toplu Üret
            </button>
            {bulkUuids.length > 0 && (
              <button
                onClick={() => copyToClipboard(bulkUuids.join("\n"), true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-lg transition flex items-center gap-1.5"
              >
                {copiedBulk ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedBulk ? "Tümü Kopyalandı" : "Tümünü Kopyala"}
              </button>
            )}
          </div>
        </div>

        {bulkUuids.length > 0 && (
          <textarea
            rows={6}
            readOnly
            value={bulkUuids.join("\n")}
            className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none shadow-inner select-all leading-relaxed"
          />
        )}
      </div>
    </div>
  );
}