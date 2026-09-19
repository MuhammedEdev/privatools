// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { Shield, Code, Zap, Wrench } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#090D16]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
            <Shield className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">Priva<span className="text-emerald-400">Tools</span></span>
            <span className="text-[10px] block text-slate-500 font-mono -mt-1">Pro Developer Suite</span>
          </div>
        </Link>

        {/* Orta / Sağ Menü Linkleri */}
        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-2 rounded-lg transition"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Stüdyoya Git</span>
          </Link>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
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