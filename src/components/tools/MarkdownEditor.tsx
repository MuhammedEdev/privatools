"use client";

import { useState } from "react";
import { Copy, Check, FileText, Eye, Edit3 } from "lucide-react";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>(
    "# PrivaTools Markdown Editörü\n\nBu **Markdown** editörü ile belgelerinizi hızlıca yazın.\n\n### Özellikler:\n- Hızlı önizleme\n- Kolay kopyalama\n- Modern tasarım\n\n```javascript\nconsole.log('PrivaTools');\n```"
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Basit bir Markdown parser (veya metin gösterimi)
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-white mb-2">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold text-white mb-2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-medium text-emerald-400 mb-1">$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="bg-[#0D121F] text-emerald-400 px-1 py-0.5 rounded font-mono text-xs">$1</code>')
      .replace(/\n/gim, '<br />');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Markdown Editor</h1>
          <p className="text-sm text-slate-400 mt-1">
            Markdown formatında belgeler yazın ve anlık olarak önizleyin.
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-lg transition flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Kopyalandı" : "Markdown Kopyala"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-emerald-400" /> Markdown Girdisi
          </label>
          <textarea
            rows={12}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none shadow-inner leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-emerald-400" /> Canlı Önizleme
          </label>
          <div
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3.5 text-xs text-slate-300 min-h-[268px] overflow-auto shadow-inner leading-relaxed prose prose-invert"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
          />
        </div>
      </div>
    </div>
  );
}