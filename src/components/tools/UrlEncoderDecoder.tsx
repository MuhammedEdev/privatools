"use client";

import { useState } from "react";
import { Copy, Check, Link, Globe, Trash2 } from "lucide-react";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState<string>("https://privatools.app/search?q=geliştirici araçları&lang=tr");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState<boolean>(false);

  const handleProcess = (text: string, currentMode: "encode" | "decode") => {
    setInput(text);
    if (!text.trim()) {
      setOutput("");
      return;
    }

    try {
      if (currentMode === "encode") {
        setOutput(encodeURIComponent(text));
      } else {
        setOutput(decodeURIComponent(text));
      }
    } catch (e) {
      setOutput("Geçersiz URL kodlaması!");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
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
          <h1 className="text-xl font-semibold text-white">Pro URL Encoder / Decoder</h1>
          <p className="text-sm text-slate-400 mt-1">
            URL parametrelerini güvenli bir şekilde kodlayın veya çözün.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearAll}
            className="bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 text-xs font-medium py-2 px-3 rounded-lg transition flex items-center gap-1.5 border border-slate-700"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Temizle</span>
          </button>

          <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => { setMode("encode"); handleProcess(input, "encode"); }}
              className={`px-3 py-1.5 rounded-md font-medium transition ${mode === "encode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Encode
            </button>
            <button
              onClick={() => { setMode("decode"); handleProcess(input, "decode"); }}
              className={`px-3 py-1.5 rounded-md font-medium transition ${mode === "decode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Decode
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">
            {mode === "encode" ? "Kodlanacak Metin / URL" : "Çözülecek URL"}
          </label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => handleProcess(e.target.value, mode)}
            placeholder="Veriyi buraya girin..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none shadow-inner leading-relaxed"
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
            value={output || (input ? encodeURIComponent(input) : "")}
            placeholder="Sonuç burada görüntülenecek..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none shadow-inner select-all leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}