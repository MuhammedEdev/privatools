"use client";

import { useState } from "react";
import { Copy, Check, Palette, Sparkles } from "lucide-react";

export default function ColorPicker() {
  const [color, setColor] = useState<string>("#10b981");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Hex to RGB conversion
  const hexToRgb = (hex: string) => {
    let c = hex.replace("#", "");
    if (c.length === 3) {
      c = c.split("").map((x) => x + x).join("");
    }
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  // Hex to HSL conversion
  const hexToHsl = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
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
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  const copyValue = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const presetColors = ["#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#0f172a", "#ffffff", "#000000"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Color Picker & Converter</h1>
          <p className="text-sm text-slate-400 mt-1">
            Renkleri seçin, HEX, RGB ve HSL formatları arasında anında dönüştürün.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
          <div
            className="w-full h-40 rounded-xl shadow-inner border border-slate-800 transition-all duration-200"
            style={{ backgroundColor: color }}
          />
          <div className="w-full flex items-center justify-between bg-[#0D121F] border border-slate-800 rounded-lg p-3">
            <span className="text-xs text-slate-400 font-medium">Renk Seçici</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
            />
          </div>
        </div>

        <div className="md:col-span-2 bg-[#090D16] border border-slate-800 rounded-lg p-6 space-y-4">
          <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Format Dönüşümleri</span>

          <div className="space-y-3">
            {formats.map((item, idx) => (
              <div key={idx} className="bg-[#0D121F] border border-slate-800/80 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">{item.label}</span>
                  <span className="text-sm font-mono text-emerald-400 font-semibold">{item.value}</span>
                </div>
                <button
                  onClick={() => copyValue(item.value, item.label)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded transition flex items-center gap-1.5"
                >
                  {copiedKey === item.label ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === item.label ? "Kopyalandı" : "Kopyala"}
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-medium text-slate-400">Önerilen Palet</span>
            <div className="flex flex-wrap gap-2">
              {presetColors.map((hex, idx) => (
                <button
                  key={idx}
                  onClick={() => setColor(hex)}
                  className="w-8 h-8 rounded-lg border border-slate-700 transition hover:scale-110 shadow-sm"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}