"use client";

import { useState } from "react";
import { Copy, Check, LayoutGrid } from "lucide-react";

export default function FlexboxPlayground() {
  const [flexDirection, setFlexDirection] = useState<string>("row");
  const [justifyContent, setJustifyContent] = useState<string>("center");
  const [alignItems, setAlignItems] = useState<string>("center");
  const [flexWrap, setFlexWrap] = useState<string>("wrap");
  const [gap, setGap] = useState<string>("4");
  const [itemCount, setItemCount] = useState<number>(4);
  const [copied, setCopied] = useState<boolean>(false);

  const cssCode = `display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
flex-wrap: ${flexWrap};
gap: ${gap}rem;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold text-white">Flexbox Visual Playground</h1>
          <p className="text-sm text-slate-400 mt-1">
            CSS Flexbox özelliklerini interaktif olarak test edin ve anında kodunu alın.
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded transition flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Kopyalandı" : "CSS Kopyala"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col justify-between min-h-[320px]">
          <div
            className="w-full h-full min-h-[240px] bg-slate-900/50 border border-dashed border-slate-800 rounded-lg p-4 transition-all duration-200"
            style={{
              display: "flex",
              flexDirection: flexDirection as any,
              justifyContent: justifyContent,
              alignItems: alignItems,
              flexWrap: flexWrap as any,
              gap: `${parseFloat(gap) * 16}px`,
            }}
          >
            {Array.from({ length: itemCount }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-lg flex items-center justify-center font-mono text-xs text-emerald-400 font-bold shadow-sm"
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div className="mt-4 bg-[#0D121F] border border-slate-800/80 rounded-md p-3 font-mono text-xs text-emerald-400 whitespace-pre">
            {cssCode}
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Flex Direction</label>
            <select
              value={flexDirection}
              onChange={(e) => setFlexDirection(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none"
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Justify Content</label>
            <select
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value)}
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
            <label className="text-slate-400 font-medium">Align Items</label>
            <select
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none"
            >
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="baseline">baseline</option>
              <option value="stretch">stretch</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Flex Wrap</label>
            <select
              value={flexWrap}
              onChange={(e) => setFlexWrap(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none"
            >
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Boşluk (Gap): {gap}rem</label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.5"
              value={gap}
              onChange={(e) => setGap(e.target.value)}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer mt-1"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Öğe Sayısı: {itemCount}</label>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={itemCount}
              onChange={(e) => setItemCount(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}