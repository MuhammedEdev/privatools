// src/app/about/page.tsx
"use client";

import Link from "next/link";
import { Shield, Zap, Lock, Code2, ArrowRight } from "lucide-react";

export default openAboutPage();

export function openAboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12 w-full">
        
        {/* Başlık */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Geliştiriciler İçin, <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Gizlilik Odaklı Altyapı
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            PrivaTools, hassas verilerinizin güvenliğini ön planda tutan, tamamen tarayıcı üzerinde çalışan modern bir araç, dönüştürücü ve geliştirici süitidir.
          </p>
        </div>

        {/* Özellikler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">%100 Client-Side</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tüm işlemler doğrudan tarayıcınızda (JavaScript/Web APIs) gerçekleştirilir. Verileriniz sunucularımıza asla gönderilmez.
            </p>
          </div>

          <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Işık Hızında Performans</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next.js altyapısı ve Turbopack gücüyle sıfır gecikme, anında yüklenme ve kesintisiz çalışma deneyimi sunar.
            </p>
          </div>

          <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">25+ Pro Araç</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              JSON formatlayıcıdan JWT çözümleyiciye, şifre üretecinden görsel sıkıştırıcıya kadar ihtiyacınız olan her şey tek çatı altında.
            </p>
          </div>
        </div>

        {/* Alt CTA */}
        <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Stüdyoyu Keşfetmeye Başlayın</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
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

      <footer className="border-t border-slate-800/80 pt-6 mt-12 text-center text-xs text-slate-500">
        © 2026 PrivaTools. Açık kaynaklı geliştirici platformu.
      </footer>
    </div>
  );
}