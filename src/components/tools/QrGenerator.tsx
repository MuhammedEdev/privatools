"use client";

import { useState } from "react";
import { Copy, Check, QrCode, Download } from "lucide-react";

export default function QrGenerator() {
  const [text, setText] = useState<string>("https://privatools.dev");
  const [copied, setCopied] = useState<boolean>(false);

  // Google Chart API tabanlı hızlı ve güvenilir QR kod üretimi
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro QR Code Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Metin, bağlantı veya iletişim bilgileri için yüksek kaliteli QR kodlar oluşturun.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400">QR Kod İçeriği (URL veya Metin)</label>
            <textarea
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="QR koda dönüştürülecek metni yazın..."
              className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none shadow-inner"
            />
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-4 rounded-lg transition text-xs border border-slate-700 flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Metin Kopyalandı" : "Metni Kopyala"}
          </button>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-inner border border-slate-700">
            <img
              src={qrImageUrl}
              alt="QR Code"
              className="w-48 h-48 object-contain"
            />
          </div>

          <a
            href={qrImageUrl}
            download="privatools-qrcode.png"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[240px] bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-1.5"
          >
            <Download className="w-4 h-4" /> QR Kodu İndir (PNG)
          </a>
        </div>
      </div>
    </div>
  );
}