"use client";

import React, { useState } from "react";

export default function CssUnitConverter() {
  const [pixels, setPixels] = useState<number | "">(16);
  const [baseSize, setBaseSize] = useState<number>(16);

  const pxToRem = (px: number, base: number) => {
    if (!px || !base) return 0;
    return (px / base).toFixed(4);
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-md mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">CSS Unit Converter (PX to REM)</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Pixel (PX)</label>
          <input
            type="number"
            value={pixels}
            onChange={(e) => setPixels(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
            placeholder="Örn: 16"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Base Size (Default: 16px)</label>
          <input
            type="number"
            value={baseSize}
            onChange={(e) => setBaseSize(Number(e.target.value) || 16)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 text-center">
          <span className="text-zinc-400 text-sm">Sonuç (REM):</span>
          <div className="text-3xl font-extrabold text-indigo-400 mt-1">
            {pixels === "" ? "0" : pxToRem(pixels, baseSize)} rem
          </div>
        </div>
      </div>
    </div>
  );
}