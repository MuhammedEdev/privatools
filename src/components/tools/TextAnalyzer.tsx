"use client";

import { useState } from "react";

export default function TextAnalyzer() {
  const [analyzerText, setAnalyzerText] = useState<string>("");

  const charCount = analyzerText.length;
  const wordCount = analyzerText.trim() ? analyzerText.trim().split(/\s+/).length : 0;
  const sentenceCount = analyzerText.trim() ? analyzerText.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphCount = analyzerText.trim() ? analyzerText.split(/\n+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Metin İstatistik Analizörü</h1>
        <p className="text-sm text-slate-400 mt-1">
          Metninizin kelime, karakter, cümle ve tahmini okuma süresi istatistiklerini hesaplayın.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-center">
          <p className="text-xs text-slate-500 font-medium">Karakter</p>
          <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">{charCount}</p>
        </div>
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-center">
          <p className="text-xs text-slate-500 font-medium">Kelime</p>
          <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">{wordCount}</p>
        </div>
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-center">
          <p className="text-xs text-slate-500 font-medium">Cümle / Paragraf</p>
          <p className="text-xl font-bold text-slate-200 mt-1 font-mono">{sentenceCount} / {paragraphCount}</p>
        </div>
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-center">
          <p className="text-xs text-slate-500 font-medium">Okuma Süresi</p>
          <p className="text-xl font-bold text-slate-200 mt-1 font-mono">~{readingTime} dk</p>
        </div>
      </div>

      <textarea
        rows={10}
        value={analyzerText}
        onChange={(e) => setAnalyzerText(e.target.value)}
        placeholder="Analiz edilecek metni yazın..."
        className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
      />
    </div>
  );
}