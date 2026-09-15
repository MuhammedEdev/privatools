"use client";

import { useState } from "react";
import { Copy, Check, Link2, AlertCircle } from "lucide-react";

export default function UrlEncoderDecoder() {
  const [urlInput, setUrlInput] = useState<string>("https://privatools.app/search?q=front-end developer&lang=tr");
  const [urlOutput, setUrlOutput] = useState<string>("");
  const [urlMode, setUrlMode] = useState<"encode" | "decode">("encode");
  const [urlCopied, setUrlCopied] = useState<boolean>(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleUrlProcess = (text: string, mode: "encode" | "decode") => {
    setUrlInput(text);
    setUrlError(null);
    if (!text.trim()) {
      setUrlOutput("");
      return;
    }
    try {
      if (mode === "encode") {
        setUrlOutput(encodeURIComponent(text));
      } else {
        setUrlOutput(decodeURIComponent(text));
      }
    } catch (err) {
      setUrlError("Geçersiz URL formatı çözülemedi.");
      setUrlOutput("");
    }
  };

  const copyToClipboard = () => {
    if (!urlOutput) return;
    navigator.clipboard.writeText(urlOutput);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">URL Encoder / Decoder</h1>
          <p className="text-sm text-slate-400 mt-1">
            URL parametrelerinizi ve metinlerinizi güvenle kodlayın veya çözün.
          </p>
        </div>

        <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => { setUrlMode("encode"); handleUrlProcess(urlInput, "encode"); }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${urlMode === "encode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
          >
            Encode
          </button>
          <button
            onClick={() => { setUrlMode("decode"); handleUrlProcess(urlInput, "decode"); }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${urlMode === "decode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
          >
            Decode
          </button>
        </div>
      </div>

      {urlError && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{urlError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">
            {urlMode === "encode" ? "Ham URL / Metin" : "Kodlanmış URL"}
          </label>
          <textarea
            rows={10}
            value={urlInput}
            onChange={(e) => handleUrlProcess(e.target.value, urlMode)}
            placeholder="İşlenecek URL'yi girin..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-400">Sonuç</label>
            {urlOutput && (
              <button
                onClick={copyToClipboard}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                {urlCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {urlCopied ? "Kopyalandı" : "Kopyala"}
              </button>
            )}
          </div>
          <textarea
            rows={10}
            readOnly
            value={urlOutput}
            placeholder="Sonuç burada görüntülenecek..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}