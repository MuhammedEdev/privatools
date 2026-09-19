// src/app/page.tsx
"use client";

import { useState } from "react";
import { 
  FileImage, 
  KeyRound, 
  Palette, 
  Code2, 
  Binary,
  FileCode,
  Globe,
  ShieldAlert,
  Link2,
  FileText,
  Fingerprint,
  Code,
  Clock,
  Pipette,
  Regex,
  Hash,
  LayoutGrid,
  AlignLeft,
  QrCode,
  Ruler,
  Sparkles,
  Braces,
  Keyboard,
  FileSpreadsheet,
  Link,
  ArrowRight,
  Lock,
  Zap,
  Shield,
  Search
} from "lucide-react";

// Tüm Modüler Bileşenler (25 Araç)
import ImageCompressor from "@/components/tools/ImageCompressor";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import JwtDecoder from "@/components/tools/JwtDecoder";
import UuidGenerator from "@/components/tools/UuidGenerator";
import ColorPicker from "@/components/tools/ColorPicker";
import HashGenerator from "@/components/tools/HashGenerator";
import FlexboxPlayground from "@/components/tools/FlexboxPlayground";
import QrGenerator from "@/components/tools/QrGenerator";
import BoxShadowGenerator from "@/components/tools/BoxShadowGenerator";
import JsonFormatter from "@/components/tools/JsonFormatter";
import Base64Converter from "@/components/tools/Base64Converter";
import MarkdownEditor from "@/components/tools/MarkdownEditor";
import MetaTagGenerator from "@/components/tools/MetaTagGenerator";
import UrlEncoderDecoder from "@/components/tools/UrlEncoderDecoder";
import TextAnalyzer from "@/components/tools/TextAnalyzer";
import HtmlEntityConverter from "@/components/tools/HtmlEntityConverter";
import UnixTimestampConverter from "@/components/tools/UnixTimestampConverter";
import RegexTester from "@/components/tools/RegexTester";
import LoremIpsumGenerator from "@/components/tools/LoremIpsumGenerator";
import CssUnitConverter from "@/components/tools/CssUnitConverter";
import CssGradientGenerator from "@/components/tools/CssGradientGenerator";
import JsonToTsConverter from "@/components/tools/JsonToTsConverter";
import KeycodeInfo from "@/components/tools/KeycodeInfo";
import HtmlToJsxConverter from "@/components/tools/HtmlToJsxConverter";
import SlugGenerator from "@/components/tools/SlugGenerator";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("compressor");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toolsList = [
    { id: "compressor", name: "Görsel Sıkıştırıcı", icon: FileImage, component: ImageCompressor },
    { id: "password", name: "Güvenli Şifre Üreteci", icon: KeyRound, component: PasswordGenerator },
    { id: "shadow", name: "CSS Shadow Generator", icon: Palette, component: BoxShadowGenerator },
    { id: "json", name: "JSON Formatter", icon: Code2, component: JsonFormatter },
    { id: "base64", name: "Base64 Encoder / Decoder", icon: Binary, component: Base64Converter },
    { id: "markdown", name: "Markdown Live Editor", icon: FileCode, component: MarkdownEditor },
    { id: "meta", name: "Meta Tag Generator", icon: Globe, component: MetaTagGenerator },
    { id: "jwt", name: "JWT Decoder", icon: ShieldAlert, component: JwtDecoder },
    { id: "url", name: "URL Encoder / Decoder", icon: Link2, component: UrlEncoderDecoder },
    { id: "text", name: "Metin Analizörü", icon: FileText, component: TextAnalyzer },
    { id: "uuid", name: "UUID Generator", icon: Fingerprint, component: UuidGenerator },
    { id: "html", name: "HTML Entity Converter", icon: Code, component: HtmlEntityConverter },
    { id: "timestamp", name: "Unix Timestamp Converter", icon: Clock, component: UnixTimestampConverter },
    { id: "color", name: "Color Converter & Picker", icon: Pipette, component: ColorPicker },
    { id: "regex", name: "Regex Tester & Matcher", icon: Regex, component: RegexTester },
    { id: "hash", name: "Crypto Hash Generator", icon: Hash, component: HashGenerator },
    { id: "flexbox", name: "Flexbox Visual Playground", icon: LayoutGrid, component: FlexboxPlayground },
    { id: "lorem", name: "Lorem Ipsum Generator", icon: AlignLeft, component: LoremIpsumGenerator },
    { id: "qr", name: "QR Code Generator", icon: QrCode, component: QrGenerator },
    { id: "unit", name: "CSS Unit Converter", icon: Ruler, component: CssUnitConverter },
    { id: "gradient", name: "CSS Gradient Generator", icon: Sparkles, component: CssGradientGenerator },
    { id: "ts", name: "JSON to TS Converter", icon: Braces, component: JsonToTsConverter },
    { id: "keycode", name: "Keycode Info", icon: Keyboard, component: KeycodeInfo },
    { id: "jsx", name: "HTML to JSX Converter", icon: FileSpreadsheet, component: HtmlToJsxConverter },
    { id: "slug", name: "Slug Generator", icon: Link, component: SlugGenerator },
  ];

  const filteredTools = toolsList.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ActiveComponent = toolsList.find((t) => t.id === activeTab)?.component || ImageCompressor;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col px-4 py-8">
      {/* Hero Header Kısmı */}
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Geliştiriciler İçin Yeni Nesil Araç Seti</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Güvenli, Hızlı ve Modern <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Geliştirici Stüdyosu
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Tüm verileriniz tarayıcınızda (client-side) işlenir. Asla sunucuya gönderilmez. Tamamen açık kaynaklı ve gizlilik odaklı araçlar.
        </p>
      </div>

      {/* Ana Stüdyo Grid Alanı (Sidebar + Çalışma Alanı) */}
      <main className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Sol Sidebar & Arama */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between px-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Araçlar ({toolsList.length})
            </span>
          </div>

          {/* Arama Barı */}
          <div className="relative px-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3" />
            <input
              type="text"
              placeholder="Araç ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-lg pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-700"
            />
          </div>

          {/* Araç Butonları Listesi */}
          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredTools.map((tool) => {
              const IconComponent = tool.icon;
              const isActive = activeTab === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                    <span className="truncate">{tool.name}</span>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 opacity-50 ${isActive ? "text-emerald-400" : ""}`} />
                </button>
              );
            })}
            {filteredTools.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-4">Araç bulunamadı.</p>
            )}
          </div>
        </aside>

        {/* Sağ Dinamik Çalışma Alanı (Dashboard) */}
        <section className="lg:col-span-9 bg-[#0D121F] border border-slate-800/80 rounded-xl p-6 shadow-xl">
          <ActiveComponent />
        </section>

      </main>
    </div>
  );
}