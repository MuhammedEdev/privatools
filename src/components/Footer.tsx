// src/components/Footer.tsx
import Link from "next/link";
import { Code, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#090D16] border-t border-slate-800/80 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Kolon 1: Marka */}
        <div className="space-y-3 md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-extrabold text-white text-lg tracking-tight">
              Priva<span className="text-emerald-400">Tools</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Geliştiriciler için geliştirilmiş, verilerinizin gizliliğini koruyan %100 istemci tarafı (client-side) modern araç platformu.
          </p>
        </div>

        {/* Kolon 2: Hızlı Bağlantılar */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Navigasyon</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition">Ana Sayfa</Link>
            </li>
            <li>
              <Link href="/studio" className="hover:text-emerald-400 transition">Stüdyo (25 Araç)</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition">Hakkımızda</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-400 transition">İletişim</Link>
            </li>
          </ul>
        </div>

        {/* Kolon 3: Bağlantılar */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Topluluk</h4>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition border border-slate-700"
              title="GitHub"
            >
              <Code className="w-4 h-4 text-emerald-400" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition border border-slate-700"
              title="Website"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>

      </div>

      {/* Alt Telif Çizgisi (Rozet Kaldırıldı) */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/60 text-center text-xs text-slate-500">
        <p>© 2026 PrivaTools. Tüm hakları saklıdır. Açık kaynaklı geliştirici platformu.</p>
      </div>
    </footer>
  );
}