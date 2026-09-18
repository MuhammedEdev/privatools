"use client";

import { useState } from "react";
import { Copy, Check, Search, CheckCircle2, AlertCircle } from "lucide-react";

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>("([A-Z])\\w+");
  const [flags, setFlags] = useState<string>("g");
  const [testString, setTestString] = useState<string>("PrivaTools Pro Geliştirici Araç Seti ile Kodunuzu Modernize Edin.");
  const [copied, setCopied] = useState<boolean>(false);

  let isValid = true;
  let matches: RegExpMatchArray | null = null;
  let errorMessage = "";

  try {
    const regex = new RegExp(pattern, flags);
    matches = testString.match(regex);
  } catch (e: any) {
    isValid = false;
    errorMessage = e.message;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Regex Tester</h1>
          <p className="text-sm text-slate-400 mt-1">
            Düzenli ifadelerinizi (Regular Expressions) test edin, eşleşmeleri gerçek zamanlı analiz edin.
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-lg transition flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Kopyalandı" : "Regex Kopyala"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-3 text-xs">
            <label className="text-slate-400 font-medium">Düzenli İfade (RegEx Pattern)</label>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-mono text-sm">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="flex-1 bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-emerald-400 font-mono focus:outline-none focus:border-slate-700"
                placeholder="Pattern yazın..."
              />
              <span className="text-slate-500 font-mono text-sm">/</span>
              <input
                type="text"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="w-16 bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-slate-300 font-mono text-center focus:outline-none focus:border-slate-700"
                placeholder="flags"
              />
            </div>
            {!isValid && (
              <p className="text-rose-400 text-[11px] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Geçersiz Regex: {errorMessage}
              </p>
            )}
          </div>

          <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-2 text-xs">
            <label className="text-slate-400 font-medium">Test Edilecek Metin</label>
            <textarea
              rows={5}
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-3 text-slate-200 font-mono focus:outline-none focus:border-slate-700 resize-none shadow-inner leading-relaxed"
            />
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <h2 className="font-semibold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Eşleşme Sonuçları
          </h2>

          <div className="bg-[#0D121F] border border-slate-800 rounded-lg p-3 min-h-[160px] max-h-[220px] overflow-auto space-y-2">
            {isValid && matches ? (
              matches.length > 0 ? (
                matches.map((m, idx) => (
                  <div key={idx} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-2 rounded font-mono text-xs flex justify-between">
                    <span>#{idx + 1}</span>
                    <span className="font-semibold">{m}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">Eşleşme bulunamadı.</p>
              )
            ) : (
              <p className="text-slate-500 text-center py-8">Hatalı regex deseni.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}