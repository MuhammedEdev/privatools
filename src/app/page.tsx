// src/app/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Lock, Zap, Layers, Sparkles, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Arkaplan Dekoratif Işık Efekti (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-8 relative z-10">

        {/* Üst Küçük Animasyonlu Rozet */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>v2.4 Sürümü Yayında — 25+ Geliştirici Aracı</span>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Güvenli, Hızlı ve Modern <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            PrivaTools Platformu
          </span>
        </h1>

        {/* Açıklama */}
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Geliştiriciler için özel olarak tasarlanmış profesyonel araç seti. Tüm işlemler tarayıcınızda (client-side) gerçekleşir, verileriniz asla sunucuya gitmez.
        </p>

        {/* CTA Butonları */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/studio"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm shadow-xl shadow-emerald-500/20"
          >
            <span>Stüdyoyu Başlat (25 Araç)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto bg-[#0D121F] hover:bg-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-xl transition-all border border-slate-800 text-sm flex items-center justify-center gap-2"
          >
            Sistemi İncele
          </Link>
        </div>

        {/* Özellikler Grid (Animasyonlu Kartlar) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 text-left">
          <div className="bg-[#0D121F]/80 backdrop-blur border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 space-y-3 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">%100 İstemci Tarafı</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Verileriniz cihazınızdan dışarı çıkmaz. Sıfır veri saklama politikasıyla tam gizlilik.</p>
          </div>

          <div className="bg-[#0D121F]/80 backdrop-blur border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 space-y-3 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Anında Sonuç</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Next.js ve Turbopack altyapısıyla sıfır gecikmeyle anında araçları çalıştırın.</p>
          </div>

          <div className="bg-[#0D121F]/80 backdrop-blur border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 space-y-3 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Zengin Koleksiyon</h3>
            <p className="text-xs text-slate-400 leading-relaxed">JSON formatlayıcıdan JWT çözümleyiciye kadar ihtiyacınız olan her şey tek yerde.</p>
          </div>
        </div>

      </div>

      {/* Alt Bilgi Güvence Bandı */}
      <div className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Geliştiriciler tarafından, geliştiriciler için açık kaynak olarak üretilmiştir.</span>
      </div>

    </div>
  );
}