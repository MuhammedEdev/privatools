"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Lock, RefreshCw } from "lucide-react";

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
    window.crypto.getRandomValues(array);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Password Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            Kriptografik olarak güvenli, özelleştirilebilir güçlü şifreler üretin.
          </p>
        </div>
      </div>

      <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between bg-[#0D121F] border border-slate-800 rounded-lg p-4">
          <span className="font-mono text-base md:text-lg text-emerald-400 font-semibold tracking-wider break-all">
            {password}
          </span>
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={generatePassword}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
              title="Yenile"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={copyToClipboard}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-lg transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Kopyalandı" : "Kopyala"}
            </button>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between text-slate-400 font-medium">
              <span>Şifre Uzunluğu ({length} karakter)</span>
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
            {[
              { label: "Büyük Harf (A-Z)", val: includeUppercase, set: setIncludeUppercase },
              { label: "Küçük Harf (a-z)", val: includeLowercase, set: setIncludeLowercase },
              { label: "Rakam (0-9)", val: includeNumbers, set: setIncludeNumbers },
              { label: "Özel Karakter (!@#)", val: includeSymbols, set: setIncludeSymbols },
            ].map((item, idx) => (
              <label key={idx} className="flex items-center gap-2 bg-[#0D121F] border border-slate-800 rounded-lg p-3 cursor-pointer hover:border-slate-700 transition">
                <input
                  type="checkbox"
                  checked={item.val}
                  onChange={(e) => item.set(e.target.checked)}
                  className="accent-emerald-500 rounded"
                />
                <span className="text-slate-300 font-medium">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}