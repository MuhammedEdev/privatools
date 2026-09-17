"use client";

import { useState } from "react";
import { Copy, Check, Sliders, Type } from "lucide-react";

export default function CssUnitConverter() {
  const [pixelValue, setPixelValue] = useState<number>(16);
  const [baseFontSize, setBaseFontSize] = useState<number>(16);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const remValue = (pixelValue / baseFontSize).toFixed(4);
  const emValue = (pixelValue / baseFontSize).toFixed(4);
  const percentValue = ((pixelValue / baseFontSize) * 100).toFixed(2);
  const vwValue = ((pixelValue / 1920) * 100).toFixed(2); // 1920px tasarım referansı

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro CSS Unit Converter</h1>
          <p className="text-sm text-slate-400 mt-1">
            Piksel değerlerini REM, EM, Yüzde (%) ve VW birimlerine kusursuzca dönüştürün.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 space-y-5 text-xs">
          <div className="space-y-2">
            <label className="text-slate-400 font-medium">Piksel Değeri (PX)</label>
            <input
              type="number"
              value={pixelValue}
              onChange={(e) => setPixelValue(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 font-mono text-white text-sm focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 font-medium">Kök Yazı Boyutu (Root Font Size - PX)</label>
            <input
              type="number"
              value={baseFontSize}
              onChange={(e) => setBaseFontSize(parseFloat(e.target.value) || 16)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 font-mono text-white text-sm focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="pt-2">
            <div className="p-3 bg-[#0D121F] border border-slate-800 rounded-lg text-slate-400 space-y-1">
              <span className="font-medium text-slate-300 block">İpucu:</span>
              <p>Standart tarayıcı kök yazı boyutu (html font-size) 16px değerindedir. 1rem = 16px temel alınarak hesaplanır.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 space-y-4">
          <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Dönüşüm Sonuçları</span>
          
          <div className="space-y-3">
            {[
              { label: "REM", val: `${remValue}rem` },
              { label: "EM", val: `${emValue}em` },
              { label: "Yüzde (%)", val: `${percentValue}%` },
              { label: "VW (1920px ekran)", val: `${vwValue}vw` },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0D121F] border border-slate-800/80 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">{item.label}</span>
                  <span className="text-sm font-mono text-emerald-400 font-semibold">{item.val}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(item.val, item.label)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded transition flex items-center gap-1.5"
                >
                  {copiedKey === item.label ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === item.label ? "Kopyalandı" : "Kopyala"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}