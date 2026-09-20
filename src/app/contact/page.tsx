// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simüle edilmiş istemci tarafı gönderim gecikmesi
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8 w-full">
        
        {/* Başlık */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Mail className="w-3.5 h-3.5" />
            <span>Bizimle İletişime Geçin</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Geri Bildirim & Destek
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Önerileriniz, eklemek istediğiniz yeni araçlar veya hata bildirimleri için bize mesaj gönderebilirsiniz.
          </p>
        </div>

        {/* Form Kartı */}
        <div className="bg-[#0D121F] border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Mesajınız Alındı!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Geri bildiriminiz için teşekkür ederiz. En kısa sürede inceleyip dönüş yapacağız.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-5 py-2.5 rounded-lg transition border border-slate-700"
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Adınız</label>
                <input
                  type="text"
                  required
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">E-posta Adresiniz</label>
                <input
                  type="email"
                  required
                  placeholder="ornek@domain.com"
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Mesajınız</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Öneri veya görüşlerinizi buraya yazın..."
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-lg text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gönderiliyor...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Mesajı Gönder</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      <footer className="border-t border-slate-800/80 pt-6 mt-12 text-center text-xs text-slate-500">
        PrivaTools Open Source Utility Framework
      </footer>
    </div>
  );
}