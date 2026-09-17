"use client";

import { useState } from "react";
import { Copy, Check, Code } from "lucide-react";

export default function HtmlToJsConverter() {
  const [input, setInput] = useState<string>('<div class="container">\n  <h1 style="color: red;">Merhaba PrivaTools</h1>\n  <input type="text" placeholder="Adınız..." />\n</div>');
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const convertHtmlToJsx = (html: string) => {
    if (!html.trim()) {
      setOutput("");
      return;
    }

    let result = html
      // class -> className
      .replace(/class=/g, "className=")
      // for -> htmlFor
      .replace(/for=/g, "htmlFor=")
      // Self-closing tags fix for JSX
      .replace(/<input([^>]*?)>/g, "<input$1 />")
      .replace(/<img([^>]*?)>/g, "<img$1 />")
      .replace(/<br>/g, "<br />")
      .replace(/<hr>/g, "<hr />");

    // style attribute string to JSX object conversion (basic support)
    result = result.replace(/style="([^"]*?)"/g, (match, styleStr) => {
      const styles = styleStr.split(";").filter(Boolean).map((s: string) => {
        const [key, val] = s.split(":").map((x: string) => x.trim());
        if (!key || !val) return "";
        const camelKey = key.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
        return `${camelKey}: "${val}"`;
      }).filter(Boolean).join(", ");
      return `style={{ ${styles} }}`;
    });

    setOutput(result);
  };

  // İlk yüklemede çalıştır
  useState(() => {
    convertHtmlToJsx(input);
  });

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
          <h1 className="text-xl font-semibold text-white">Pro HTML to JSX Converter</h1>
          <p className="text-sm text-slate-400 mt-1">
            Standart HTML kodlarını React JSX formatına (className, style nesneleri vb.) dönüştürün.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">HTML Kodu</label>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => { setInput(e.target.value); convertHtmlToJsx(e.target.value); }}
            placeholder="HTML kodunu buraya yapıştırın..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none shadow-inner"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-400">React JSX Çıktısı</label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Kopyalandı" : "Kopyala"}
              </button>
            )}
          </div>
          <textarea
            rows={10}
            readOnly
            value={output}
            placeholder="JSX çıktısı burada görünecek..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none shadow-inner select-all"
          />
        </div>
      </div>
    </div>
  );
}