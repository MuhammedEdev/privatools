"use client";

import { useState } from "react";
import { Copy, Check, Globe, Search } from "lucide-react";

export default function MetaTagGenerator() {
  const [siteTitle, setSiteTitle] = useState<string>("PrivaTools - Open Source Utilities");
  const [siteDescription, setSiteDescription] = useState<string>(
    "Browser-based, zero-server privacy utility tools for developers."
  );
  const [siteUrl, setSiteUrl] = useState<string>("https://privatools.app");
  const [ogImage, setOgImage] = useState<string>("https://privatools.app/og-image.png");
  const [copied, setCopied] = useState<boolean>(false);

  const metaTagCode = `<!-- Primary Meta Tags -->
<title>${siteTitle}</title>
<meta name="title" content="${siteTitle}" />
<meta name="description" content="${siteDescription}" />
<link rel="canonical" href="${siteUrl}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${siteUrl}" />
<meta property="og:title" content="${siteTitle}" />
<meta property="og:description" content="${siteDescription}" />
<meta property="og:image" content="${ogImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${siteUrl}" />
<meta property="twitter:title" content="${siteTitle}" />
<meta property="twitter:description" content="${siteDescription}" />
<meta property="twitter:image" content="${ogImage}" />`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(metaTagCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Meta Tag Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            SEO ve sosyal medya paylaşımları için gelişmiş HTML meta etiketleri oluşturun ve önizleyin.
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded-lg transition flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Kopyalandı" : "Etiketleri Kopyala"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Site Başlığı (Title)</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-slate-200 focus:outline-none focus:border-slate-700"
            />
            <span className="text-[10px] text-slate-500 block">{siteTitle.length} / 60 karakter önerilen</span>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Site Açıklaması (Description)</label>
            <textarea
              rows={3}
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
            />
            <span className="text-[10px] text-slate-500 block">{siteDescription.length} / 160 karakter önerilen</span>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Canonical URL</label>
            <input
              type="text"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-slate-200 focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Sosyal Medya Görsel URL (OG Image)</label>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-slate-200 focus:outline-none focus:border-slate-700"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-400" /> Google Arama Önizlemesi
            </span>
            <div className="bg-white rounded-lg p-4 text-slate-800 space-y-1 shadow-sm">
              <p className="text-xs text-slate-600 truncate">{siteUrl}</p>
              <p className="text-sm font-medium text-blue-600 hover:underline cursor-pointer truncate">{siteTitle}</p>
              <p className="text-xs text-slate-600 line-clamp-2">{siteDescription}</p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" /> Üretilen HTML Etiketleri
            </span>
            <textarea
              rows={8}
              readOnly
              value={metaTagCode}
              className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none shadow-inner select-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}