"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function ColorPicker() {
  const [hexColor, setHexColor] = useState<string>("#10b981");
  const [colorCopied, setColorCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(x => x + x).join("");
    const num = parseInt(c, 16);
    return isNaN(num) || c.length !== 6
      ? { r: 0, g: 0, b: 0 }
      : { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setColorCopied(key);
    setTimeout(() => setColorCopied(null), 2000);
  };

  const currentColorRgb = hexToRgb(hexColor);
  const currentColorHsl = rgbToHsl(currentColorRgb.r, currentColorRgb.g, currentColorRgb.b);

  const rgbString = `rgb(${currentColorRgb.r}, ${currentColorRgb.g}, ${currentColorRgb.b})`;
  const hslString = `hsl(${currentColorHsl.h}, ${currentColorHsl.s}%, ${currentColorHsl.l}%)`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Color Code Converter & Picker</h1>
        <p className="text-sm text-slate-400 mt-1">
          Renk seçin, HEX, RGB ve HSL formatları arasında anında dönüşüm yapın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center min-h-[240px] gap-4">
          <div 
            className="w-32 h-32 rounded-2xl shadow-lg border-2 border-slate-700/50 transition-all duration-200"
            style={{ backgroundColor: hexColor }}
          />
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium">Renk Seçin:</label>
            <input
              type="color"
              value={hexColor}
              onChange={(e) => setHexColor(e.target.value)}
              className="w-8 h-8 rounded bg-transparent cursor-pointer border-0"
            />
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">HEX</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={hexColor.toUpperCase()}
                onChange={(e) => setHexColor(e.target.value)}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-md px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(hexColor.toUpperCase(), "hex")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md text-xs font-medium transition shrink-0"
              >
                {colorCopied === "hex" ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">RGB</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={rgbString}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-md px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(rgbString, "rgb")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md text-xs font-medium transition shrink-0"
              >
                {colorCopied === "rgb" ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">HSL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={hslString}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-md px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(hslString, "hsl")}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md text-xs font-medium transition shrink-0"
              >
                {colorCopied === "hsl" ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}