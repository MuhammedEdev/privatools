"use client";

import { useState, useEffect } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [passLength, setPassLength] = useState<number>(16);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let result = "";
    for (let i = 0; i < passLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [passLength]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Güvenli Parola Oluşturucu</h1>
        <p className="text-sm text-slate-400 mt-1">
          Cihazınızda kriptografik olarak rastgele ve yüksek güvenlikli şifreler üretin.
        </p>
      </div>

      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 space-y-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full bg-slate-900 border border-slate-800 rounded-md px-4 py-3 font-mono text-emerald-400 text-sm focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-3 rounded-md text-xs font-medium transition flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Kopyalandı" : "Kopyala"}
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Parola Uzunluğu</span>
            <span className="font-mono text-white">{passLength} karakter</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={passLength}
            onChange={(e) => setPassLength(parseInt(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs py-2.5 rounded-md transition flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Yeniden Üret
        </button>
      </div>
    </div>
  );
}