"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, Shield } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

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
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password || password.startsWith("Lütfen")) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 10) return { label: "Zayıf", color: "text-rose-400 bg-rose-500/10 border-rose-500/30" };
    if (length < 14) return { label: "İyi", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" };
    return { label: "Çok Güçlü", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" };
  };

  const strength = getStrength();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold text-white">Güvenli Şifre Üreteci</h1>
          <p className="text-sm text-slate-400 mt-1">
            Kriptografik olarak güvenli, rastgele ve özelleştirilebilir parolalar oluşturun.
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${strength.color} flex items-center gap-1.5`}>
          <Shield className="w-3.5 h-3.5" /> {strength.label}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 flex items-center justify-between gap-4">
          <span className="font-mono text-sm text-emerald-400 break-all select-all">{password}</span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={generatePassword}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-md transition"
              title="Yeniden Üret"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={copyToClipboard}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-md transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Kopyalandı" : "Kopyala"}
            </button>
          </div>
        </div>

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
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="accent-emerald-500 rounded bg-slate-900 border-slate-800"
              />
              Büyük Harf (A-Z)
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="accent-emerald-500 rounded bg-slate-900 border-slate-800"
              />
              Küçük Harf (a-z)
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="accent-emerald-500 rounded bg-slate-900 border-slate-800"
              />
              Rakam (0-9)
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="accent-emerald-500 rounded bg-slate-900 border-slate-800"
              />
              Özel Karakter (!@#)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}