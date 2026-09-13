"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function BoxShadowGenerator() {
  const [shadowX, setShadowX] = useState<number>(10);
  const [shadowY, setShadowY] = useState<number>(10);
  const [blur, setBlur] = useState<number>(20);
  const [spread, setSpread] = useState<number>(0);
  const [shadowColor, setShadowColor] = useState<string>("#000000");
  const [copied, setCopied] = useState<boolean>(false);

  const cssShadowCode = `box-shadow: ${shadowX}px ${shadowY}px ${blur}px ${spread}px ${shadowColor};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssShadowCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">CSS Box Shadow Üreteci</h1>
        <p className="text-sm text-slate-400 mt-1">
          Gelişmiş CSS gölge efektleri oluşturun ve hazır kodları projenize kopyalayın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-8 flex items-center justify-center min-h-[260px]">
          <div
            className="w-32 h-32 bg-slate-800 rounded-xl transition-all duration-150"
            style={{
              boxShadow: `${shadowX}px ${shadowY}px ${blur}px ${spread}px ${shadowColor}`,
            }}
          />
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>X Offset</span>
                <span className="text-white font-mono">{shadowX}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={shadowX}
                onChange={(e) => setShadowX(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Y Offset</span>
                <span className="text-white font-mono">{shadowY}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={shadowY}
                onChange={(e) => setShadowY(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Bulanıklık (Blur)</span>
                <span className="text-white font-mono">{blur}px</span>
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
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Renk:</span>
              <input
                type="color"
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                className="w-6 h-6 rounded bg-transparent cursor-pointer border-0"
              />
            </div>
            <button
              onClick={copyToClipboard}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Kopyalandı" : "Kodu Kopyala"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}