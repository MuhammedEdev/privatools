"use client";

import { useState } from "react";
import { Copy, Check, Palette, Sliders } from "lucide-react";

export default function CssGradientGenerator() {
  const [color1, setColor1] = useState("#10B981");
  const [color2, setColor2] = useState("#0F172A");
  const [direction, setDirection] = useState("to right");
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [copied, setCopied] = useState(false);

  const gradientCss = gradientType === "linear"
    ? `linear-gradient(${direction}, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssCode = `background-color: ${color1};
background-image: ${gradientCss};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetGradients = [
    { c1: "#10B981", c2: "#0F172A", dir: "to right" },
    { c1: "#3B82F6", c2: "#1E1B4B", dir: "to bottom right" },
    { c1: "#EC4899", c2: "#311026", dir: "to right" },
    { c1: "#F59E0B", c2: "#451A03", dir: "to top" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro CSS Gradient Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Modern CSS renk geçişleri tasarlayın ve üretim hazır kodunu anında kopyalayın.
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
        <div className="lg:col-span-2 bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col justify-between min-h-[300px]">
          <div
            className="w-full h-full min-h-[200px] rounded-xl shadow-inner border border-slate-800 transition-all duration-300"
            style={{ background: gradientCss }}
          />

          <div className="mt-4 bg-[#0D121F] border border-slate-800/80 rounded-lg p-3 font-mono text-xs text-emerald-400 whitespace-pre">
            {cssCode}
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Gradient Tipi</label>
            <div className="flex bg-[#0D121F] border border-slate-800 rounded-lg p-1">
              <button
                onClick={() => setGradientType("linear")}
                className={`flex-1 py-1.5 rounded-md font-medium transition ${gradientType === "linear" ? "bg-slate-800 text-white" : "text-slate-400"}`}
              >
                Linear
              </button>
              <button
                onClick={() => setGradientType("radial")}
                className={`flex-1 py-1.5 rounded-md font-medium transition ${gradientType === "radial" ? "bg-slate-800 text-white" : "text-slate-400"}`}
              >
                Radial
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">1. Renk</label>
              <div className="flex items-center gap-2 bg-[#0D121F] border border-slate-800 rounded-lg p-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                />
                <span className="font-mono text-slate-200 uppercase">{color1}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-medium">2. Renk</label>
              <div className="flex items-center gap-2 bg-[#0D121F] border border-slate-800 rounded-lg p-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                />
                <span className="font-mono text-slate-200 uppercase">{color2}</span>
              </div>
            </div>
          </div>

          {gradientType === "linear" && (
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Geçiş Yönü</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none"
              >
                <option value="to right">Sağa Doğru (to right)</option>
                <option value="to left">Sola Doğru (to left)</option>
                <option value="to bottom">Aşağı Doğru (to bottom)</option>
                <option value="to top">Yukarı Doğru (to top)</option>
                <option value="to bottom right">Sağ Aşağı (to bottom right)</option>
                <option value="to top left">Sol Yukarı (to top left)</option>
              </select>
            </div>
          )}

          <div className="space-y-2 pt-2">
            <span className="text-slate-400 font-medium block">Hazır Kombinasyonlar</span>
            <div className="grid grid-cols-4 gap-2">
              {presetGradients.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => { setColor1(p.c1); setColor2(p.c2); setDirection(p.dir); }}
                  className="h-8 rounded-lg border border-slate-700 transition hover:scale-105 shadow-sm"
                  style={{ background: `linear-gradient(${p.dir}, ${p.c1}, ${p.c2})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}