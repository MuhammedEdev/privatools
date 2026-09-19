// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Info, Mail, Code, Zap } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/studio", label: "Stüdyo", icon: Wrench },
    { href: "/about", label: "Hakkımızda", icon: Info },
    { href: "/contact", label: "İletişim", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Proje İsmi */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-extrabold text-white text-lg tracking-tight">
            Priva<span className="text-emerald-400">Tools</span>
          </span>
        </Link>

        {/* Gerçekçi ve Doğal Menü Linkleri (Dış Kutu Kaldırıldı) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sağ Butonlar */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/50 border border-slate-800/80 px-3 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>%100 Client-Side</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-lg transition border border-slate-700 flex items-center gap-1.5 text-xs font-medium"
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>

      </div>
    </header>
  );
}