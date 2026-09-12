"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function JwtDecoder() {
  const [jwtInput, setJwtInput] = useState<string>("");
  const [jwtHeader, setJwtHeader] = useState<string>("");
  const [jwtPayload, setJwtPayload] = useState<string>("");
  const [jwtError, setJwtError] = useState<string | null>(null);

  const handleDecodeJwt = (token: string) => {
    setJwtInput(token);
    setJwtError(null);
    if (!token.trim()) {
      setJwtHeader("");
      setJwtPayload("");
      return;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      setJwtError("Geçersiz JWT yapısı. Token 3 parçadan oluşmalıdır (Header.Payload.Signature).");
      setJwtHeader("");
      setJwtPayload("");
      return;
    }

    try {
      const headerDecoded = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payloadDecoded = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      setJwtHeader(JSON.stringify(headerDecoded, null, 2));
      setJwtPayload(JSON.stringify(payloadDecoded, null, 2));
    } catch (err) {
      setJwtError("JWT verisi Base64 çözümlenirken hata oluştu.");
      setJwtHeader("");
      setJwtPayload("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">JWT Decoder</h1>
        <p className="text-sm text-slate-400 mt-1">
          JWT tokenlarınızı istemci tarafında çözerek Header ve Payload içeriklerini görüntüleyin.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          rows={4}
          value={jwtInput}
          onChange={(e) => handleDecodeJwt(e.target.value)}
          placeholder="JWT tokenını buraya yapıştırın (eyJhbGciOiJIUzI1Ni...)"
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
        />

        {jwtError && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{jwtError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">Header (Başlık)</label>
            <textarea
              rows={8}
              readOnly
              value={jwtHeader}
              placeholder="Header JSON verisi..."
              className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">Payload (Yük)</label>
            <textarea
              rows={8}
              readOnly
              value={jwtPayload}
              placeholder="Payload JSON verisi..."
              className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}