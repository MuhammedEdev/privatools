"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Keyboard } from "lucide-react";

export default function KeycodeInfo() {
  const [activeKey, setActiveKey] = useState<{
    key: string;
    code: string;
    keyCode: number;
    which: number;
    location: number;
  } | null>({
    key: "Space",
    code: "Space",
    keyCode: 32,
    which: 32,
    location: 0,
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setActiveKey({
        key: e.key === " " ? "Space" : e.key,
        code: e.code,
        keyCode: e.keyCode,
        which: e.which,
        location: e.location,
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyValue = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">JavaScript Keycode Info</h1>
        <p className="text-sm text-slate-400 mt-1">
          Klavyenizden herhangi bir tuşa basın ve JavaScript event özelliklerini anında öğrenin.
        </p>
      </div>

      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-[180px] text-center space-y-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Basılan Tuş Değeri</span>
        <div className="text-5xl font-mono font-bold text-emerald-400">
          {activeKey ? (activeKey.keyCode === 32 ? "SPACE" : activeKey.key) : "Bir tuşa basın"}
        </div>
        <span className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1 rounded border border-slate-800">
          event.code: {activeKey?.code}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "event.key", value: activeKey?.key },
          { label: "event.keyCode", value: activeKey?.keyCode?.toString() },
          { label: "event.code", value: activeKey?.code },
          { label: "event.which", value: activeKey?.which?.toString() },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#090D16] border border-slate-800 rounded-lg p-4 flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block tracking-wider">{item.label}</span>
              <span className="text-lg font-mono font-semibold text-white mt-1 block truncate">{item.value || "-"}</span>
            </div>
            <button
              onClick={() => item.value && copyValue(item.value, item.label)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-1.5 px-3 rounded transition flex items-center justify-center gap-1 w-full"
            >
              {copiedKey === item.label ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copiedKey === item.label ? "Kopyalandı" : "Kopyala"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}