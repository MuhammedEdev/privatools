"use client";

import { useState } from "react";
import { Copy, Check, Link } from "lucide-react";

export default function SlugGenerator() {
  const [input, setInput] = useState<string>("PrivaTools ile Web Geliştirme Sürecini Hızlandırın!");
  const [copied, setCopied] = useState<boolean>(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const slugOutput = generateSlug(input);

  const copyToClipboard = () => {
    if (!slugOutput) return;
    navigator.clipboard.writeText(slugOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">URL Slug Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Başlık ve metinlerinizi SEO uyumlu URL slug formatına dönüştürün.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Orijinal Metin veya Başlık</label>
          <textarea
            rows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dönüştürülecek başlığı yazın..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-400">SEO Uyumlu Slug Çıktısı</label>
            {slugOutput && (
              <button
                onClick={copyToClipboard}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Kopyalandı" : "Kopyala"}
              </button>
            )}
          </div>
          <textarea
            rows={6}
            readOnly
            value={slugOutput}
            placeholder="Slug çıktısı burada görünecek..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}