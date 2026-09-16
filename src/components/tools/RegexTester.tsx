"use client";

import { useState } from "react";
import { Copy, Check, Search, AlertCircle } from "lucide-react";

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b");
  const [flags, setFlags] = useState<string>("g");
  const [testString, setTestString] = useState<string>("Destek için bize contact@privatools.app veya support@dev.com adresinden ulaşabilirsiniz.");
  const [copied, setCopied] = useState<boolean>(false);

  let matches: string[] = [];
  let error: string | null = null;

  try {
    const regex = new RegExp(pattern, flags);
    const results = testString.match(regex);
    if (results) {
      matches = Array.from(results);
    }
  } catch (err: any) {
    error = err.message || "Geçersiz Regular Expression ifadesi";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Regex Tester</h1>
        <p className="text-sm text-slate-400 mt-1">
          Düzenli ifadelerinizi (Regular Expressions) test edin ve eşleşmeleri anında görün.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-medium text-slate-400">Regex Deseni (Pattern)</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-slate-700"
            placeholder="Örn: [0-9]+"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Bayraklar (Flags)</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700"
            placeholder="g, i, m vb."
          />
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Test Metni</label>
          <textarea
            rows={8}
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none resize-none"
            placeholder="Test edilecek metni yazın..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Eşleşen Sonuçlar ({matches.length})</label>
          <div className="w-full h-[172px] bg-[#090D16] border border-slate-800 rounded-lg p-3 overflow-y-auto space-y-1 font-mono text-xs">
            {matches.length > 0 ? (
              matches.map((m, idx) => (
                <div key={idx} className="bg-[#0D121F] border border-slate-800 text-emerald-400 px-2 py-1 rounded">
                  {m}
                </div>
              ))
            ) : (
              <span className="text-slate-500">Eşleşme bulunamadı</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}