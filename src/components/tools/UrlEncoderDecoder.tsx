"use client";

import React, { useState } from "react";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);

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
    setMode(newMode);
    const temp = input;
    setInput(output);
    setOutput(temp);
    setError(null);
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    alert("Sonuç panoya kopyalandı!");
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-2xl mx-auto shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold">Pro URL Encoder / Decoder</h2>
        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => toggleMode("encode")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              mode === "encode" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => toggleMode("decode")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              mode === "decode" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">
            {mode === "encode" ? "Normal Metin / URL" : "Encoded URL"}
          </label>
          <textarea
            rows={5}
            value={input}
            onChange={(e) => handleProcess(e.target.value, mode)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-indigo-500 shadow-inner"
            placeholder={mode === "encode" ? "Dönüştürülecek metni yazın..." : "Çözülecek URL kodunu yapıştırın..."}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm text-zinc-400">
              {mode === "encode" ? "URL Encoded Çıktısı" : "Çözülmüş Metin"}
            </label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Sonucu Kopyala
              </button>
            )}
          </div>
          <textarea
            rows={5}
            readOnly
            value={output}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-mono text-emerald-300 shadow-inner select-all"
            placeholder="Sonuç burada görünecek..."
          />
        </div>

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-lg text-red-300 text-xs font-mono">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}