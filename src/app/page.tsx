// src/app/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Lock, Zap, Layers, Cpu, Shield, RefreshCw, Palette, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Arkaplan Dekoratif Işık Efektleri (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-1/4 left-10 w-[550px] h-[400px] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[650px] h-[450px] bg-emerald-500/5 blur-[170px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-16 relative z-10">

        {/* Ana Başlık */}
        <div className="space-y-6">
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
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-sm shadow-xl shadow-emerald-500/20"
          >
            <span>Stüdyoyu Hemen Başlat</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto bg-[#0D121F] hover:bg-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-xl transition-all border border-slate-800 text-sm flex items-center justify-center gap-2 hover:border-slate-700"
          >
            Sistem Mimarisini İncele
          </Link>
        </div>

        {/* İstatistik / Özet Barı */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 max-w-4xl mx-auto">
          <div className="bg-[#0D121F]/60 backdrop-blur border border-slate-800/80 rounded-2xl p-4 text-center hover:border-emerald-500/30 transition-all group">
            <h4 className="text-2xl sm:text-3xl font-black text-emerald-400 group-hover:scale-105 transition-transform">25+</h4>
            <p className="text-xs text-slate-400 mt-1">Modüler Geliştirici Aracı</p>
          </div>
          <div className="bg-[#0D121F]/60 backdrop-blur border border-slate-800/80 rounded-2xl p-4 text-center hover:border-emerald-500/30 transition-all group">
            <h4 className="text-2xl sm:text-3xl font-black text-white group-hover:scale-105 transition-transform">%100</h4>
            <p className="text-xs text-slate-400 mt-1">İstemci Tarafı (Client-Side)</p>
          </div>
          <div className="bg-[#0D121F]/60 backdrop-blur border border-slate-800/80 rounded-2xl p-4 text-center hover:border-emerald-500/30 transition-all group">
            <h4 className="text-2xl sm:text-3xl font-black text-emerald-400 group-hover:scale-105 transition-transform">0ms</h4>
            <p className="text-xs text-slate-400 mt-1">Sunucu Gecikmesi</p>
          </div>
          <div className="bg-[#0D121F]/60 backdrop-blur border border-slate-800/80 rounded-2xl p-4 text-center hover:border-emerald-500/30 transition-all group">
            <h4 className="text-2xl sm:text-3xl font-black text-white group-hover:scale-105 transition-transform">Açık</h4>
            <p className="text-xs text-slate-400 mt-1">Kaynak Kod Politikası</p>
          </div>
        </div>

        {/* Özellikler Grid (Animasyonlu Kartlar) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
          <div className="bg-[#0D121F]/80 backdrop-blur border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl p-6 space-y-3 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Mutlak Gizlilik</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Verileriniz cihazınızın dışına çıkmaz. JWT, şifreler ve JSON verileriniz güvendedir.</p>
          </div>

          <div className="bg-[#0D121F]/80 backdrop-blur border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl p-6 space-y-3 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Işık Hızında Çalışma</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Next.js ve Turbopack gücüyle optimize edilmiş, anında yanıt veren reaktif bileşenler.</p>
          </div>

          <div className="bg-[#0D121F]/80 backdrop-blur border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl p-6 space-y-3 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Zengin Ekosistem</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Base64, Regex, Markdown, UUID, Hash ve renk araçları tek bir çatı altında.</p>
          </div>
        </div>

        {/* Popüler Hızlı Araçlar Önizleme Kutuları */}
        <div className="pt-12 space-y-8 text-left">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">En Çok Kullanılan Araçlar</h2>
            <p className="text-xs sm:text-sm text-slate-400">Geliştiricilerin favori araçlarına tek tıkla ulaşın.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/studio" className="bg-[#0D121F] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Geliştirici</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="text-white font-bold text-base">JSON Formatter & Validator</h4>
              <p className="text-xs text-slate-400">Karmaşık JSON verilerinizi doğrulayın, biçimlendirin ve tek tuşla sıkıştırın.</p>
            </Link>

            <Link href="/studio" className="bg-[#0D121F] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Güvenlik</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="text-white font-bold text-base">Güvenli Şifre Üreteci</h4>
              <p className="text-xs text-slate-400">Özelleştirilebilir, yüksek güvenlikli rastgele parolalar ve hash anahtarları oluşturun.</p>
            </Link>

            <Link href="/studio" className="bg-[#0D121F] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 space-y-3 transition group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Dönüştürücü</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="text-white font-bold text-base">Base64 Encoder / Decoder</h4>
              <p className="text-xs text-slate-400">Metin ve dosyalarınızı güvenli bir şekilde Base64 formatına çevirin veya çözümleyin.</p>
            </Link>
          </div>
        </div>

        {/* Araç Kategorileri Önizlemesi */}
        <div className="pt-8 space-y-8 text-left">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Geniş Araç Kategorileri</h2>
            <p className="text-xs sm:text-sm text-slate-400">İhtiyacınız olan kategoriye odaklanarak işlerinizi anında çözün.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-white font-semibold text-sm">Geliştirici Araçları</h4>
              <p className="text-[11px] text-slate-400">JSON formatter, Markdown editor, Metin analizörü ve dahası.</p>
            </div>

            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-white font-semibold text-sm">Güvenlik Araçları</h4>
              <p className="text-[11px] text-slate-400">Şifre üreteci, JWT decoder, Hash hesaplayıcı ve UUID üretici.</p>
            </div>

            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <RefreshCw className="w-4 h-4" />
              </div>
              <h4 className="text-white font-semibold text-sm">Dönüştürücüler</h4>
              <p className="text-[11px] text-slate-400">Base64, URL encoder, HTML entity ve Unix timestamp çevirici.</p>
            </div>

            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Palette className="w-4 h-4" />
              </div>
              <h4 className="text-white font-semibold text-sm">Tasarım & UI</h4>
              <p className="text-[11px] text-slate-400">CSS Shadow generator, renk seçici, Flexbox playground ve QR kod.</p>
            </div>
          </div>
        </div>

        {/* Nasıl Çalışır? Bölümü */}
        <div className="pt-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Nasıl Çalışır?</h2>
            <p className="text-xs sm:text-sm text-slate-400">Üç basit adımda güvenli geliştirici araçlarını kullanmaya başlayın.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-[#0D121F]/40 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition">
              <span className="text-emerald-400 font-mono text-xs font-bold">01. ADIM</span>
              <h4 className="text-white font-semibold text-sm">Stüdyoyu Açın</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Üst menüden Stüdyo sayfasına gidin veya Ctrl + K kısayolunu kullanarak aradığınız aracı anında bulun.</p>
            </div>
            <div className="bg-[#0D121F]/40 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition">
              <span className="text-emerald-400 font-mono text-xs font-bold">02. ADIM</span>
              <h4 className="text-white font-semibold text-sm">Verinizi Girin</h4>
              <p className="text-xs text-slate-400 leading-relaxed">JSON, JWT, şifre veya kod bloklarınızı ilgili araca yapıştırın. Tüm işlemler tarayıcınızda işlenir.</p>
            </div>
            <div className="bg-[#0D121F]/40 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition">
              <span className="text-emerald-400 font-mono text-xs font-bold">03. ADIM</span>
              <h4 className="text-white font-semibold text-sm">Anında Sonuç Alın</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Sonucunuzu tek tıkla kopyalayın veya projenizde güvenle kullanmaya devam edin.</p>
            </div>
          </div>
        </div>

        {/* Sık Sorulan Sorular (FAQ) */}
        <div className="pt-12 space-y-8 text-left">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Sık Sorulan Sorular</h2>
            <p className="text-xs sm:text-sm text-slate-400">PrivaTools hakkında merak edilenler.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 space-y-2">
              <h4 className="text-white font-semibold text-sm">Verilerim sunucularda saklanıyor mu?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Asla. PrivaTools %100 client-side (istemci tarafı) mimariyle çalışır. Girdiğiniz hiçbir veri internet üzerinden başka bir sunucuya iletilmez.</p>
            </div>
            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 space-y-2">
              <h4 className="text-white font-semibold text-sm">Platformu kullanmak ücretli mi?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Hayır, PrivaTools tamamen açık kaynaklı ve geliştiriciler için ücretsiz bir araç süitidir.</p>
            </div>
            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 space-y-2">
              <h4 className="text-white font-semibold text-sm">Hangi tarayıcılarda çalışır?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Chrome, Firefox, Safari ve Edge gibi güncel tüm modern tarayıcılarda sorunsuz çalışır.</p>
            </div>
            <div className="bg-[#0D121F] border border-slate-800 rounded-2xl p-6 space-y-2">
              <h4 className="text-white font-semibold text-sm">Yeni bir araç önerebilir miyim?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Evet! İletişim sayfasından veya GitHub üzerinden eklenmesini istediğiniz araçları bildirebilirsiniz.</p>
            </div>
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