"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function RegexTester() {
  const [regexPattern, setRegexPattern] = useState<string>("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [regexFlags, setRegexFlags] = useState<string>("g");
  const [regexText, setRegexText] = useState<string>("İletişim için support@privatools.app adresine yazabilirsiniz.");
  const [regexMatches, setRegexMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);

  const handleRegexTest = (pattern: string, flags: string, text: string) => {
    setRegexPattern(pattern);
    setRegexFlags(flags);
    setRegexText(text);

    if (!pattern.trim() || !text.trim()) { setRegexMatches([]); setRegexError(null); return; }

    try {
      const re = new RegExp(pattern, flags);
      setRegexError(null);
      if (flags.includes("g")) {
        const matches = text.match(re);
        setRegexMatches(matches ? Array.from(matches) : []);
      } else {
        const match = text.match(re);
        setRegexMatches(match ? [match[0]] : []);
      }
    } catch (err: any) {
      setRegexError(err.message || "Geçersiz Regex kalıbı");
      setRegexMatches([]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Regex Tester & Matcher</h1>
        <p className="text-sm text-slate-400 mt-1">Düzenli ifadelerinizi (Regex) gerçek zamanlı olarak test edin.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-3 space-y-1">
            <label className="text-xs font-medium text-slate-400">Regex Kalıbı</label>
            <input
              type="text"
              value={regexPattern}
              onChange={(e) => handleRegexTest(e.target.value, regexFlags, regexText)}
              className="w-full bg-[#090D16] border border-slate-800 rounded-md px-3 py-2.5 text-xs font-mono text-emerald-400 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">Bayraklar</label>
            <input
              type="text"
              value={regexFlags}
              onChange={(e) => handleRegexTest(regexPattern, e.target.value, regexText)}
              className="w-full bg-[#090D16] border border-slate-800 rounded-md px-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none"
            />
          </div>
        </div>

        {regexError && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{regexError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            rows={8}
            value={regexText}
            onChange={(e) => handleRegexTest(regexPattern, regexFlags, e.target.value)}
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none resize-none"
          />
          <div className="w-full h-[165px] bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono overflow-y-auto space-y-1">
            {regexMatches.length > 0 ? (
              regexMatches.map((m, idx) => (
                <div key={idx} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
                  {idx + 1}. {m}
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">Eşleşme bulunamadı.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}