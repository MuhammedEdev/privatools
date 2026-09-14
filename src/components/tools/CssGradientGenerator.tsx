"use client";

import React, { useState } from "react";

export default function CssGradientGenerator() {
  const [color1, setColor1] = useState("#4f46e5");
  const [color2, setColor2] = useState("#06b6d4");
  const [direction, setDirection] = useState("to right");

  const gradientStyle = {
    background: `linear-gradient(${direction}, ${color1}, ${color2})`,
  };

  const cssCode = `background: linear-gradient(${direction}, ${color1}, ${color2});`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    alert("CSS Kodu kopyalandı!");
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-lg mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">CSS Gradient Generator</h2>

      <div className="space-y-4">
        <div className="h-32 rounded-xl shadow-inner transition-all duration-300" style={gradientStyle}></div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Renk 1</label>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full h-10 bg-zinc-800 border border-zinc-700 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Renk 2</label>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full h-10 bg-zinc-800 border border-zinc-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Yön</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="to right">Sağa Doğru (to right)</option>
            <option value="to bottom">Aşağı Doğru (to bottom)</option>
            <option value="to bottom right">Çapraz (to bottom right)</option>
            <option value="to top right">Yukarı Sağ (to top right)</option>
          </select>
        </div>

        <div className="p-3 bg-zinc-800/80 rounded-lg border border-zinc-700 font-mono text-xs text-indigo-300 break-all">
          {cssCode}
        </div>

        <button
          onClick={copyToClipboard}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          CSS Kodunu Kopyala
        </button>
      </div>
    </div>
  );
}