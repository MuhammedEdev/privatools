"use client";

import { useState, useEffect } from "react";
import { Clock, Copy, Check, RefreshCcw } from "lucide-react";

export default function UnixTimestampConverter() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputTimestamp, setInputTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [copied, setCopied] = useState<boolean>(false);

  // Canlı saat sayacı
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const parseDate = (tsStr: string) => {
    const num = parseInt(tsStr);
    if (isNaN(num)) return { utc: "Geçersiz Timestamp", local: "Geçersiz Timestamp" };
    // Milisaniye mi saniye mi kontrolü (10 haneden büyükse milisaniyedir)
    const date = new Date(num > 1e11 ? num : num * 1000);
    if (isNaN(date.getTime())) return { utc: "Geçersiz Tarih", local: "Geçersiz Tarih" };

    return {
      utc: date.toUTCString(),
      local: date.toLocaleString("tr-TR"),
    };
  };

  const result = parseDate(inputTimestamp);

  const setToNow = () => {
    const now = Math.floor(Date.now() / 1000).toString();
    setInputTimestamp(now);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Unix Timestamp Converter</h1>
          <p className="text-sm text-slate-400 mt-1">
            Unix zaman damgalarını insan tarafından okunabilir tarihlere dönüştürün ve anlık zamanı takip edin.
          </p>
        </div>
        <div className="bg-[#090D16] border border-slate-800 rounded-lg px-4 py-2.5 flex items-center gap-3">
          <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Canlı Zaman Damgası</span>
            <span className="font-mono text-sm text-emerald-400 font-bold">{currentTimestamp}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <label className="text-slate-400 font-medium">Unix Timestamp Girin</label>
            <button
              onClick={setToNow}
              className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              <RefreshCcw className="w-3 h-3" /> Şu Anki Zaman
            </button>
          </div>
          <input
            type="text"
            value={inputTimestamp}
            onChange={(e) => setInputTimestamp(e.target.value)}
            placeholder="Örn: 1774000000"
            className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-3 text-white font-mono focus:outline-none focus:border-slate-700 shadow-inner"
          />
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-slate-500 font-medium">UTC Tarih Formatı</span>
              <div className="bg-[#0D121F] border border-slate-800 rounded-md p-2.5 font-mono text-slate-200 select-all">
                {result.utc}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-medium">Yerel Tarih (TR)</span>
              <div className="bg-[#0D121F] border border-slate-800 rounded-md p-2.5 font-mono text-emerald-400 font-semibold select-all">
                {result.local}
              </div>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(result.local)}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 rounded-lg transition border border-slate-700 flex items-center justify-center gap-1.5 mt-4"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Tarih Kopyalandı" : "Yerel Tarihi Kopyala"}
          </button>
        </div>
      </div>
    </div>
  );
}