"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [uuidQuantity, setUuidQuantity] = useState<number>(5);
  const [uuidCopied, setUuidCopied] = useState<boolean>(false);

  const generateUuids = (count: number) => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        list.push(crypto.randomUUID());
      } else {
        list.push(
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
              v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          })
        );
      }
    }
    setUuids(list);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setUuidCopied(true);
    setTimeout(() => setUuidCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">UUID / GUID Generator</h1>
        <p className="text-sm text-slate-400 mt-1">
          Kriptografik olarak çakışmasız, rastgele UUID v4 tanımlayıcıları üretin.
        </p>
      </div>

      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-slate-400">Adet:</label>
            <select
              value={uuidQuantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setUuidQuantity(val);
                generateUuids(val);
              }}
              className="bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value={1}>1 Adet</option>
              <option value={5}>5 Adet</option>
              <option value={10}>10 Adet</option>
              <option value={20}>20 Adet</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => generateUuids(uuidQuantity)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-xs font-medium transition"
            >
              Yeniden Üret
            </button>
            {uuids.length > 0 && (
              <button
                onClick={() => copyToClipboard(uuids.join("\n"))}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-1.5 px-3 rounded transition flex items-center gap-1.5"
              >
                {uuidCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {uuidCopied ? "Kopyalandı" : "Tümünü Kopyala"}
              </button>
            )}
          </div>
        </div>

        <textarea
          rows={8}
          readOnly
          value={uuids.join("\n")}
          placeholder="Oluşturulan UUID'ler..."
          className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none leading-relaxed"
        />
      </div>
    </div>
  );
}