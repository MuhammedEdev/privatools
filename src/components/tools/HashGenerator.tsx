"use client";

import { useState, ChangeEvent } from "react";
import { Check, Copy, FileUp, Type, ShieldCheck, RefreshCw } from "lucide-react";

export default function HashGenerator() {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [hashInput, setHashInput] = useState<string>("PrivaTools Pro Hash Stüdyosu");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const [sha1Output, setSha1Output] = useState<string>("");
  const [sha256Output, setSha256Output] = useState<string>("");
  const [sha384Output, setSha384Output] = useState<string>("");
  const [sha512Output, setSha512Output] = useState<string>("");
  
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [hashCopiedKey, setHashCopiedKey] = useState<string | null>(null);

  const formatHash = (hex: string) => (isUppercase ? hex.toUpperCase() : hex.toLowerCase());

  const computeHashesFromBuffer = async (buffer: ArrayBuffer) => {
    setLoading(true);
    try {
      const [buf1, buf256, buf384, buf512] = await Promise.all([
        crypto.subtle.digest("SHA-1", buffer),
        crypto.subtle.digest("SHA-256", buffer),
        crypto.subtle.digest("SHA-384", buffer),
        crypto.subtle.digest("SHA-512", buffer),
      ]);

      setSha1Output(Array.from(new Uint8Array(buf1)).map(b => b.toString(16).padStart(2, '0')).join(''));
      setSha256Output(Array.from(new Uint8Array(buf256)).map(b => b.toString(16).padStart(2, '0')).join(''));
      setSha384Output(Array.from(new Uint8Array(buf384)).map(b => b.toString(16).padStart(2, '0')).join(''));
      setSha512Output(Array.from(new Uint8Array(buf512)).map(b => b.toString(16).padStart(2, '0')).join(''));
    } catch (err) {
      console.error("Hash hesaplama hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = async (text: string) => {
    setHashInput(text);
    if (!text) {
      setSha1Output(""); setSha256Output(""); setSha384Output(""); setSha512Output("");
      return;
    }
    const encoder = new TextEncoder();
    await computeHashesFromBuffer(encoder.encode(text).buffer);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
    const buffer = await file.arrayBuffer();
    await computeHashesFromBuffer(buffer);
  };

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(formatHash(text));
    setHashCopiedKey(key);
    setTimeout(() => setHashCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Crypto Hash Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Web Crypto API ile metin ve dosyalarınız için kurumsal düzeyde güvenli özet (hash) üretin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => { setMode("text"); handleTextChange(hashInput); }}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${mode === "text" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
            >
              <Type className="w-3.5 h-3.5" /> Metin
            </button>
            <button
              onClick={() => setMode("file")}
              className={`px-3 py-1.5 rounded-md font-medium transition flex items-center gap-1.5 ${mode === "file" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
            >
              <FileUp className="w-3.5 h-3.5" /> Dosya
            </button>
          </div>

          <button
            onClick={() => setIsUppercase(!isUppercase)}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-medium border transition ${isUppercase ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-[#090D16] border-slate-800 text-slate-400 hover:text-white"}`}
            title="Büyük/Küçük Harf Dönüştür"
          >
            {isUppercase ? "A-Z" : "a-z"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {mode === "text" ? (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">Girdi Metni</label>
            <textarea
              rows={4}
              value={hashInput}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Hash çıkarılacak metni girin..."
              className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none shadow-inner"
            />
          </div>
        ) : (
          <div className="border border-slate-800 hover:border-slate-700 bg-[#090D16] rounded-lg p-6 flex flex-col items-center justify-center min-h-[140px] relative transition cursor-pointer group">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <FileUp className="w-8 h-8 text-slate-500 mb-2 group-hover:text-emerald-400 transition" />
            <p className="text-sm font-medium text-slate-300">
              {fileName ? `${fileName} (${fileSize})` : "Dosya seçmek için tıklayın veya sürükleyin"}
            </p>
            <p className="text-xs text-slate-500 mt-1">İstemci tarafında tamamen güvenli ve hızlı işlenir</p>
          </div>
        )}

        <div className="space-y-3 pt-2">
          {[
            { label: "SHA-1", value: sha1Output, key: "sha1" },
            { label: "SHA-256", value: sha256Output, key: "sha256" },
            { label: "SHA-384", value: sha384Output, key: "sha384" },
            { label: "SHA-512", value: sha512Output, key: "sha512" },
          ].map((item) => (
            <div key={item.key} className="bg-[#090D16] border border-slate-800 rounded-lg p-3.5 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</span>
                <button
                  onClick={() => copyToClipboard(item.value, item.key)}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium disabled:opacity-50"
                  disabled={!item.value || loading}
                >
                  {hashCopiedKey === item.key ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {hashCopiedKey === item.key ? "Kopyalandı" : "Kopyala"}
                </button>
              </div>
              <div className="bg-[#0D121F] border border-slate-800/80 rounded-md p-2.5 font-mono text-xs text-emerald-400 break-all select-all">
                {loading ? (
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Hesap otros...
                  </span>
                ) : (
                  item.value ? formatHash(item.value) : <span className="text-slate-500">Değer bekleniyor...</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}