"use client";

import { useState } from "react";
import { QrCode, Download, Link2 } from "lucide-react";

export default function QrGenerator() {
  const [text, setText] = useState<string>("https://privatools.app");
  const [size, setSize] = useState<number>(200);

  // QR Server API tabanlı pratik ve güvenli istemci tarafı QR görsel oluşturucu
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Pro QR Code Generator</h1>
        <p className="text-sm text-slate-400 mt-1">
          URL veya metinleriniz için yüksek kaliteli QR kodlar oluşturun, boyutlandırın ve indirin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="space-y-2">
            <label className="text-slate-400 font-medium">QR Kod İçeriği (URL veya Metin)</label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="QR koduna dönüştürülecek metni yazın..."
              className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 font-medium">Boyut: {size}x{size} px</label>
            <input
              type="range"
              min="100"
              max="400"
              step="50"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
          <div className="bg-white p-3 rounded-xl shadow-inner border border-slate-800 flex items-center justify-center">
            {text ? (
              <img src={qrImageUrl} alt="QR Code" width={size} height={size} className="rounded object-contain" />
            ) : (
              <div className="w-[150px] h-[150px] flex items-center justify-center text-slate-400 text-xs">
                Metin girin
              </div>
            )}
          </div>

          {text && (
            <a
              href={qrImageUrl}
              download="qrcode.png"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2.5 px-4 rounded-lg transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> QR Kodu İndir (PNG)
            </a>
          )}
        </div>
      </div>
    </div>
  );
}