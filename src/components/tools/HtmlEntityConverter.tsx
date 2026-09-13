"use client";

import { useState } from "react";

export default function HtmlEntityConverter() {
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [htmlOutput, setHtmlOutput] = useState<string>("");
  const [htmlMode, setHtmlMode] = useState<"encode" | "decode">("encode");

  const handleHtmlProcess = (text: string, mode: "encode" | "decode") => {
    setHtmlInput(text);
    if (!text.trim()) {
      setHtmlOutput("");
      return;
    }
    if (mode === "encode") {
      setHtmlOutput(text.replace(/[\u00A0-\u9999<>&"']/g, (i) => `&#${i.charCodeAt(0)};`));
    } else {
      const doc = new DOMParser().parseFromString(text, "text/html");
      setHtmlOutput(doc.documentElement.textContent || "");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold text-white">HTML Entity Converter</h1>
          <p className="text-sm text-slate-400 mt-1">Özel karakterleri HTML Entity kodlarına dönüştürün veya çözün.</p>
        </div>
        <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => { setHtmlMode("encode"); handleHtmlProcess(htmlInput, "encode"); }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${htmlMode === "encode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
          >
            Encode
          </button>
          <button
            onClick={() => { setHtmlMode("decode"); handleHtmlProcess(htmlInput, "decode"); }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${htmlMode === "decode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          rows={10}
          value={htmlInput}
          onChange={(e) => handleHtmlProcess(e.target.value, htmlMode)}
          placeholder="Metin veya HTML yazın..."
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
        />
        <textarea
          rows={10}
          readOnly
          value={htmlOutput}
          placeholder="Sonuç..."
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}