"use client";

import React, { useState } from "react";

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('{\n  "name": "PrivaTools",\n  "version": "1.0.0",\n  "active": true,\n  "features": ["formatter", "converter", "secure"]\n}');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = (indent: number) => {
    try {
      setError(null);
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, indent));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleMinify = () => {
    try {
      setError(null);
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonInput);
    alert("JSON panoya kopyalandı!");
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-3xl mx-auto shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold">Pro JSON Formatter & Validator</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFormat(2)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-medium rounded-lg transition-colors"
          >
            Format (2 Spaces)
          </button>
          <button
            onClick={() => handleFormat(4)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-medium rounded-lg transition-colors"
          >
            Format (4 Spaces)
          </button>
          <button
            onClick={handleMinify}
            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium rounded-lg transition-colors border border-zinc-700"
          >
            Minify
          </button>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-xs font-medium rounded-lg transition-colors"
          >
            Kopyala
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          rows={14}
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            try {
              if (e.target.value.trim() === "") {
                setError(null);
                return;
              }
              JSON.parse(e.target.value);
              setError(null);
            } catch (err: any) {
              setError(err.message);
            }
          }}
          className={`w-full bg-zinc-950 border ${
            error ? "border-red-500" : "border-zinc-800"
          } rounded-xl p-4 text-sm font-mono text-emerald-300 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner`}
          placeholder="JSON verinizi buraya yapıştırın..."
        />
      </div>

      {error ? (
        <div className="mt-3 p-3 bg-red-950/50 border border-red-800/60 rounded-lg flex items-center gap-2 text-red-300 text-xs font-mono">
          <span className="font-bold">Hata:</span> {error}
        </div>
      ) : (
        <div className="mt-3 p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg flex items-center gap-2 text-emerald-400 text-xs font-mono">
          <span>✓ Geçerli JSON formatı</span>
        </div>
      )}
    </div>
  );
}