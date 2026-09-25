// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Info, Mail, Code, Terminal, Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Sayfa ilk açıldığında localStorage kontrolü
    const savedTheme = localStorage.getItem("theme");
    
    // Eğer kullanıcı daha önce açık modu seçmediyse, varsayılan olarak hep dark (siyah) aç
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/studio", label: "Stüdyo", icon: Wrench },
    { href: "/about", label: "Hakkımızda", icon: Info },
    { href: "/contact", label: "İletişim", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#030712] dark:bg-white border-b border-slate-800 dark:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Proje İsmi & İkonu */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-white dark:text-slate-900 text-base sm:text-lg tracking-tight">
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
                    : "text-slate-400 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900/60 dark:hover:bg-slate-100"
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sağ Butonlar (GitHub & Tema Butonu) */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-100 dark:hover:bg-slate-200 text-slate-200 dark:text-slate-800 px-3.5 py-2 rounded-lg transition border border-slate-700 dark:border-slate-300 flex items-center gap-1.5 text-xs font-medium"
          >
            <Code className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Tema Değiştirme Butonu (GitHub'ın hemen yanında) */}
          <button
            onClick={toggleTheme}
            className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-100 dark:hover:bg-slate-200 text-amber-400 dark:text-slate-800 p-2 rounded-lg transition border border-slate-700 dark:border-slate-300 flex items-center justify-center"
            title="Temayı Değiştir"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Mobil Menü Butonu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-slate-800/80 hover:bg-slate-700 text-slate-200 dark:bg-slate-100 dark:text-slate-800 p-2 rounded-lg transition border border-slate-700 dark:border-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030712] dark:bg-white border-b border-slate-800 dark:border-slate-200 px-4 py-4 space-y-2">
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
                    : "text-slate-300 dark:text-slate-700 hover:text-white dark:hover:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100"
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