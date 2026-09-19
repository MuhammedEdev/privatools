// src/app/studio/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  FileImage, KeyRound, Palette, Code2, Binary, FileCode, Globe, 
  ShieldAlert, Link2, FileText, Fingerprint, Code, Clock, Pipette, 
  Regex, Hash, LayoutGrid, AlignLeft, QrCode, Ruler, Sparkles, 
  Braces, Keyboard, FileSpreadsheet, Link, ArrowRight, Search, Star 
} from "lucide-react";

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

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<string>("compressor");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  // LocalStorage'dan favorileri yükle
  useEffect(() => {
    const savedFavs = localStorage.getItem("privatools_favorites");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Favorileri localStorage'a kaydet
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((fav) => fav !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("privatools_favorites", JSON.stringify(updated));
  };

  const toolsList = [
    { id: "compressor", name: "Görsel Sıkıştırıcı", category: "design", icon: FileImage, component: ImageCompressor },
    { id: "password", name: "Güvenli Şifre Üreteci", category: "security", icon: KeyRound, component: PasswordGenerator },
    { id: "shadow", name: "CSS Shadow Generator", category: "design", icon: Palette, component: BoxShadowGenerator },
    { id: "json", name: "JSON Formatter", category: "dev", icon: Code2, component: JsonFormatter },
    { id: "base64", name: "Base64 Encoder / Decoder", category: "converter", icon: Binary, component: Base64Converter },
    { id: "markdown", name: "Markdown Live Editor", category: "dev", icon: FileCode, component: MarkdownEditor },
    { id: "meta", name: "Meta Tag Generator", category: "dev", icon: Globe, component: MetaTagGenerator },
    { id: "jwt", name: "JWT Decoder", category: "security", icon: ShieldAlert, component: JwtDecoder },
    { id: "url", name: "URL Encoder / Decoder", category: "converter", icon: Link2, component: UrlEncoderDecoder },
    { id: "text", name: "Metin Analizörü", category: "dev", icon: FileText, component: TextAnalyzer },
    { id: "uuid", name: "UUID Generator", category: "security", icon: Fingerprint, component: UuidGenerator },
    { id: "html", name: "HTML Entity Converter", category: "converter", icon: Code, component: HtmlEntityConverter },
    { id: "timestamp", name: "Unix Timestamp Converter", category: "converter", icon: Clock, component: UnixTimestampConverter },
    { id: "color", name: "Color Converter & Picker", category: "design", icon: Pipette, component: ColorPicker },
    { id: "regex", name: "Regex Tester & Matcher", category: "dev", icon: Regex, component: RegexTester },
    { id: "hash", name: "Crypto Hash Generator", category: "security", icon: Hash, component: HashGenerator },
    { id: "flexbox", name: "Flexbox Visual Playground", category: "design", icon: LayoutGrid, component: FlexboxPlayground },
    { id: "lorem", name: "Lorem Ipsum Generator", category: "dev", icon: AlignLeft, component: LoremIpsumGenerator },
    { id: "qr", name: "QR Code Generator", category: "design", icon: QrCode, component: QrGenerator },
    { id: "unit", name: "CSS Unit Converter", category: "design", icon: Ruler, component: CssUnitConverter },
    { id: "gradient", name: "CSS Gradient Generator", category: "design", icon: Sparkles, component: CssGradientGenerator },
    { id: "ts", name: "JSON to TS Converter", category: "dev", icon: Braces, component: JsonToTsConverter },
    { id: "keycode", name: "Keycode Info", category: "dev", icon: Keyboard, component: KeycodeInfo },
    { id: "jsx", name: "HTML to JSX Converter", category: "converter", icon: FileSpreadsheet, component: HtmlToJsxConverter },
    { id: "slug", name: "Slug Generator", category: "dev", icon: Link, component: SlugGenerator },
  ];

  const categories = [
    { id: "all", name: "Tümü" },
    { id: "favorites", name: "⭐ Favoriler" },
    { id: "dev", name: "Geliştirici" },
    { id: "security", name: "Güvenlik" },
    { id: "converter", name: "Dönüştürücü" },
    { id: "design", name: "Tasarım" },
  ];

  const filteredTools = toolsList.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === "favorites") {
      return matchesSearch && favorites.includes(tool.id);
    }
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ActiveComponent = toolsList.find((t) => t.id === activeTab)?.component || ImageCompressor;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Sol Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Araçlar ({filteredTools.length})
            </span>
          </div>

          {/* Arama Barı */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Araç ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D121F] border border-slate-800 rounded-lg pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-700"
            />
          </div>

          {/* Kategori Filtreleri */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-[#0D121F] text-slate-400 hover:text-white border border-slate-800/80"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Araç Listesi */}
          <div className="space-y-1 max-h-[550px] overflow-y-auto pr-1">
            {filteredTools.map((tool) => {
              const IconComponent = tool.icon;
              const isActive = activeTab === tool.id;
              const isFav = favorites.includes(tool.id);
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                    <span className="truncate">{tool.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      onClick={(e) => toggleFavorite(tool.id, e)}
                      className={`p-1 rounded hover:bg-slate-700/50 transition ${isFav ? "text-amber-400" : "text-slate-600 hover:text-slate-400"}`}
                      title={isFav ? "Favorilerden çıkar" : "Favorilere ekle"}
                    >
                      <Star className={`w-3.5 h-3.5 ${isFav ? "fill-amber-400" : ""}`} />
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 opacity-50 ${isActive ? "text-emerald-400" : ""}`} />
                  </div>
                </button>
              );
            })}
            {filteredTools.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-6">Araç bulunamadı.</p>
            )}
          </div>
        </aside>

        {/* Sağ Çalışma Alanı */}
        <section className="lg:col-span-9 bg-[#0D121F] border border-slate-800/80 rounded-xl p-6 shadow-xl">
          <ActiveComponent />
        </section>

      </main>
    </div>
  );
}