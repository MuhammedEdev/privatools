"use client";

import React, { useState } from "react";

export default function HtmlToJsxConverter() {
  const [htmlInput, setHtmlInput] = useState('<div class="container">\n  <label for="username">Kullanıcı Adı</label>\n  <input type="text" id="username" class="form-input" />\n</div>');
  const [jsxOutput, setJsxOutput] = useState("");

  const convertToJsx = () => {
    let result = htmlInput
      // class -> className
      .replace(/class=/g, "className=")
      // for -> htmlFor
      .replace(/for=/g, "htmlFor=")
      // style string'ini objeye dönüştürme simülasyonu veya temel temizlik
      .replace(/tabindex=/g, "tabIndex=")
      .replace(/readonly=/g, "readOnly=");

    setJsxOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsxOutput);
    alert("JSX Kodu kopyalandı!");
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-2xl mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">HTML to JSX Converter</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">HTML Girdisi</label>
          <textarea
            rows={10}
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">JSX Çıktısı</label>
          <pre className="w-full h-[244px] bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm font-mono text-indigo-300 overflow-auto">
            {jsxOutput || "// Dönüştürmek için butona basın..."}
          </pre>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={convertToJsx}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          JSX'e Çevir
        </button>
        {jsxOutput && (
          <button
            onClick={copyToClipboard}
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            Kopyala
          </button>
        )}
      </div>
    </div>
  );
}