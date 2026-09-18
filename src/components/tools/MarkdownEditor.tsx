"use client";

import { useState } from "react";
import { Copy, Check, Bold, Italic, Heading, List, Code, Edit3, Eye } from "lucide-react";

export default function MarkdownEditor() {
  const [markdownInput, setMarkdownInput] = useState<string>(
    "# PrivaTools Markdown Stüdyosu\n\n**Client-side** ve güvenli açık kaynak araç seti.\n\n### Özellikler:\n- Sıfır veri kaybı\n- Canlı önizleme\n- Hızlı biçimlendirme\n\n```javascript\nconst secure = true;\n```"
  );
  const [copied, setCopied] = useState<boolean>(false);

  const parseMarkdown = (text: string) => {
    let parsed = text
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-white mb-2">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold text-white mb-2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-medium text-white mb-1">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-emerald-400">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-slate-900 border border-slate-800 p-2 rounded text-xs text-emerald-300 font-mono my-2 overflow-x-auto"><code>$1</code></pre>')
      .replace(/`(.*)`/gim, '<code class="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-300">$1</li>');
    return { __html: parsed.replace(/\n/g, '<br />') };
  };

  const insertFormatting = (syntax: string, wrapper: boolean = false) => {
    const textarea = document.getElementById("markdown-textarea") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    let replacement = wrapper ? `${syntax}${selected}${syntax}` : `${syntax}${selected}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setMarkdownInput(newText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const charCount = markdownInput.length;
  const wordCount = markdownInput.trim() ? markdownInput.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Markdown Live Editor</h1>
          <p className="text-sm text-slate-400 mt-1">
            Markdown kodlarınızı yazın, araç çubuğuyla biçimlendirin ve gerçek zamanlı önizleyin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 bg-[#090D16] border border-slate-800 px-3 py-2 rounded-lg">
            {wordCount} kelime | {charCount} karakter
          </span>
          <button
            onClick={copyToClipboard}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-lg transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Kopyalandı" : "Ham Kodu Kopyala"}
          </button>
        </div>
      </div>

      {/* Araç Çubuğu */}
      <div className="flex items-center gap-1.5 bg-[#090D16] border border-slate-800 p-1.5 rounded-lg text-slate-400">
        <button onClick={() => insertFormatting("**", true)} className="p-1.5 hover:bg-slate-800 hover:text-white rounded transition" title="Kalın (Bold)">
          <Bold className="w-4 h-4" />
        </button>
        <button onClick={() => insertFormatting("*", true)} className="p-1.5 hover:bg-slate-800 hover:text-white rounded transition" title="İtalik">
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-slate-800 mx-1" />
        <button onClick={() => insertFormatting("# ")} className="p-1.5 hover:bg-slate-800 hover:text-white rounded transition" title="Başlık">
          <Heading className="w-4 h-4" />
        </button>
        <button onClick={() => insertFormatting("- ")} className="p-1.5 hover:bg-slate-800 hover:text-white rounded transition" title="Liste">
          <List className="w-4 h-4" />
        </button>
        <button onClick={() => insertFormatting("`", true)} className="p-1.5 hover:bg-slate-800 hover:text-white rounded transition" title="Kod Satırı">
          <Code className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-emerald-400" /> Markdown Girdisi
          </label>
          <textarea
            id="markdown-textarea"
            rows={12}
            value={markdownInput}
            onChange={(e) => setMarkdownInput(e.target.value)}
            placeholder="Markdown kodlarını yazın..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none leading-relaxed shadow-inner"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-emerald-400" /> Canlı Önizleme
          </label>
          <div
            dangerouslySetInnerHTML={parseMarkdown(markdownInput)}
            className="w-full h-[268px] bg-[#090D16] border border-slate-800 rounded-lg p-4 text-xs text-slate-300 leading-relaxed overflow-y-auto shadow-inner"
          />
        </div>
      </div>
    </div>
  );
}