"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle, Minimize2, Maximize2, Code2 } from "lucide-react";

export default function JsonFormatter() {
  const [rawJson, setRawJson] = useState<string>('{"name": "PrivaTools", "version": "1.0.0", "openSource": true, "modules": ["jwt", "hash", "base64"]}');
  const [formattedJson, setFormattedJson] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonCopied, setJsonCopied] = useState<boolean>(false);
  const [indentSize, setIndentSize] = useState<number>(2);

  const handleFormatJson = (input: string, spaces: number = indentSize) => {
    setRawJson(input);
    if (!input.trim()) {
      setFormattedJson("");
      setJsonError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setFormattedJson(JSON.stringify(parsed, null, spaces));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Geçersiz JSON sözdizimi");
      setFormattedJson("");
    }
  };

  const handleMinimize = () => {
    if (!rawJson.trim()) return;
    try {
      const parsed = JSON.parse(rawJson);
      const minified = JSON.stringify(parsed);
      setFormattedJson(minified);
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Geçersiz JSON");
    }
  };

  const handleIndentChange = (spaces: number) => {
    setIndentSize(spaces);
    handleFormatJson(rawJson, spaces);
  };

  const copyToClipboard = () => {
    if (!formattedJson) return;
    navigator.clipboard.writeText(formattedJson);
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">JSON Formatter & Validator</h1>
          <p className="text-sm text-slate-400 mt-1">
            JSON verilerinizi biçimlendirin, doğrulayın ve optimize edin.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => handleIndentChange(2)}
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${indentSize === 2 && !jsonError ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
            >
              2 Boşluk
            </button>
            <button
              onClick={() => handleIndentChange(4)}
              className={`px-2.5 py-1.5 rounded-md font-medium transition ${indentSize === 4 && !jsonError ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
            >
              4 Boşluk
            </button>
          </div>

          <button
            onClick={handleMinimize}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-lg transition flex items-center gap-1.5 border border-slate-700"
            title="Tek Satıra Sıkıştır (Minify)"
          >
            <Minimize2 className="w-3.5 h-3.5" /> Sıkıştır
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Ham JSON Verisi</label>
          <textarea
            rows={12}
            value={rawJson}
            onChange={(e) => handleFormatJson(e.target.value)}
            placeholder="JSON verinizi buraya yapıştırın..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 transition resize-none"
          />
        </div>

        <div className="space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-slate-400">Formatlanmış Sonuç</label>
              {formattedJson && (
                <button
                  onClick={copyToClipboard}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                >
                  {jsonCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {jsonCopied ? "Kopyalandı" : "Kopyala"}
                </button>
              )}
            </div>

            {jsonError ? (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 flex items-start gap-3 text-rose-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Sözdizimi Hatası</p>
                  <p className="mt-1 opacity-90 font-mono">{jsonError}</p>
                </div>
              </div>
            ) : (
              <textarea
                rows={12}
                readOnly
                value={formattedJson || (rawJson ? "" : "Düzenlenmiş çıktı burada görünecek...")}
                className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}