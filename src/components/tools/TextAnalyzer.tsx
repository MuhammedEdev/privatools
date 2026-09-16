"use client";

import { useState } from "react";
import { FileText, AlignLeft, Clock, Check, Copy } from "lucide-react";

export default function TextAnalyzer() {
  const [text, setText] = useState<string>("PrivaTools, geliştiriciler için tasarlanmış modern, güvenli ve tarayıcı tabanlı açık kaynaklı bir araç setidir. Verileriniz asla sunucuya gönderilmez.");
  const [copied, setCopied] = useState<boolean>(false);

  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200); // Ortalama dakikada 200 kelime okuma hızı

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Text Analyzer</h1>
          <p className="text-sm text-slate-400 mt-1">
            Metinlerinizdeki kelime, karakter, cümle sayılarını ve tahmini okuma süresini analiz edin.
          </p>
        </div>
        {text && (
          <button
            onClick={copyToClipboard}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Kopyalandı" : "Metni Kopyala"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Kelime Sayısı", val: wordCount, icon: FileText },
          { label: "Karakter (Boşluklu)", val: charCount, icon: AlignLeft },
          { label: "Karakter (Boşluksuz)", val: charCountNoSpaces, icon: AlignLeft },
          { label: "Tahmini Okuma", val: `${readingTime} dk`, icon: Clock },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                <Icon className="w-3.5 h-3.5 text-emerald-400" />
                <span>{item.label}</span>
              </div>
              <div className="text-2xl font-mono font-bold text-white">
                {item.val}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-400">Analiz Edilecek Metin</label>
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Analiz edilecek metni buraya yazın veya yapıştırın..."
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none leading-relaxed"
        />
      </div>
    </div>
  );
}