"use client";

import { useState } from "react";
import { Copy, Check, FileCode } from "lucide-react";

export default function HtmlToJsConverter() {
  const [htmlInput, setHtmlInput] = useState<string>('<div class="container">\n  <label for="username">Kullanıcı Adı</label>\n  <input type="text" id="username" style="background-color: #000; color: #fff;" />\n</div>');
  const [jsxOutput, setJsxOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const convertToJsx = (html: string) => {
    setHtmlInput(html);
    if (!html.trim()) {
      setJsxOutput("");
      return;
    }

    let converted = html
      .replace(/class=/g, "className=")
      .replace(/for=/g, "htmlFor=")
      .replace(/accept-charset=/g, "acceptCharset=")
      .replace(/accesskey=/g, "accessKey=")
      .replace(/cellpadding=/g, "cellPadding=")
      .replace(/cellspacing=/g, "cellSpacing=")
      .replace(/colspan=/g, "colSpan=")
      .replace(/rowspan=/g, "rowSpan=")
      .replace(/tabindex=/g, "tabIndex=")
      .replace(/autocomplete=/g, "autoComplete=");

    // style="color: red; font-size: 12px;" -> style={{ color: 'red', fontSize: '12px' }} dönüşüm simülasyonu / temizliği
    converted = converted.replace(/style="([^"]*)"/g, (match, p1) => {
      const styles = p1.split(";").filter(Boolean).map((s: string) => {
        const [key, val] = s.split(":").map((x: string) => x.trim());
        if (!key || !val) return "";
        const camelKey = key.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
        return `${camelKey}: '${val}'`;
      }).filter(Boolean).join(", ");
      return `style={{ ${styles} }}`;
    });

    setJsxOutput(converted);
  };

  const copyToClipboard = () => {
    if (!jsxOutput) return;
    navigator.clipboard.writeText(jsxOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">HTML to JSX Converter</h1>
          <p className="text-sm text-slate-400 mt-1">
            HTML kodlarını React uyumlu JSX formatına (className, htmlFor, inline style) dönüştürün.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">Ham HTML</label>
          <textarea
            rows={10}
            value={htmlInput}
            onChange={(e) => convertToJsx(e.target.value)}
            placeholder="HTML kodunu buraya yapıştırın..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-400">JSX Çıktısı</label>
            {jsxOutput && (
              <button
                onClick={copyToClipboard}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Kopyalandı" : "Kopyala"}
              </button>
            )}
          </div>
          <textarea
            rows={10}
            readOnly
            value={jsxOutput || (htmlInput ? convertToJsx(htmlInput) || jsxOutput : "")}
            placeholder="JSX çıktısı burada görünecek..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}