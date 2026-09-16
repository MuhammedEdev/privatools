"use client";

import { useState } from "react";
import { Copy, Check, Clock, Calendar } from "lucide-react";

export default function UnixTimestampConverter() {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const [timestampInput, setTimestampInput] = useState<string>(currentTimestamp.toString());
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().slice(0, 19));
  const [copied, setCopied] = useState<boolean>(false);

  // Timestamp -> Tarih
  let formattedDate = "";
  let timestampError = false;
  try {
    const ts = parseInt(timestampInput);
    if (!isNaN(ts)) {
      const dateObj = new Date(ts * 1000);
      formattedDate = dateObj.toUTCString();
    } else {
      timestampError = true;
    }
  } catch {
    timestampError = true;
  }

  // Tarih -> Timestamp
  let calculatedTimestamp = "";
  try {
    const dt = new Date(dateInput);
    if (!isNaN(dt.getTime())) {
      calculatedTimestamp = Math.floor(dt.getTime() / 1000).toString();
    }
  } catch {
    calculatedTimestamp = "Geçersiz tarih";
  }

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Unix Timestamp Converter</h1>
        <p className="text-sm text-slate-400 mt-1">
          Unix zaman damgalarını (timestamp) UTC tarihlerine dönüştürün veya tersini hesaplayın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="space-y-2">
            <label className="text-slate-400 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> Unix Timestamp (Saniye)
            </label>
            <input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-3 font-mono text-white text-sm focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 font-medium block">UTC Tarih Karşılığı</span>
            <div className="bg-[#0D121F] border border-slate-800 rounded-md p-3 font-mono text-emerald-400 flex items-center justify-between">
              <span className="truncate">{formattedDate || "Geçersiz timestamp"}</span>
              <button
                onClick={() => copyToClipboard(formattedDate)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded transition shrink-0 ml-2 flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Kopyala
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="space-y-2">
            <label className="text-slate-400 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Tarih / Saat (ISO Format)
            </label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 font-mono text-white text-xs focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 font-medium block">Hesaplanan Unix Timestamp</span>
            <div className="bg-[#0D121F] border border-slate-800 rounded-md p-3 font-mono text-emerald-400 flex items-center justify-between">
              <span className="truncate">{calculatedTimestamp}</span>
              <button
                onClick={() => copyToClipboard(calculatedTimestamp)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded transition shrink-0 ml-2 flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Kopyala
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}