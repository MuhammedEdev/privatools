"use client";

import React, { useState } from "react";
import { Copy, Check, Link2, AlertCircle, SlidersHorizontal } from "lucide-react";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProcess = (text: string, currentMode: "encode" | "decode") => {
    setInput(text);
    setError(null);

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
    } catch (err) {
      setError("Geçersiz URL kodlaması (Malformed URL encoding)!");
      setOutput("");
    }
  };

  const toggleMode = (newMode: "encode" | "decode") => {
    if (newMode === mode) return;
    setMode(newMode);
    const temp = input;
    setInput(output);
    setOutput(temp);
    setError(null);
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // URL içindeki query parametrelerini ayrıştırma (Ekstra Profesyonel Özellik)
  const getQueryParams = () => {
    try {
      const targetUrl = mode === "decode" ? input : output;
      if (!targetUrl.includes("?")) return null;
      const queryString = targetUrl.split("?")[1];
      const params = new URLSearchParams(queryString);
      const entries = Array.from(params.entries());
      return entries.length > 0 ? entries : null;
    } catch {
      return null;
    }
  };

  const queryParams = getQueryParams();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">URL Encoder / Decoder</h1>
          <p className="text-sm text-slate-400 mt-1">
            URL parametrelerinizi ve metinlerinizi güvenle kodlayın, çözün ve analiz edin.
          </p>
        </div>
        <div className="flex bg-[#090D16] p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => toggleMode("encode")}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
              mode === "encode" ? "bg-slate-800 text-white border border-slate-700" : "text-slate-400 hover:text-white"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => toggleMode("decode")}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
              mode === "decode" ? "bg-slate-800 text-white border border-slate-700" : "text-slate-400 hover:text-white"
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">
            {mode === "encode" ? "Normal Metin / URL" : "Encoded URL"}
          </label>
          <textarea
            rows={8}
            value={input}
            onChange={(e) => handleProcess(e.target.value, mode)}
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none shadow-inner"
            placeholder={mode === "encode" ? "Dönüştürülecek metni yazın..." : "Çözülecek URL kodunu yapıştırın..."}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-400">
              {mode === "encode" ? "URL Encoded Çıktısı" : "Çözülmüş Metin"}
            </label>
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
            rows={8}
            readOnly
            value={output}
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none shadow-inner select-all"
            placeholder="Sonuç burada görünecek..."
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Query Parametreleri Analiz Tablosu */}
      {queryParams && (
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>URL Parametreleri (Query Parameters) Analizi</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {queryParams.map(([key, val], idx) => (
              <div key={idx} className="bg-[#0D121F] border border-slate-800/80 rounded p-2 text-xs font-mono flex justify-between gap-2">
                <span className="text-emerald-400 font-semibold">{key}:</span>
                <span className="text-slate-300 truncate">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}