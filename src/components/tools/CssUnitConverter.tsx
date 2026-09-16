"use client";

import { useState } from "react";
import { Copy, Check, Sliders } from "lucide-react";

export default function CssUnitConverter() {
  const [pixelValue, setPixelValue] = useState<number>(16);
  const [baseFontSize, setBaseFontSize] = useState<number>(16);
  const [copied, setCopied] = useState<boolean>(false);

  const remValue = (pixelValue / baseFontSize).toFixed(4);
  const emValue = (pixelValue / baseFontSize).toFixed(4);
  const percentValue = ((pixelValue / baseFontSize) * 100).toFixed(2);
  const vwValue = ((pixelValue / 1920) * 100).toFixed(2); // 1920 ekran tabanlı yaklaşım

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">CSS Unit Converter (PX, REM, EM)</h1>
        <p className="text-sm text-slate-400 mt-1">
          Piksel değerlerini REM, EM, Yüzde (%) ve VW birimlerine anında dönüştürün.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="space-y-2">
            <label className="text-slate-400 font-medium">Piksel Değeri (PX)</label>
            <input
              type="number"
              value={pixelValue}
              onChange={(e) => setPixelValue(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-3 font-mono text-white text-sm focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 font-medium">Kök Yazı Boyutu (Root Font Size - PX)</label>
            <input
              type="number"
              value={baseFontSize}
              onChange={(e) => setBaseFontSize(parseFloat(e.target.value) || 16)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-3 font-mono text-white text-sm focus:outline-none focus:border-slate-700"
            />
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-3">
          <span className="text-xs font-semibold text-slate-400">Dönüşüm Sonuçları</span>
          
          {[
            { label: "REM", val: `${remValue}rem` },
            { label: "EM", val: `${emValue}em` },
            { label: "Yüzde (%)", val: `${percentValue}%` },
            { label: "VW (1920px referans)", val: `${vwValue}vw` },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0D121F] border border-slate-800/80 rounded-md p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{item.label}</span>
                <span className="text-sm font-mono text-emerald-400 font-semibold">{item.val}</span>
              </div>
              <button
                onClick={() => copyToClipboard(item.val)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded transition flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Kopyala
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}