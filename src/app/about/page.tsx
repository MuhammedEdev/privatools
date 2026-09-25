// src/app/about/page.tsx
"use client";

import Link from "next/link";
import { Zap, Lock, Code2, ArrowRight, ShieldCheck, Cpu, RefreshCw } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12 w-full">
        
        {/* Başlık */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Geliştiriciler İçin, <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Gizlilik Odaklı Altyapı
            </span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
            PrivaTools, hassas verilerinizin güvenliğini ön planda tutan, tamamen tarayıcı üzerinde çalışan modern bir araç, dönüştürücü ve geliştirici süitidir.
          </p>
        </div>

        {/* Özellikler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold">%100 Client-Side</h3>
            <p className="text-xs text-slate-400 dark:text-slate-600 leading-relaxed">
              Tüm işlemler doğrudan tarayıcınızda (JavaScript/Web APIs) gerçekleştirilir. Verileriniz sunucularımıza asla gönderilmez.
            </p>
          </div>

          <div className="bg-slate-900/60 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold">Işık Hızında Performans</h3>
            <p className="text-xs text-slate-400 dark:text-slate-600 leading-relaxed">
              Next.js altyapısı ve Turbopack gücüyle sıfır gecikme, anında yüklenme ve kesintisiz çalışma deneyimi sunar.
            </p>
          </div>

          <div className="bg-slate-900/60 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold">25+ Pro Araç</h3>
            <p className="text-xs text-slate-400 dark:text-slate-600 leading-relaxed">
              JSON formatlayıcıdan JWT çözümleyiciye, şifre üretecinden görsel sıkıştırıcıya kadar ihtiyacınız olan her şey tek çatı altında.
            </p>
          </div>
        </div>

        {/* Mimari Güvenlik ve Şeffaflık Bölümü */}
        <div className="bg-slate-900/60 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Neden PrivaTools?</h3>
              <p className="text-xs text-slate-400 dark:text-slate-600">Geliştiricilerin güvenlik endişelerini kökten çözen mimari yaklaşımımız.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950/60 dark:bg-slate-100 border border-slate-800/60 dark:border-slate-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <Cpu className="w-4 h-4" />
                <span>Sıfır Sunucu Maliyeti ve Yükü</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-600 leading-relaxed">
                Tüm ağır hesaplamalar istemci tarafında yapıldığı için sunucu tarafında veri tabanı veya log tutulmaz.
              </p>
            </div>

            <div className="bg-slate-950/60 dark:bg-slate-100 border border-slate-800/60 dark:border-slate-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <RefreshCw className="w-4 h-4" />
                <span>Açık Kaynak ve Şeffaf Kod</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-600 leading-relaxed">
                Projenin tamamı açık kaynaklıdır. Kodları inceleyebilir, kendi local ortamınızda güvenle çalıştırabilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Alt CTA */}
        <div className="bg-slate-900/60 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <h3 className="text-xl font-bold">Stüdyoyu Keşfetmeye Başlayın</h3>
          <p className="text-xs text-slate-400 dark:text-slate-600 max-w-md mx-auto">
            Hemen araçları incelemeye başlayın ve geliştirme süreçlerinizi hızlandırın.
          </p>
          <div>
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20"
            >
              <span>Stüdyoya Git (25 Araç)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      <footer className="border-t border-slate-800 dark:border-slate-200 pt-6 mt-12 text-center text-xs text-slate-500">
        © 2026 PrivaTools. Açık kaynaklı geliştirici platformu.
      </footer>
    </div>
  );
}