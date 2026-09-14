"use client";

import React, { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("Destek için destek@privatools.com veya info@test.org adresine yazabilirsiniz.");
  const [error, setError] = useState<string | null>(null);

  let matches: string[] = [];
  try {
    const regex = new RegExp(pattern, flags);
    const results = testText.match(regex);
    if (results) {
      matches = Array.from(results);
    }
    if (error) setError(null);
  } catch (err: any) {
    if (!error) setError(err.message);
  }

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-2xl mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">Pro Regex Tester & Matcher</h2>

      <div className="space-y-4">
        {/* Regex ve Bayraklar (Flags) */}
        <div className="flex gap-2">
          <div className="flex-1 relative flex items-center">
            <span className="absolute left-3 text-zinc-500 font-mono">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-7 pr-4 py-2.5 text-sm font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 shadow-inner"
              placeholder="Regex deseni (örn: \d+)"
            />
            <span className="absolute right-3 text-zinc-500 font-mono">/</span>
          </div>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-20 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm font-mono text-center text-emerald-400 focus:outline-none focus:border-indigo-500 shadow-inner"
            placeholder="flags"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-lg text-red-300 text-xs font-mono">
            Geçersiz Regex: {error}
          </div>
        )}

        {/* Test Metni */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Test Edilecek Metin</label>
          <textarea
            rows={4}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-indigo-500 shadow-inner"
            placeholder="Regex testi yapılacak metni girin..."
          />
        </div>

        {/* Sonuçlar / Eşleşmeler */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">
            Bulunan Eşleşmeler ({matches.length})
          </label>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs max-h-40 overflow-auto space-y-1">
            {matches.length > 0 ? (
              matches.map((match, idx) => (
                <div key={idx} className="bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 px-2.5 py-1 rounded">
                  {idx + 1}. Eşleşme: <span className="font-bold">{match}</span>
                </div>
              ))
            ) : (
              <span className="text-zinc-500">// Eşleşme bulunamadı</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}