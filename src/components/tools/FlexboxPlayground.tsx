"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function FlexboxPlayground() {
  const [flexDirection, setFlexDirection] = useState<"row" | "row-reverse" | "column" | "column-reverse">("row");
  const [justifyContent, setJustifyContent] = useState<"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly">("center");
  const [alignItems, setAlignItems] = useState<"flex-start" | "flex-end" | "center" | "stretch" | "baseline">("center");
  const [flexGap, setFlexGap] = useState<number>(16);
  const [flexItemCount, setFlexItemCount] = useState<number>(4);
  const [flexCopied, setFlexCopied] = useState<boolean>(false);

  const flexCode = `.container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  gap: ${flexGap}px;\n}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(flexCode);
    setFlexCopied(true);
    setTimeout(() => setFlexCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Flexbox Visual Playground</h1>
        <p className="text-sm text-slate-400 mt-1">
          Flexbox düzeninizi görsel olarak hizalayın ve CSS kodlarını kopyalayın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 min-h-[300px] flex flex-col justify-between">
          <div
            className="w-full h-full min-h-[220px] bg-[#0D121F] border border-slate-800/80 rounded-lg p-3 transition-all duration-200"
            style={{
              display: "flex",
              flexDirection,
              justifyContent,
              alignItems,
              gap: `${flexGap}px`,
            }}
          >
            {Array.from({ length: flexItemCount }).map((_, idx) => (
              <div
                key={idx}
                className="w-12 h-12 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0"
              >
                {idx + 1}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-mono">live preview</span>
            <button
              onClick={copyToClipboard}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-1.5 px-3 rounded transition flex items-center gap-1.5"
            >
              {flexCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {flexCopied ? "Kopyalandı" : "CSS Kopyala"}
            </button>
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-medium">flex-direction</label>
            <select
              value={flexDirection}
              onChange={(e) => setFlexDirection(e.target.value as any)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none"
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">justify-content</label>
            <select
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value as any)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none"
            >
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">align-items</label>
            <select
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value as any)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none"
            >
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="stretch">stretch</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>gap</span>
                <span className="text-white font-mono">{flexGap}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={flexGap}
                onChange={(e) => setFlexGap(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Eleman Sayısı</span>
                <span className="text-white font-mono">{flexItemCount}</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={flexItemCount}
                onChange={(e) => setFlexItemCount(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}