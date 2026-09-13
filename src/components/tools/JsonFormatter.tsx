"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";

export default function JsonFormatter() {
  const [rawJson, setRawJson] = useState<string>('{"name":"PrivaTools","type":"Open Source"}');
  const [formattedJson, setFormattedJson] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonCopied, setJsonCopied] = useState<boolean>(false);

  const handleFormatJson = (input: string) => {
    setRawJson(input);
    if (!input.trim()) {
      setFormattedJson("");
      setJsonError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Geçersiz JSON formatı");
      setFormattedJson("");
    }
  };

  const copyToClipboard = () => {
    if (!formattedJson) return;
    navigator.clipboard.writeText(formattedJson);
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">JSON Formatter & Validator</h1>
        <p className="text-sm text-slate-400 mt-1">
          JSON verilerinizi biçimlendirin, sözdizimi hatalarını anında tespit edin.
        </p>
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
                  <p className="mt-1 opacity-90">{jsonError}</p>
                </div>
              </div>
            ) : (
              <textarea
                rows={12}
                readOnly
                value={formattedJson}
                placeholder="Düzenlenmiş çıktı burada görünecek..."
                className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}