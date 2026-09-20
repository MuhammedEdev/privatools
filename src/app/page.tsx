// src/app/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Lock, Zap, Layers, Sparkles, ShieldCheck, Terminal, Cpu, Globe, Code2, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Arkaplan Dekoratif Işık Efektleri (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[300px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center space-y-12 relative z-10">

        {/* Üst Küçük Animasyonlu Rozet */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>v2.4 Sürümü Yayında — 25+ Geliştirici Aracı ile Tamamen Ücretsiz</span>
        </div>

        {/* Ana Başlık */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Geliştiriciler İçin Güvenli, <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Hızlı ve Modern Süit
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            İş akışınızı hızlandıracak 25+ profesyonel araç. Tüm işlemler tarayıcınızda (client-side) güvenle gerçekleşir, verileriniz asla sunucuya gitmez.
          </p>
        </div>

        {/* CTA Butonları */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/studio"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm shadow-xl shadow-emerald-500/20"
          >
            <span>Stüdyoyu Hemen Başlat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto bg-[#0D121F] hover:bg-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-xl transition-all border border-slate-800 text-sm flex items-center justify-center gap-2"
          >
            Sistem Mimarisini İncele
          </Link>
        </div>

        {/* İstatistik / Özet Barı */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
          <div className="bg-[#0D121F]/60 border border-slate-800/80 rounded-2xl p-4 text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-emerald-400">25+</h4>
            <p className="text-xs text-slate-400 mt-1">Modüler Geliştirici Aracı</p>
          </div>
          <div className="bg-[#0D121F]/60 border border-slate-800/80 rounded-2xl p-4 text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-white">%100</h4>
            <p className="text-xs text-slate-400 mt-1">İstemci Tarafı (Client-Side)</p>
          </div>
          <div className="bg-[#0D121F]/60 border border-slate-800/80 rounded-2xl p-4 text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-emerald-400">0ms</h4>
            <p className="text-xs text-slate-400 mt-1">Sunucu Gecikmesi</p>
          </div>
          <div className="bg-[#0D121F]/60 border border-slate-800/80 rounded-2xl p-4 text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-white">Açık</h4>
            <p className="text-xs text-slate-400 mt-1">Kaynak Kod Politikası</p>
          </div>
        </div>

        {/* Özellikler Grid (Animasyonlu Kartlar) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-left">
          <div className="bg-[#0D121F]/80 backdrop-blur border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 space-y-3 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Mutlak Gizlilik</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Verileriniz cihazınızın dışına çıkmaz. JWT, şifreler ve JSON verileriniz güvendedir.</p>
          </div>

          <div className="bg-[#0D121F]/80 backdrop-blur border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 space-y-3 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Işık Hızında Çalışma</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Next.js ve Turbopack gücüyle optimize edilmiş, anında yanıt veren reaktif bileşenler.</p>
          </div>

          <div className="bg-[#0D121F]/80 backdrop-blur border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-6 space-y-3 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Zengin Ekosistem</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Base64, Regex, Markdown, UUID, Hash ve renk araçları tek bir çatı altında.</p>
          </div>
        </div>

        {/* Teknoloji Stack Rozetleri */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <span className="text-slate-500 font-medium">Güç Veren Teknolojiler:</span>
          <span className="bg-[#0D121F] border border-slate-800 px-3 py-1 rounded-lg text-slate-300">Next.js App Router</span>
          <span className="bg-[#0D121F] border border-slate-800 px-3 py-1 rounded-lg text-slate-300">Tailwind CSS</span>
          <span className="bg-[#0D121F] border border-slate-800 px-3 py-1 rounded-lg text-slate-300">Lucide React</span>
          <span className="bg-[#0D121F] border border-slate-800 px-3 py-1 rounded-lg text-slate-300">Web Crypto APIs</span>
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