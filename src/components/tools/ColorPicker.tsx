"use client";

import React, { useState } from "react";

export default function ColorPicker() {
  const [hex, setHex] = useState("#10B981");

  // HEX'i RGB'ye çevirme
  const hexToRgb = (hexStr: string) => {
    let cleanHex = hexStr.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map((c) => c + c).join("");
    }
    if (cleanHex.length !== 6) return { r: 0, g: 0, b: 0 };
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  // HEX'i HSL'e çevirme
  const hexToHsl = (hexStr: string) => {
    const { r, g, b } = hexToRgb(hexStr);
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / d + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(hex);
  const hsl = hexToHsl(hex);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Kopyalandı: ${text}`);
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-xl mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">Pro Color Converter & Picker</h2>

      <div className="space-y-6">
        {/* Renk Önizleme ve Picker */}
        <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
          <div
            className="w-16 h-16 rounded-xl border border-zinc-700 shadow-inner"
            style={{ backgroundColor: hex }}
          />
          <div className="flex-1">
            <label className="block text-xs text-zinc-400 mb-1">Renk Seç / HEX Kodu Gir</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={hex.length === 7 ? hex : "#10B981"}
                onChange={(e) => setHex(e.target.value)}
                className="w-12 h-10 bg-transparent cursor-pointer rounded-lg border border-zinc-700"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
                placeholder="#10B981"
              />
            </div>
          </div>
        </div>

        {/* Format Çıktıları */}
        <div className="space-y-3">
          <div
            onClick={() => copyText(hex)}
            className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors group"
          >
            <div>
              <span className="text-xs text-zinc-500 block">HEX Formatı</span>
              <span className="font-mono text-sm text-indigo-300 font-semibold">{hex}</span>
            </div>
            <span className="text-xs text-zinc-500 group-hover:text-indigo-400">Kopyala</span>
          </div>

          <div
            onClick={() => copyText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
            className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors group"
          >
            <div>
              <span className="text-xs text-zinc-500 block">RGB Formatı</span>
              <span className="font-mono text-sm text-emerald-300 font-semibold">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </span>
            </div>
            <span className="text-xs text-zinc-500 group-hover:text-indigo-400">Kopyala</span>
          </div>

          <div
            onClick={() => copyText(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
            className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer hover:border-indigo-500 transition-colors group"
          >
            <div>
              <span className="text-xs text-zinc-500 block">HSL Formatı</span>
              <span className="font-mono text-sm text-amber-300 font-semibold">
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </span>
            </div>
            <span className="text-xs text-zinc-500 group-hover:text-indigo-400">Kopyala</span>
          </div>
        </div>
      </div>
    </div>
  );
}