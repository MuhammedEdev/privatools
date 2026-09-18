"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Link, Globe } from "lucide-react";

export default function SlugGenerator() {
  const [input, setInput] = useState<string>("PrivaTools ile Web Geliştirme Sprinti 2026!");
  const [slug, setSlug] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    generateSlug(input);
  }, [input]);

  const generateSlug = (text: string) => {
    const generated = text
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setSlug(generated);
  };

  const copyToClipboard = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Slug Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Metinlerinizi URL uyumlu, temiz ve SEO dostu slug formatına dönüştürün.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Kaynak Metin / Başlık</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Başlık yazın..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 shadow-inner"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-slate-400">URL Slug Çıktısı</label>
            {slug && (
              <button
                onClick={copyToClipboard}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Kopyalandı" : "Slug Kopyala"}
              </button>
            )}
          </div>
          <div className="bg-[#0D121F] border border-slate-800 rounded-lg p-3.5 font-mono text-xs text-emerald-400 flex items-center justify-between select-all">
            <span className="truncate">{slug || "Slug bekleniyor..."}</span>
            <Globe className="w-4 h-4 text-slate-600 shrink-0 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}