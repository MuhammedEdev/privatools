"use client";

import { useState } from "react";
import { Copy, Check, Globe, Share2 } from "lucide-react";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState<string>("PrivaTools - Güvenli Geliştirici Araçları");
  const [description, setDescription] = useState<string>("Modern web geliştiriciler için tarayıcı tabanlı, hızlı ve güvenli açık kaynak araç seti.");
  const [url, setUrl] = useState<string>("https://privatools.dev");
  const [image, setImage] = useState<string>("https://privatools.dev/og-image.png");
  const [copied, setCopied] = useState<boolean>(false);

  const generatedTags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Meta Tag Generator</h1>
          <p className="text-sm text-slate-400 mt-1">
            SEO ve sosyal medya paylaşımları için kusursuz meta etiketleri oluşturun.
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
            <label className="text-slate-400 font-medium">Sayfa Başlığı (Title)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Açıklama (Description)</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-slate-700 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Canonical URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Önizleme Görsel URL (OG Image)</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2.5 text-white font-mono focus:outline-none focus:border-slate-700"
            />
          </div>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 flex flex-col justify-between space-y-3">
          <label className="text-xs font-medium text-slate-400">Üretilen HTML Meta Kodları</label>
          <textarea
            rows={13}
            readOnly
            value={generatedTags}
            className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none shadow-inner select-all leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}