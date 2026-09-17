"use client";

import { useState } from "react";
import { Copy, Check, Palette, AlertCircle } from "lucide-react";

export default function ColorPicker() {
  const [hex, setHex] = useState<string>("#10B981");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Güvenli HEX to RGB dönüştürücü
  const hexToRgb = (hexStr: string) => {
    let cleanHex = hexStr.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map((c) => c + c).join("");
    }
    if (cleanHex.length !== 6) return { r: 16, g: 185, b: 129 }; // Varsayılan emerald
    const num = parseInt(cleanHex, 16);
    if (isNaN(num)) return { r: 16, g: 185, b: 129 };
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  // Güvenli HEX to HSL dönüştürücü
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

  const rgb = hexToRgb(hex);
  const hsl = hexToHsl(hex);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const presetColors = ["#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#EF4444", "#0F172A", "#FFFFFF"];

  const isValidHex = /^#?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Color Converter & Picker</h1>
          <p className="text-sm text-slate-400 mt-1">
            Renkleri seçin, HEX, RGB ve HSL formatları arasında anında dönüşüm yapın.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sol Panel: Önizleme ve Seçici */}
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col items-center justify-between space-y-4">
          <div
            className="w-full h-36 rounded-xl border border-slate-800 shadow-inner transition-all duration-200"
            style={{ backgroundColor: isValidHex ? hex : "#10B981" }}
          />

          <div className="w-full space-y-2">
            <label className="text-xs text-slate-400 font-medium block">Renk Seç / HEX Gir</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={isValidHex ? (hex.startsWith("#") ? hex : `#${hex}`) : "#10B981"}
                onChange={(e) => setHex(e.target.value)}
                className="w-10 h-10 bg-[#0D121F] cursor-pointer rounded-lg border border-slate-800 p-1"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                placeholder="#10B981"
                className="flex-1 bg-[#0D121F] border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Sağ Panel: Format Çıktıları ve Hızlı Palet */}
        <div className="md:col-span-2 bg-[#090D16] border border-slate-800 rounded-lg p-6 space-y-4">
          <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Format Çıktıları</span>

          <div className="space-y-3">
            {[
              { label: "HEX", val: hex.toUpperCase(), colorClass: "text-indigo-300" },
              { label: "RGB", val: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, colorClass: "text-emerald-400" },
              { label: "HSL", val: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, colorClass: "text-amber-300" },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0D121F] border border-slate-800/80 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">{item.label} Formatı</span>
                  <span className={`font-mono text-sm font-semibold ${item.colorClass}`}>{item.val}</span>
                </div>
                <button
                  onClick={() => copyText(item.val, item.label)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded transition flex items-center gap-1.5"
                >
                  {copiedKey === item.label ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === item.label ? "Kopyalandı" : "Kopyala"}
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-medium text-slate-400">Hızlı Renk Paleti</span>
            <div className="flex flex-wrap gap-2">
              {presetColors.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setHex(preset)}
                  className="w-7 h-7 rounded-md border border-slate-700 transition hover:scale-110 shadow-sm"
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}