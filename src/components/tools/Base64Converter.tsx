"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function Base64Converter() {
  const [base64Input, setBase64Input] = useState<string>("");
  const [base64Output, setBase64Output] = useState<string>("");
  const [base64Mode, setBase64Mode] = useState<"encode" | "decode">("encode");
  const [base64Copied, setBase64Copied] = useState<boolean>(false);
  const [base64Error, setBase64Error] = useState<string | null>(null);

  const handleBase64Process = (text: string, mode: "encode" | "decode") => {
    setBase64Input(text);
    setBase64Error(null);
    if (!text.trim()) {
      setBase64Output("");
      return;
    }
    try {
      if (mode === "encode") {
        setBase64Output(btoa(unescape(encodeURIComponent(text))));
      } else {
        setBase64Output(decodeURIComponent(escape(atob(text))));
      }
    } catch (err) {
      setBase64Error("Geçersiz Base64 dizisi çözülemedi.");
      setBase64Output("");
    }
  };

  const copyToClipboard = () => {
    if (!base64Output) return;
    navigator.clipboard.writeText(base64Output);
    setBase64Copied(true);
    setTimeout(() => setBase64Copied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold text-white">Base64 Encoder / Decoder</h1>
          <p className="text-sm text-slate-400 mt-1">
            Metinlerinizi istemci tarafında anında Base64 formatına çevirin veya çözün.
          </p>
        </div>
        <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => {
              setBase64Mode("encode");
              handleBase64Process(base64Input, "encode");
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              base64Mode === "encode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => {
              setBase64Mode("decode");
              handleBase64Process(base64Input, "decode");
            }}
            className={`px-3 py-1.5 rounded-md font-medium transition ${
              base64Mode === "decode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-400">
            {base64Mode === "encode" ? "Düz Metin (Plain Text)" : "Base64 Dizisi"}
          </label>
          <textarea
            rows={10}
            value={base64Input}
            onChange={(e) => handleBase64Process(e.target.value, base64Mode)}
            placeholder={base64Mode === "encode" ? "Dönüştürülecek metni yazın..." : "Çözülecek Base64 kodunu yapıştırın..."}
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 transition resize-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-slate-400">Sonuç</label>
            {base64Output && (
              <button
                onClick={copyToClipboard}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                {base64Copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {base64Copied ? "Kopyalandı" : "Kopyala"}
              </button>
            )}
          </div>
          <textarea
            rows={10}
            readOnly
            value={base64Output}
            placeholder="Sonuç burada görüntülenecek..."
            className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}