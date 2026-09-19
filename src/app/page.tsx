// src/app/page.tsx
"use client";

import Link from "next/link";
import { Shield, Sparkles, ArrowRight, Lock, Zap, Layers, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col justify-between">
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-8">
        
        {/* Üst Rozet */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium shadow-inner">
          <Sparkles className="w-4 h-4" />
          <span>Geliştiriciler İçin Yeni Nesil Gizlilik Odaklı Stüdyo</span>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Güvenli, Hızlı ve Modern <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            PrivaTools Platformu
          </span>
        </h1>

        {/* Açıklama */}
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          25+ profesyonel geliştirici aracı ile işlerinizi hızlandırın. Tüm işlemler tarayıcınızda (client-side) gerçekleşir, verileriniz asla sunucuya gitmez.
        </p>

        {/* CTA Butonları */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/studio" // Veya araçlar sayfasına yönlendirme
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
          >
            <span>Stüdyoyu Başlat (25 Araç)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-8 py-4 rounded-xl transition border border-slate-700 text-sm flex items-center justify-center gap-2"
          >
            GitHub'da İncele
          </a>
        </div>

        {/* Özellikler Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 text-left">
          <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">%100 İstemci Tarafı (Client-Side)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Verileriniz cihazınızdan dışarı çıkmaz. Sıfır veri saklama politikasıyla tam gizlilik.</p>
          </div>

          <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Anında ve Hızlı Sonuç</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Next.js ve Turbopack gücüyle sıfır gecikmeyle anında araçları çalıştırın.</p>
          </div>

          <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Zengin Araç Koleksiyonu</h3>
            <p className="text-xs text-slate-400 leading-relaxed">JSON formatlayıcıdan JWT çözümleyiciye kadar ihtiyacınız olan her şey tek yerde.</p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 px-6 py-6 text-center text-xs text-slate-500">
        © 2026 PrivaTools. Tüm hakları saklıdır. Açık kaynaklı geliştirici platformu.
      </footer>
    </div>
  );
}