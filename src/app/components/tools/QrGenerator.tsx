"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export default function QrGenerator() {
  const [qrText, setQrText] = useState<string>("https://privatools.vercel.app");

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText || "https://privatools.vercel.app")}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">QR Code Generator</h1>
        <p className="text-sm text-slate-400 mt-1">
          URL veya metinleriniz için hızlıca taranabilir QR kodları oluşturun.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">URL veya Metin</label>
            <textarea
              rows={4}
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
            />
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center gap-4">
          <div className="p-3 bg-white rounded-xl shadow-lg">
            <img src={qrImageUrl} alt="Generated QR Code" className="w-44 h-44 rounded" />
          </div>
          <a
            href={qrImageUrl}
            download="qrcode.png"
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-4 rounded transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Görseli İndir
          </a>
        </div>
      </div>
    </div>
  );
}