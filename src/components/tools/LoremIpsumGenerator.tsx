"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function LoremIpsumGenerator() {
  const [loremParagraphCount, setLoremParagraphCount] = useState<number>(3);
  const [loremOutput, setLoremOutput] = useState<string>("");
  const [loremCopied, setLoremCopied] = useState<boolean>(false);

  const sampleParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Curabitur pretium tiddus quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae."
  ];

  const generateLorem = (count: number) => {
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(sampleParagraphs[i % sampleParagraphs.length]);
    }
    setLoremOutput(result.join("\n\n"));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Lorem Ipsum Generator</h1>
        <p className="text-sm text-slate-400 mt-1">Arayüz tasarımlarınız için taslak metin üretin.</p>
      </div>

      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <select
            value={loremParagraphCount}
            onChange={(e) => { const val = parseInt(e.target.value); setLoremParagraphCount(val); generateLorem(val); }}
            className="bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value={1}>1 Paragraf</option>
            <option value={2}>2 Paragraf</option>
            <option value={3}>3 Paragraf</option>
            <option value={5}>5 Paragraf</option>
          </select>

          <button
            onClick={() => { navigator.clipboard.writeText(loremOutput); setLoremCopied(true); setTimeout(() => setLoremCopied(false), 2000); }}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5"
          >
            {loremCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {loremCopied ? "Kopyalandı" : "Tümünü Kopyala"}
          </button>
        </div>

        <textarea
          rows={8}
          readOnly
          value={loremOutput}
          className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none leading-relaxed"
        />
      </div>
    </div>
  );
}