"use client";

import { useState } from "react";

export default function MarkdownEditor() {
  const [markdownInput, setMarkdownInput] = useState<string>(
    "# PrivaTools\n\n**Client-side** açık kaynak araç seti."
  );

  const parseMarkdown = (text: string) => {
    let parsed = text
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-white mb-2">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold text-white mb-2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-medium text-white mb-1">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-emerald-400">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/`(.*)`/gim, '<code class="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-xs">$1</code>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-300">$1</li>');
    return { __html: parsed.replace(/\n/g, '<br />') };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Markdown Live Editor</h1>
        <p className="text-sm text-slate-400 mt-1">
          Markdown kodlarınızı yazın ve gerçek zamanlı biçimlendirilmiş çıktısını görüntüleyin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          rows={12}
          value={markdownInput}
          onChange={(e) => setMarkdownInput(e.target.value)}
          placeholder="Markdown kodlarını yazın..."
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
        />
        <div
          dangerouslySetInnerHTML={parseMarkdown(markdownInput)}
          className="w-full h-[230px] bg-[#090D16] border border-slate-800 rounded-lg p-4 text-xs text-slate-300 leading-relaxed overflow-y-auto"
        />
      </div>
    </div>
  );
}