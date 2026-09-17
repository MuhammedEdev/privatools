"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

export default function HtmlEntityConverter() {
  const [input, setInput] = useState<string>('<div class="card">\n  <h1>PrivaTools &copy; 2026</h1>\n  <p>Güvenli &amp; Hızlı Araçlar</p>\n</div>');
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    processText(input, mode);
  }, [input, mode]);

  const processText = (text: string, currentMode: "encode" | "decode") => {
    if (!text) {
      setOutput("");
      return;
    }
    if (currentMode === "encode") {
      const encoded = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      setOutput(encoded);
    } else {
      const decoded = text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&copy;/g, "©")
        .replace(/&reg;/g, "®");
      setOutput(decoded);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro HTML Entity Converter</h1>
          <p className="text-sm text-slate-400 mt-1">
            Özel HTML karakterlerini entity kodlarına dönüştürün veya geri çözün.
          </p>
        </div>

        <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => setMode("encode")}
            className={`px-3 py-1.5 rounded-md font-medium transition ${mode === "encode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-3 py-1.5 rounded-md font-medium transition ${mode === "decode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">
            {mode === "encode" ? "Ham Metin / HTML" : "HTML Entities"}
          </label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dönüştürülecek içeriği girin..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none shadow-inner"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-400">Sonuç Çıktısı</label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Kopyalandı" : "Kopyala"}
              </button>
            )}
          </div>
          <textarea
            rows={10}
            readOnly
            value={output}
            placeholder="Sonuç burada görünecek..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none shadow-inner select-all"
          />
        </div>
      </div>
    </div>
  );
}