"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, RefreshCcw, ShieldCheck } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setPassword("Lütfen en az bir seçenek seçin!");
      return;
    }

    let result = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // Şifre Güvenlik Hesaplama
  const getStrength = () => {
    if (!password || password.startsWith("Lütfen")) return { label: "Yok", color: "bg-slate-700", width: "w-0" };
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUppercase && includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return { label: "Zayıf", color: "bg-rose-500", width: "w-1/3" };
    if (score <= 4) return { label: "Orta", color: "bg-amber-500", width: "w-2/3" };
    return { label: "Güçlü", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getStrength();

  const copyToClipboard = () => {
    if (!password || password.startsWith("Lütfen")) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Güvenli Şifre Üreteci</h1>
        <p className="text-sm text-slate-400 mt-1">
          Kriptografik olarak güvenli, rastgele ve özelleştirilebilir parolalar oluşturun.
        </p>
      </div>

      {/* Şifre Gösterim Alanı */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-[#090D16] border border-slate-800 rounded-lg p-3 font-mono text-emerald-400 text-base tracking-wider break-all shadow-inner">
          {password || "Şifre üretiliyor..."}
        </div>
        <button
          onClick={generatePassword}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-3 rounded-lg transition border border-slate-700"
          title="Yeniden Üret"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
        <button
          onClick={copyToClipboard}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-3 rounded-lg transition text-xs flex items-center gap-1.5 shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Kopyalandı" : "Kopyala"}
        </button>
      </div>

      {/* Güvenlik Çubuğu */}
      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Şifre Güvenliği:</span>
          <span className="font-semibold text-white">{strength.label}</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
        </div>
      </div>

      {/* Kontroller */}
      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
        <div className="space-y-2">
          <div className="flex justify-between text-slate-400 font-medium">
            <span>Parola Uzunluğu</span>
            <span className="text-white font-mono">{length} karakter</span>
          </div>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <label className="flex items-center gap-2 cursor-pointer bg-[#0D121F] p-3 rounded-lg border border-slate-800 text-slate-300 hover:border-slate-700 transition">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="rounded accent-emerald-500 bg-slate-900 border-slate-800"
            />
            <span>Büyük Harf (A-Z)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#0D121F] p-3 rounded-lg border border-slate-800 text-slate-300 hover:border-slate-700 transition">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="rounded accent-emerald-500 bg-slate-900 border-slate-800"
            />
            <span>Küçük Harf (a-z)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#0D121F] p-3 rounded-lg border border-slate-800 text-slate-300 hover:border-slate-700 transition">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded accent-emerald-500 bg-slate-900 border-slate-800"
            />
            <span>Rakamlar (0-9)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#0D121F] p-3 rounded-lg border border-slate-800 text-slate-300 hover:border-slate-700 transition">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded accent-emerald-500 bg-slate-900 border-slate-800"
            />
            <span>Özel Karakterler (!@#)</span>
          </label>
        </div>
      </div>
    </div>
  );
}