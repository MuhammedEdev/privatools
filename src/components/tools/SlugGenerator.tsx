"use client";

import React, { useState } from "react";

export default function SlugGenerator() {
  const [input, setInput] = useState("PrivaTools En İyi Geliştirici Araçları 2026!");
  
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9 -]/g, "") // Özel karakterleri temizle
      .replace(/\s+/g, "-") // Boşlukları tire yap
      .replace(/-+/g, "-"); // Çoklu tireleri teke düşür
  };

  const slug = generateSlug(input);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
    alert("Slug kopyalandı!");
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-xl mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">Slug Generator</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Dönüştürülecek Metin</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
            placeholder="Metin girin..."
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">URL Slug Çıktısı</label>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg font-mono text-indigo-300 break-all">
            {slug || "slug-burada-gorunur"}
          </div>
        </div>

        <button
          onClick={copyToClipboard}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          Slug'ı Kopyala
        </button>
      </div>
    </div>
  );
}