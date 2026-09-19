// src/app/page.tsx
"use client";

import { Shield, Sparkles, ArrowRight, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col justify-center items-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Üst Rozet */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Geliştiriciler İçin Yeni Nesil Araç Seti</span>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Güvenli, Hızlı ve Modern <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Geliştirici Stüdyosu
          </span>
        </h1>

        {/* Açıklama */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Tüm verileriniz tarayıcınızda (client-side) işlenir. Asla sunucuya gönderilmez. Tamamen açık kaynaklı ve gizlilik odaklı araçlar.
        </p>

        {/* Özellik Rozetleri */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto text-left">
          <div className="bg-[#0D121F] border border-slate-800/80 rounded-xl p-4 space-y-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">%100 Güvenli</h3>
            <p className="text-xs text-slate-400">Verileriniz dışarı sızmaz, tamamen tarayıcınızda kalır.</p>
          </div>

          <div className="bg-[#0D121F] border border-slate-800/80 rounded-xl p-4 space-y-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Yüksek Performans</h3>
            <p className="text-xs text-slate-400">Next.js ve Turbopack gücüyle anında sonuç alın.</p>
          </div>

          <div className="bg-[#0D121F] border border-slate-800/80 rounded-xl p-4 space-y-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Modern Tasarım</h3>
            <p className="text-xs text-slate-400">Göz yormayan koyu tema ve akıcı arayüz deneyimi.</p>
          </div>
        </div>

      </div>
    </div>
  );
}