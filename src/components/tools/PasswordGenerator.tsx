"use client";

import React, { useState } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

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

  // Şifre Güvenlik Hesaplama
  const getStrength = () => {
    if (!password || password.startsWith("Lütfen")) return { label: "Yok", color: "bg-zinc-700", width: "w-0" };
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUppercase && includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return { label: "Zayıf", color: "bg-red-500", width: "w-1/3" };
    if (score <= 4) return { label: "Orta", color: "bg-amber-500", width: "w-2/3" };
    return { label: "Güçlü", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getStrength();

  const copyToClipboard = () => {
    if (!password || password.startsWith("Lütfen")) return;
    navigator.clipboard.writeText(password);
    alert("Güvenli şifre kopyalandı!");
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-white max-w-xl mx-auto shadow-xl">
      <h2 className="text-xl font-bold mb-4">Pro Password Generator</h2>

      {/* Şifre Gösterim Alanı */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 font-mono text-indigo-300 text-lg tracking-wider break-all shadow-inner">
          {password || "Şifre üretmek için butona basın..."}
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-medium transition-colors text-sm"
        >
          Kopyala
        </button>
      </div>

      {/* Güvenlik Çubuğu */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-zinc-400 mb-1">
          <span>Şifre Güvenliği:</span>
          <span className="font-semibold text-white">{strength.label}</span>
        </div>
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`} />
        </div>
      </div>

      {/* Kontroller */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-zinc-400 mb-1">
            <span>Uzunluk: {length} karakter</span>
          </div>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <label className="flex items-center gap-2 cursor-pointer bg-zinc-800/50 p-2.5 rounded-lg border border-zinc-800">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Büyük Harf (A-Z)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-zinc-800/50 p-2.5 rounded-lg border border-zinc-800">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Küçük Harf (a-z)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-zinc-800/50 p-2.5 rounded-lg border border-zinc-800">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Rakamlar (0-9)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-zinc-800/50 p-2.5 rounded-lg border border-zinc-800">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Özel Karakterler (!@#)</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-xl transition-colors border border-zinc-700"
        >
          Yeni Şifre Üret
        </button>
      </div>
    </div>
  );
}