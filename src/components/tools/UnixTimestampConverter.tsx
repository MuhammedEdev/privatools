"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function UnixTimestampConverter() {
  const [timestampInput, setTimestampInput] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [convertedDate, setConvertedDate] = useState<string>("");
  const [timestampCopied, setTimestampCopied] = useState<boolean>(false);

  const handleConvertTimestamp = (val: string) => {
    setTimestampInput(val);
    if (!val.trim()) { setConvertedDate(""); return; }
    const num = Number(val);
    if (isNaN(num)) { setConvertedDate("Geçersiz sayısal zaman damgası."); return; }
    const date = new Date(num > 9999999999 ? num : num * 1000);
    if (isNaN(date.getTime())) {
      setConvertedDate("Geçersiz tarih.");
    } else {
      setConvertedDate(date.toUTCString() + " (UTC) \n" + date.toLocaleString() + " (Yerel)");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Unix Timestamp Dönüştürücü</h1>
        <p className="text-sm text-slate-400 mt-1">Unix zaman damgasını insani tarih/saat formatına dönüştürün.</p>
      </div>

      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-slate-400">Unix Timestamp</label>
            <button
              onClick={() => handleConvertTimestamp(Math.floor(Date.now() / 1000).toString())}
              className="text-xs text-emerald-400 hover:underline"
            >
              Şu Anki Zamanı Getir
            </button>
          </div>
          <input
            type="text"
            value={timestampInput}
            onChange={(e) => handleConvertTimestamp(e.target.value)}
            className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-3 text-xs font-mono text-slate-200 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium text-slate-400">Çözümlenmiş Tarih & Saat</label>
            {convertedDate && (
              <button
                onClick={() => { navigator.clipboard.writeText(convertedDate); setTimestampCopied(true); setTimeout(() => setTimestampCopied(false), 2000); }}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                {timestampCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {timestampCopied ? "Kopyalandı" : "Kopyala"}
              </button>
            )}
          </div>
          <textarea
            rows={4}
            readOnly
            value={convertedDate}
            className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}