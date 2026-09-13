"use client";

import { useState } from "react";

export default function MetaTagGenerator() {
  const [siteTitle, setSiteTitle] = useState<string>("PrivaTools - Open Source Utilities");
  const [siteDescription, setSiteDescription] = useState<string>(
    "Browser-based, zero-server privacy utility tools for developers."
  );

  const metaTagCode = `<!-- Primary Meta Tags -->\n<title>${siteTitle}</title>\n<meta name="title" content="${siteTitle}" />\n<meta name="description" content="${siteDescription}" />`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Meta Tag Generator</h1>
        <p className="text-sm text-slate-400 mt-1">
          Arama motorları ve sosyal medya paylaşımları için dinamik HTML meta etiketleri oluşturun.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Site Başlığı (Title)</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full bg-[#090D16] border border-slate-800 rounded-md p-2.5 text-slate-200 focus:outline-none focus:border-slate-700"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Site Açıklaması (Description)</label>
            <textarea
              rows={3}
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="w-full bg-[#090D16] border border-slate-800 rounded-md p-2.5 text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
            />
          </div>
        </div>

        <textarea
          rows={12}
          readOnly
          value={metaTagCode}
          className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}