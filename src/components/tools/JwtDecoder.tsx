"use client";

import React, { useState } from "react";

export default function JwtDecoder() {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik11aGFtbWVkIEVsaGFjaSIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );
  const [error, setError] = useState<string | null>(null);

  let header = {};
  let payload = {};

  try {
    const parts = token.trim().split(".");
    if (parts.length === 3) {
      const base64UrlDecode = (str: string) => {
        let output = str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
          case 0:
            break;
          case 2:
            output += "==";
            break;
          case 3:
            output += "=";
            break;
          default:
            throw new Error("Geçersiz base64url string.");
        }
        return decodeURIComponent(
          atob(output)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
      };

      header = JSON.parse(base64UrlDecode(parts[0]));
      payload = JSON.parse(base64UrlDecode(parts[1]));
      if (error) setError(null);
    } else if (token.trim() !== "") {
      setError("Geçersiz JWT formatı (3 parçadan oluşmalıdır: header.payload.signature)");
    }
  } catch (err: any) {
    setError("JWT çözümlenirken bir hata oluştu: " + err.message);
  }

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-3xl mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">Pro JWT Decoder</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">JWT Token Girdisi</label>
          <textarea
            rows={4}
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              if (!e.target.value.trim()) setError(null);
            }}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 shadow-inner break-all"
            placeholder="eyJhbGciOiJIUzI1NiIsIn..."
          />
        </div>

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-lg text-red-300 text-xs font-mono">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Header (Başlık)</label>
            <pre className="w-full h-44 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-emerald-300 overflow-auto shadow-inner">
              {JSON.stringify(header, null, 2)}
            </pre>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Payload (Veri / İçerik)</label>
            <pre className="w-full h-44 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-emerald-300 overflow-auto shadow-inner">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}