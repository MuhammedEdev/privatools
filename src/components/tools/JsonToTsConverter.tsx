"use client";

import React, { useState } from "react";

export default function JsonToTsConverter() {
  const [jsonInput, setJsonInput] = useState('{\n  "id": 1,\n  "name": "Muhammed",\n  "isActive": true\n}');
  const [tsOutput, setTsOutput] = useState("");
  const [error, setError] = useState("");

  const generateTsInterface = () => {
    try {
      setError("");
      const parsed = JSON.parse(jsonInput);
      
      const parseObject = (obj: any, name = "RootObject"): string => {
        let result = `export interface ${name} {\n`;
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const val = obj[key];
            let tsType = typeof val;
            
            if (val === null) {
              tsType = "any";
            } else if (Array.isArray(val)) {
              tsType = "any[]";
            } else if (tsType === "object") {
              tsType = "Record<string, any>";
            }
            
            result += `  ${key}: ${tsType};\n`;
          }
        }
        result += `}\n`;
        return result;
      };

      setTsOutput(parseObject(parsed));
    } catch (err) {
      setError("Geçersiz JSON formatı!");
      setTsOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tsOutput);
    alert("TypeScript Interface kopyalandı!");
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-2xl mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">JSON to TypeScript Converter</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">JSON Girdisi</label>
          <textarea
            rows={10}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">TypeScript Çıktısı</label>
          <pre className="w-full h-[244px] bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm font-mono text-indigo-300 overflow-auto">
            {tsOutput || "// Dönüştürmek için butona basın..."}
          </pre>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button
          onClick={generateTsInterface}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          TypeScript'e Çevir
        </button>
        {tsOutput && (
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