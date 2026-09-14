"use client";

import React, { useState } from "react";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([
    "3b49704e-289c-4bf5-8854-fc948f2b2b1a",
    "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "f47ac10b-58cc-4372-a567-0e02b2c3d479"
  ]);
  const [count, setCount] = useState(5);

  const generateUuids = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      // Kriptografik güvenli UUID v4 üretimi
      const uuid = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (
          Number(c) ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
        ).toString(16)
      );
      newUuids.push(uuid);
    }
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    alert("Tüm UUID'ler panoya kopyalandı!");
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-xl mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">Pro UUID Generator</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <div className="flex-1">
            <label className="block text-xs text-zinc-400 mb-1">Üretilecek Adet ({count})</label>
            <input
              type="range"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
          <button
            onClick={generateUuids}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-sm h-10 mt-3"
          >
            Üret
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm text-zinc-400">UUID Listesi (v4)</label>
            <button
              onClick={copyAll}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Hepsini Kopyala
            </button>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs max-h-52 overflow-auto space-y-2">
            {uuids.map((id, index) => (
              <div
                key={index}
                onClick={() => {
                  navigator.clipboard.writeText(id);
                  alert(`Kopyalandı: ${id}`);
                }}
                className="flex items-center justify-between p-2 bg-zinc-900 hover:bg-zinc-800/80 rounded-lg border border-zinc-800/60 cursor-pointer transition-colors group"
              >
                <span className="text-emerald-300">{id}</span>
                <span className="text-[10px] text-zinc-500 group-hover:text-indigo-400">Kopyala</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}