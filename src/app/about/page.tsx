// src/app/about/page.tsx
import { Shield, Lock, Zap, Cpu, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12 w-full">
        
        {/* Başlık */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>Gizlilik ve Güvenlik Odaklı Mimari</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            PrivaTools Hakkında
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Geliştiricilerin günlük iş akışlarında ihtiyaç duyduğu temel araçları, verilerini dış sunuculara göndermeden, tamamen tarayıcı içinde hızlı ve güvenli bir şekilde sunmak için tasarlandı.
          </p>
        </div>

        {/* Özellikler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Neden Sıfır Sunucu İşleme?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Geleneksel araçlar verilerinizi uzak sunuculara yükler. PrivaTools ise modern Web API'lerini ve Next.js client-side yeteneklerini kullanarak tüm işlemleri doğrudan sizin tarayıcınızda gerçekleştirir.
            </p>
          </div>

          <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Modern Teknoloji Yığını</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next.js (Turbopack), Tailwind CSS ve Lucide React ikon kütüphanesiyle güçlendirilmiş, yüksek performanslı ve göz yormayan karanlık tema deneyimi sunar.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition text-sm shadow-lg shadow-emerald-500/20"
          >
            <span>Stüdyoyu Keşfetmaya Başla</span>
          </Link>
        </div>

      </div>

      <footer className="border-t border-slate-800/80 pt-6 mt-12 text-center text-xs text-slate-500">
        PrivaTools Open Source Utility Framework
      </footer>
    </div>
  );
}