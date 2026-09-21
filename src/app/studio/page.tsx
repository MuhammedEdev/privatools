// src/app/studio/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { 
  FileImage, KeyRound, Palette, Code2, Binary, FileCode, Globe, 
  ShieldAlert, Link2, FileText, Fingerprint, Code, Clock, Pipette, 
  Regex, Hash, LayoutGrid, AlignLeft, QrCode, Ruler, Sparkles, 
  Braces, Keyboard, FileSpreadsheet, Link, ArrowRight, Search, Star, Layers, Shield, Cpu, RefreshCw, History, Check, Copy, Lock, Zap, RotateCcw, X, Maximize2, Minimize2, Trash2 
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
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Ctrl + K Klavye Kısayolu Entegrasyonu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const savedFavs = localStorage.getItem("privatools_favorites");
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) { console.error(e); }
    }
    const savedRecents = localStorage.getItem("privatools_recents");
    if (savedRecents) {
      try { setRecentTools(JSON.parse(savedRecents)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleSelectTool = (id: string) => {
    setActiveTab(id);
    setResetKey(prev => prev + 1);
    const updatedRecents = [id, ...recentTools.filter(item => item !== id)].slice(0, 4);
    setRecentTools(updatedRecents);
    localStorage.setItem("privatools_recents", JSON.stringify(updatedRecents));
  };

  const handleResetTool = () => {
    setResetKey(prev => prev + 1);
  };

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

  // Geçmişi veya Favorileri Temizleme Fonksiyonları
  const handleClearRecents = () => {
    setRecentTools([]);
    localStorage.removeItem("privatools_recents");
  };

  const toolsList = [
    { id: "compressor", name: "Görsel Sıkıştırıcı", description: "Görsellerinizi kaliteden ödün vermeden tarayıcı tarafında sıkıştırın.", category: "design", icon: FileImage, component: ImageCompressor },
    { id: "password", name: "Güvenli Şifre Üreteci", description: "Güçlü ve özelleştirilebilir rastgele parolalar oluşturun.", category: "security", icon: KeyRound, component: PasswordGenerator },
    { id: "shadow", name: "CSS Shadow Generator", description: "Görsel olarak kutu gölgeleri tasarlayın ve CSS kodunu alın.", category: "design", icon: Palette, component: BoxShadowGenerator },
    { id: "json", name: "JSON Formatter", description: "JSON verilerinizi doğrulayın, düzenleyin ve biçimlendirin.", category: "dev", icon: Code2, component: JsonFormatter },
    { id: "base64", name: "Base64 Encoder / Decoder", description: "Metin ve verileri Base64 formatına çevirin veya çözün.", category: "converter", icon: Binary, component: Base64Converter },
    { id: "markdown", name: "Markdown Live Editor", description: "Markdown metinlerinizi yazın ve canlı önizlemesini görüntüleyin.", category: "dev", icon: FileCode, component: MarkdownEditor },
    { id: "meta", name: "Meta Tag Generator", description: "SEO ve sosyal medya paylaşımları için meta etiketleri oluşturun.", category: "dev", icon: Globe, component: MetaTagGenerator },
    { id: "jwt", name: "JWT Decoder", description: "JSON Web Token (JWT) içeriklerini ve imza detaylarını çözümleyin.", category: "security", icon: ShieldAlert, component: JwtDecoder },
    { id: "url", name: "URL Encoder / Decoder", description: "Web adreslerini URL encode veya decode işlemlerine tabi tutun.", category: "converter", icon: Link2, component: UrlEncoderDecoder },
    { id: "text", name: "Metin Analizörü", description: "Kelime, karakter ve satır istatistiklerini anlık olarak analiz edin.", category: "dev", icon: FileText, component: TextAnalyzer },
    { id: "uuid", name: "UUID Generator", description: "Benzersiz evrensel kimlik tanımlayıcıları (v4 UUID) üretin.", category: "security", icon: Fingerprint, component: UuidGenerator },
    { id: "html", name: "HTML Entity Converter", description: "Özel karakterleri HTML entity kodlarına dönüştürün.", category: "converter", icon: Code, component: HtmlEntityConverter },
    { id: "timestamp", name: "Unix Timestamp Converter", description: "Unix zaman damgalarını okunabilir tarihlere çevirin.", category: "converter", icon: Clock, component: UnixTimestampConverter },
    { id: "color", name: "Color Converter & Picker", description: "HEX, RGB ve HSL renk kodları arasında dönüşüm yapın.", category: "design", icon: Pipette, component: ColorPicker },
    { id: "regex", name: "Regex Tester & Matcher", description: "Düzenli ifadeleri (RegEx) metinler üzerinde test edin.", category: "dev", icon: Regex, component: RegexTester },
    { id: "hash", name: "Crypto Hash Generator", description: "SHA-256, MD5 ve diğer kriptografik hash değerlerini hesaplayın.", category: "security", icon: Hash, component: HashGenerator },
    { id: "flexbox", name: "Flexbox Visual Playground", description: "CSS Flexbox özelliklerini görsel olarak deneyimleyin.", category: "design", icon: LayoutGrid, component: FlexboxPlayground },
    { id: "lorem", name: "Lorem Ipsum Generator", description: "Projeleriniz için örnek placeholder metinleri üretin.", category: "dev", icon: AlignLeft, component: LoremIpsumGenerator },
    { id: "qr", name: "QR Code Generator", description: "Metin ve bağlantılar için hızlıca QR kodlar oluşturun.", category: "design", icon: QrCode, component: QrGenerator },
    { id: "unit", name: "CSS Unit Converter", description: "PX, REM, EM ve diğer CSS birimleri arasında dönüştürme yapın.", category: "design", icon: Ruler, component: CssUnitConverter },
    { id: "gradient", name: "CSS Gradient Generator", description: "Modern ve şık CSS doğrusal geçiş (gradient) renkleri tasarlayın.", category: "design", icon: Sparkles, component: CssGradientGenerator },
    { id: "ts", name: "JSON to TS Converter", description: "JSON objelerini otomatik olarak TypeScript arayüzlerine (interface) çevirin.", category: "dev", icon: Braces, component: JsonToTsConverter },
    { id: "keycode", name: "Keycode Info", description: "Klavyeden basılan tuşların kodlarını ve detaylarını öğrenin.", category: "dev", icon: Keyboard, component: KeycodeInfo },
    { id: "jsx", name: "HTML to JSX Converter", description: "HTML etiketlerini React JSX formatına otomatik dönüştürün.", category: "converter", icon: FileSpreadsheet, component: HtmlToJsxConverter },
    { id: "slug", name: "Slug Generator", description: "Metinleri URL uyumlu slug formatına optimize edin.", category: "dev", icon: Link, component: SlugGenerator },
  ];

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return toolsList.length;
    if (catId === "favorites") return toolsList.filter(t => favorites.includes(t.id)).length;
    if (catId === "recent") return toolsList.filter(t => recentTools.includes(t.id)).length;
    return toolsList.filter(t => t.category === catId).length;
  };

  const categories = [
    { id: "all", name: "Tümü", icon: Layers },
    { id: "favorites", name: "Favoriler", icon: Star },
    { id: "recent", name: "Geçmiş", icon: History },
    { id: "dev", name: "Geliştirici", icon: Cpu },
    { id: "security", name: "Güvenlik", icon: Shield },
    { id: "converter", name: "Dönüştürücü", icon: RefreshCw },
    { id: "design", name: "Tasarım", icon: Palette },
  ];

  const filteredTools = toolsList.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === "favorites") return matchesSearch && favorites.includes(tool.id);
    if (selectedCategory === "recent") return matchesSearch && recentTools.includes(tool.id);
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeToolObj = toolsList.find((t) => t.id === activeTab) || toolsList[0];
  const ActiveComponent = activeToolObj.component;

  const handleCopyToolInfo = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#090D16] text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8">
      <main className={`max-w-7xl w-full mx-auto grid grid-cols-1 ${isFullscreen ? "lg:grid-cols-1" : "lg:grid-cols-12"} gap-6 flex-1 transition-all duration-300`}>
        
        {/* Sol Sidebar */}
        {!isFullscreen && (
          <aside className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>Araçlar</span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-mono text-[10px]">
                  {filteredTools.length} / {toolsList.length}
                </span>
              </span>

              {/* Geçmişi Temizle Butonu (Eğer geçmiş sekmesindeyse veya geçmiş varsa) */}
              {recentTools.length > 0 && selectedCategory === "recent" && (
                <button
                  onClick={handleClearRecents}
                  className="text-[10px] text-slate-500 hover:text-red-400 flex items-center gap-1 transition"
                  title="Geçmişi temizle"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Temizle</span>
                </button>
              )}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Araç ara... (Ctrl + K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0D121F] border border-slate-800 rounded-lg pl-10 pr-16 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-9 top-2.5 text-slate-500 hover:text-white"
                  title="Aramayı temizle"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="absolute right-2.5 top-2 text-[9px] font-mono text-slate-500 bg-slate-800/80 px-1 py-0.5 rounded border border-slate-700/60">
                Ctrl+K
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                const count = getCategoryCount(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                        : "bg-[#0D121F] text-slate-400 hover:text-white border border-slate-800/80 hover:border-slate-700"
                    }`}
                  >
                    <CatIcon className={`w-3 h-3 ${selectedCategory === cat.id ? "text-slate-950" : "text-emerald-400"}`} />
                    <span>{cat.name}</span>
                    <span className={`text-[9px] px-1 rounded-full ${selectedCategory === cat.id ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-1 max-h-[520px] overflow-y-auto pr-1">
              {filteredTools.map((tool) => {
                const IconComponent = tool.icon;
                const isActive = activeTab === tool.id;
                const isFav = favorites.includes(tool.id);
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
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
                <div className="py-12 px-4 text-center space-y-3 bg-[#0D121F]/60 border border-slate-800/80 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-base">
                    🔍
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-semibold text-xs">Araç Bulunamadı</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Aradığınız kriterlere uygun sonuç bulunamadı.</p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Sağ Çalışma Alanı */}
        <section className={`${isFullscreen ? "lg:col-span-12" : "lg:col-span-9"} bg-[#0D121F] border border-slate-800/80 rounded-xl p-6 shadow-xl flex flex-col justify-between space-y-6 transition-all duration-300`}>
          
          <div className="space-y-6">
            
            {/* Hızlı Son Kullanılanlar Barı */}
            {recentTools.length > 0 && (
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800/60 overflow-x-auto text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1 shrink-0">
                  <History className="w-3 h-3 text-emerald-400" />
                  <span>Son Kullanılanlar:</span>
                </span>
                <div className="flex items-center gap-1.5">
                  {recentTools.map(toolId => {
                    const toolObj = toolsList.find(t => t.id === toolId);
                    if (!toolObj) return null;
                    const ToolIcon = toolObj.icon;
                    const isCurrent = activeTab === toolId;
                    return (
                      <button
                        key={toolId}
                        onClick={() => handleSelectTool(toolId)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition border text-[11px] shrink-0 ${
                          isCurrent 
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold" 
                            : "bg-[#090D16] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                        }`}
                      >
                        <ToolIcon className="w-3 h-3" />
                        <span>{toolObj.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Araç Üst Bilgi Barı */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">{activeToolObj.name}</h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Client-Side
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{activeToolObj.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border border-slate-700"
                  title={isFullscreen ? "Normal görünüme dön" : "Tam ekran yap"}
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-emerald-400" /> : <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isFullscreen ? "Küçült" : "Tam Ekran"}</span>
                </button>

                <button
                  onClick={handleResetTool}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border border-slate-700"
                  title="Aracı sıfırla"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sıfırla</span>
                </button>

                <button
                  onClick={handleCopyToolInfo}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 border border-slate-700"
                  title="Sayfa bağlantısını kopyala"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Kopyalandı" : "Bağlantı"}</span>
                </button>
              </div>
            </div>

            {/* Aktif Araç Bileşeni */}
            <div>
              <ActiveComponent key={resetKey} />
            </div>
          </div>

          {/* Alt Güvenlik ve Performans Bilgi Bandı */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sıfır veri kaybı ve tam gizlilik garantisiyle tarayıcınızda çalışır.</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Next.js & Turbopack</span>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}