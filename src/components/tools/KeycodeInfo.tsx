"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Keyboard, Terminal } from "lucide-react";

export default function KeycodeInfo() {
  const [eventInfo, setEventInfo] = useState<{
    key: string;
    code: string;
    which: number;
    location: number;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    metaKey: boolean;
  } | null>({
    key: "Enter",
    code: "Enter",
    which: 13,
    location: 0,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setEventInfo({
        key: e.key === " " ? "Space" : e.key,
        code: e.code,
        which: e.which || e.keyCode,
        location: e.location,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Keycode Info</h1>
          <p className="text-sm text-slate-400 mt-1">
            Klavyeden herhangi bir tuşa basın ve event parametrelerini anında inceleyin.
          </p>
        </div>
      </div>

      {eventInfo ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "event.key", val: eventInfo.key },
            { label: "event.code", val: eventInfo.code },
            { label: "event.which", val: eventInfo.which.toString() },
            { label: "event.location", val: eventInfo.location.toString() },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => copyValue(item.val, item.label)}
              className="bg-[#090D16] border border-slate-800 hover:border-slate-700 rounded-lg p-4 space-y-2 cursor-pointer transition group"
            >
              <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                <span>{item.label}</span>
                {copiedKey === item.label ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                )}
              </div>
              <div className="text-xl font-mono font-bold text-emerald-400 truncate">
                {item.val}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-[220px] text-center space-y-3">
        <Keyboard className="w-10 h-10 text-emerald-400 animate-pulse" />
        <div>
          <p className="text-sm font-medium text-white">Herhangi bir tuşa basın...</p>
          <p className="text-xs text-slate-500 mt-1">JavaScript keydown olayları dinamik olarak yakalanır</p>
        </div>
      </div>
    </div>
  );
}