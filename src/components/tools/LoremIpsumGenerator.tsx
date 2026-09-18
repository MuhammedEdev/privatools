"use client";

import { useState, useEffect } from "react";
import { Copy, Check, FileText, RefreshCw } from "lucide-react";

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState<number>(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const wordsList = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo"
  ];

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 6) + 6;
    const sentWords: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      sentWords.push(wordsList[Math.floor(Math.random() * wordsList.length)]);
    }
    sentWords[0] = sentWords[0].charAt(0).toUpperCase() + sentWords[0].slice(1);
    return sentWords.join(" ") + ".";
  };

  const generateLorem = () => {
    let result = "";
    if (type === "paragraphs") {
      const paras: string[] = [];
      for (let p = 0; p < count; p++) {
        const sentenceCount = Math.floor(Math.random() * 3) + 4;
        const paraSentences: string[] = [];
        for (let s = 0; s < sentenceCount; s++) {
          paraSentences.push(generateSentence());
        }
        paras.push(paraSentences.join(" "));
      }
      result = paras.join("\n\n");
      if (startWithLorem && !result.startsWith("Lorem ipsum")) {
        result = "Lorem ipsum " + result.charAt(0).toLowerCase() + result.slice(1);
      }
    } else if (type === "sentences") {
      const sents: string[] = [];
      for (let i = 0; i < count; i++) {
        sents.push(generateSentence());
      }
      result = sents.join(" ");
      if (startWithLorem && !result.startsWith("Lorem ipsum")) {
        result = "Lorem ipsum " + result.charAt(0).toLowerCase() + result.slice(1);
      }
    } else {
      const wds: string[] = [];
      for (let i = 0; i < count; i++) {
        wds.push(wordsList[Math.floor(Math.random() * wordsList.length)]);
      }
      result = wds.join(" ");
      if (startWithLorem) {
        result = "Lorem ipsum " + result;
      }
    }
    setOutput(result);
  };

  useEffect(() => {
    generateLorem();
  }, [count, type, startWithLorem]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Lorem Ipsum Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Projeleriniz için özelleştirilebilir yer tutucu metinler (Lorem Ipsum) üretin.
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-lg transition flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Kopyalandı" : "Metni Kopyala"}
        </button>
      </div>

      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-slate-400 font-medium">Miktar</label>
          <input
            type="number"
            min="1"
            max="30"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-slate-700"
          />
        </div>

        <div className="space-y-1">
          <label className="text-slate-400 font-medium">Tür</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-white focus:outline-none focus:border-slate-700"
          >
            <option value="paragraphs">Paragraf</option>
            <option value="sentences">Cümle</option>
            <option value="words">Kelime</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={generateLorem}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-4 rounded-md transition border border-slate-700 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Yeniden Üret
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <textarea
          rows={10}
          readOnly
          value={output}
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-4 text-xs font-mono text-emerald-400 focus:outline-none resize-none leading-relaxed select-all shadow-inner"
        />
      </div>
    </div>
  );
}