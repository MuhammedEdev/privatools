"use client";

import { useState } from "react";
import { Copy, Check, Sliders, Layers } from "lucide-react";

export default function BoxShadowGenerator() {
  const [xOffset, setXOffset] = useState<number>(0);
  const [yOffset, setYOffset] = useState<number>(10);
  const [blur, setBlur] = useState<number>(25);
  const [spread, setSpread] = useState<number>(-5);
  const [color, setColor] = useState<string>("#000000");
  const [opacity, setOpacity] = useState<number>(30);
  const [inset, setInset] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Hex to RGBA conversion for shadow color
  const hexToRgba = (hex: string, alpha: number) => {
    let c = hex.replace("#", "");
    if (c.length === 3) {
      c = c.split("").map((x) => x + x).join("");
    }
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
  };

  const shadowValue = `${inset ? "inset " : ""}${xOffset}px ${yOffset}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const cssCode = `box-shadow: ${shadowValue};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Box Shadow Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Gelişmiş CSS kutu gölgesi (box-shadow) tasarımı yapın ve anında kopyalayın.
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-lg transition flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Kopyalandı" : "CSS Kopyala"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#090D16] border border-slate-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-[320px] relative">
          <div
            className="w-48 h-48 bg-[#0D121F] border border-slate-800 rounded-2xl transition-all duration-150 flex items-center justify-center"
            style={{ boxShadow: shadowValue }}
          >
            <span className="text-xs font-mono text-slate-400">Önizleme Kutusu</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-[#0D121F] border border-slate-800 rounded-md p-3 font-mono text-xs text-emerald-400 text-center">
            {cssCode}
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between text-slate-400 font-medium">
              <span>X Eksen Konumu</span>
              <span className="font-mono text-white">{xOffset}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={xOffset}
              onChange={(e) => setXOffset(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Y Eksen Konumu</span>
              <span className="font-mono text-white">{yOffset}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={yOffset}
              onChange={(e) => setYOffset(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Bulanıklık (Blur)</span>
              <span className="font-mono text-white">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Yayılma (Spread)</span>
              <span className="font-mono text-white">{spread}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={spread}
              onChange={(e) => setSpread(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Gölge Opaklığı</span>
              <span className="font-mono text-white">{opacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Gölge Rengi</label>
              <div className="flex items-center gap-2 bg-[#0D121F] border border-slate-800 rounded-md p-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                />
                <span className="font-mono text-slate-200 uppercase text-[11px]">{color}</span>
              </div>
            </div>

            <div className="space-y-1 flex flex-col justify-end">
              <label className="flex items-center gap-2 bg-[#0D121F] border border-slate-800 rounded-md p-2.5 cursor-pointer hover:border-slate-700 transition">
                <input
                  type="checkbox"
                  checked={inset}
                  onChange={(e) => setInset(e.target.checked)}
                  className="accent-emerald-500 rounded"
                />
                <span className="text-slate-300 font-medium">İç Gölge (Inset)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}