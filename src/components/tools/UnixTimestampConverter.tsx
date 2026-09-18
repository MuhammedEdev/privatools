"use client";

import { useState, ChangeEvent } from "react";
import { Copy, Check, Upload, Download, FileText, AlertCircle } from "lucide-react";

export default function Base64Converter() {
  const [input, setInput] = useState<string>("PrivaTools - Güvenli Geliştirici Araçları");
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Türkçe karakter destekli güvenli UTF-8 Base64 Encode / Decode
  const handleProcess = (text: string, currentMode: "encode" | "decode") => {
    setInput(text);
    setError(null);
    if (!text.trim()) {
      setOutput("");
      return;
    }

    try {
      if (currentMode === "encode") {
        const utf8Encoder = new TextEncoder();
        const utf8Bytes = utf8Encoder.encode(text);
        let binaryString = "";
        for (let i = 0; i < utf8Bytes.length; i++) {
          binaryString += String.fromCharCode(utf8Bytes[i]);
        }
        setOutput(btoa(binaryString));
      } else {
        const binaryString = atob(text);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const utf8Decoder = new TextDecoder();
        setOutput(utf8Decoder.decode(bytes));
      }
    } catch (err) {
      setError("Geçersiz format! (Malformed Base64 veya desteklenmeyen karakter)");
      setOutput("");
    }
  };

  // Dosyayı Base64'e çevirme
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setInput(result);
      setOutput(result);
      setMode("encode");
    };
    reader.readAsDataURL(file);
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
          <h1 className="text-xl font-semibold text-white">Pro Base64 Encoder / Decoder</h1>
          <p className="text-sm text-slate-400 mt-1">
            UTF-8 destekli metin kodlama, çözme ve dosya to Base64 dönüştürme stüdyosu.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-2 px-3 rounded-lg transition cursor-pointer flex items-center gap-1.5 border border-slate-700">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dosya Yükle</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>

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

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">
            {mode === "encode" ? "Dönüştürülecek Metin / Veri" : "Base64 Metni"}
          </label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => handleProcess(e.target.value, mode)}
            placeholder="Veriyi buraya girin..."
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
            placeholder="Sonuç burada görüntülenecek..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none shadow-inner select-all"
          />
        </div>
      </div>
    </div>
  );
}