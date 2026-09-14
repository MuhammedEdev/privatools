"use client";

import React, { useState, useEffect } from "react";

export default function KeycodeInfo() {
  const [keyInfo, setKeyInfo] = useState({
    key: "Space",
    code: "Space",
    which: 32,
    keyCode: 32,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setKeyInfo({
        key: e.key === " " ? "Space" : e.key,
        code: e.code,
        which: e.which,
        keyCode: e.keyCode,
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-xl mx-auto shadow-xl text-center">
      <h2 className="text-xl font-bold mb-2">Keycode Info</h2>
      <p className="text-sm text-zinc-400 mb-6">Herhangi bir tuşa basın ve detaylarını görün</p>

      <div className="py-12 bg-zinc-950 border border-zinc-800 rounded-xl mb-6 shadow-inner">
        <span className="text-6xl font-extrabold text-indigo-400 font-mono">
          {keyInfo.keyCode}
        </span>
        <span className="block text-xs text-zinc-500 uppercase tracking-widest mt-2">event.keyCode</span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-left">
        <div className="p-3 bg-zinc-800/60 border border-zinc-700/50 rounded-lg">
          <span className="block text-xs text-zinc-400">event.key</span>
          <span className="text-lg font-mono font-bold text-white mt-1 block truncate">{keyInfo.key}</span>
        </div>
        <div className="p-3 bg-zinc-800/60 border border-zinc-700/50 rounded-lg">
          <span className="block text-xs text-zinc-400">event.code</span>
          <span className="text-lg font-mono font-bold text-white mt-1 block truncate">{keyInfo.code}</span>
        </div>
        <div className="p-3 bg-zinc-800/60 border border-zinc-700/50 rounded-lg">
          <span className="block text-xs text-zinc-400">event.which</span>
          <span className="text-lg font-mono font-bold text-white mt-1 block truncate">{keyInfo.which}</span>
        </div>
      </div>
    </div>
  );
}