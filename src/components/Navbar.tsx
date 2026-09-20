// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Info, Mail, Code, Terminal, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/studio", label: "Stüdyo", icon: Wrench },
    { href: "/about", label: "Hakkımızda", icon: Info },
    { href: "/contact", label: "İletişim", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Proje İsmi & İkonu */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">
            Priva<span className="text-emerald-400">Tools</span>
          </span>
        </Link>

        {/* Masaüstü Menü Linkleri */}
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

        {/* Sağ Butonlar (GitHub & Mobil Menü Butonu) */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-lg transition border border-slate-700 flex items-center gap-1.5 text-xs font-medium"
          >
            <Code className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Mobil Menü Açma Butonu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-slate-800/80 hover:bg-slate-700 text-slate-200 p-2 rounded-lg transition border border-slate-700"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobil Açılır Menü */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D121F] border-b border-slate-800 px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}