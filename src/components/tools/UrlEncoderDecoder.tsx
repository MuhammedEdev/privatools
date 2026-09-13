"use client";

import { useState } from "react";

export default function UrlEncoderDecoder() {
  const [urlInput, setUrlInput] = useState<string>("");
  const [urlOutput, setUrlOutput] = useState<string>("");
  const [urlMode, setUrlMode] = useState<"encode" | "decode">("encode");

  const handleUrlProcess = (text: string, mode: "encode" | "decode") => {
    setUrlInput(text);
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
      setUrlOutput("Hata: Dönüştürme yapılamadı.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold text-white">URL Encoder / Decoder</h1>
          <p className="text-sm text-slate-400 mt-1">
            URL adreslerinizdeki özel karakterleri istemci tarafında güvenle kodlayın veya çözün.
          </p>
        </div>
        <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => {
              setUrlMode("encode");
              handleUrlProcess(urlInput, "encode");
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              urlMode === "encode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => {
              setUrlMode("decode");
              handleUrlProcess(urlInput, "decode");
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              urlMode === "decode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          rows={10}
          value={urlInput}
          onChange={(e) => handleUrlProcess(e.target.value, urlMode)}
          placeholder="Metin veya URL yazın..."
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
        />
        <textarea
          rows={10}
          readOnly
          value={urlOutput}
          placeholder="Çıktı burada görünecek..."
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}