"use client";

import { useState, ChangeEvent } from "react";
import imageCompression from "browser-image-compression";
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
  Upload, 
  Download, 
  Check, 
  Copy,
  ArrowRight,
  Sliders,
  AlertCircle
} from "lucide-react";

// Tüm Modüler Bileşenler
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<"compressor" | "password" | "shadow" | "json" | "base64" | "markdown" | "meta" | "jwt" | "url" | "text" | "uuid" | "html" | "timestamp" | "color" | "regex" | "hash" | "flexbox" | "lorem" | "qr">("compressor");

  // Görsel Sıkıştırma State'leri
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setOriginalFile(selectedFile);
    await compressImage(selectedFile, quality);
  };

  const compressImage = async (file: File, qualityValue: number) => {
    setIsProcessing(true);
    const options = {
      maxSizeMB: qualityValue,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const processed = await imageCompression(file, options);
      setCompressedFile(processed);
      setPreviewUrl(URL.createObjectURL(processed));
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-200 font-sans flex flex-col justify-between">
      <header className="border-b border-slate-800/80 bg-[#0D121F]/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400">
            P
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">PrivaTools</span>
        </div>
        <nav className="text-xs text-slate-400 font-mono">
          client-side / zero-data-retention
        </nav>
      </header>

      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Araçlar (19)
          </p>
          <button
            onClick={() => setActiveTab("compressor")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "compressor"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileImage className="w-4 h-4 text-emerald-400" />
              <span>Görsel Sıkıştırıcı</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "password"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>Güvenli Şifre Üreteci</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("shadow")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "shadow"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Palette className="w-4 h-4 text-emerald-400" />
              <span>CSS Shadow Generator</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("json")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "json"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>JSON Formatter</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("base64")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "base64"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Binary className="w-4 h-4 text-emerald-400" />
              <span>Base64 Encoder / Decoder</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("markdown")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "markdown"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>Markdown Live Editor</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("meta")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "meta"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Meta Tag Generator</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("jwt")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "jwt"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>JWT Decoder</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("url")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "url"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Link2 className="w-4 h-4 text-emerald-400" />
              <span>URL Encoder / Decoder</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("text")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "text"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Metin Analizörü</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("uuid")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "uuid"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Fingerprint className="w-4 h-4 text-emerald-400" />
              <span>UUID Generator</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("html")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "html"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Code className="w-4 h-4 text-emerald-400" />
              <span>HTML Entity Converter</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("timestamp")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "timestamp"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Unix Timestamp Converter</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("color")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "color"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Pipette className="w-4 h-4 text-emerald-400" />
              <span>Color Converter & Picker</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("regex")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "regex"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Regex className="w-4 h-4 text-emerald-400" />
              <span>Regex Tester & Matcher</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("hash")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "hash"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Hash className="w-4 h-4 text-emerald-400" />
              <span>Crypto Hash Generator</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("flexbox")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "flexbox"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid className="w-4 h-4 text-emerald-400" />
              <span>Flexbox Visual Playground</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("lorem")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "lorem"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <AlignLeft className="w-4 h-4 text-emerald-400" />
              <span>Lorem Ipsum Generator</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>

          <button
            onClick={() => setActiveTab("qr")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "qr"
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>QR Code Generator</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 opacity-50" />
          </button>
        </aside>

        {/* Dashboard Area */}
        <section className="lg:col-span-9 bg-[#0D121F] border border-slate-800/80 rounded-xl p-6 shadow-sm">
          
          {/* TAB 1: Görsel Sıkıştırma */}
          {activeTab === "compressor" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Görsel Optimizasyonu</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Görsellerinizin kalitesini koruyarak boyutunu tarayıcınızda doğrudan düşürün.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-800 hover:border-slate-700 bg-[#090D16] rounded-lg p-6 flex flex-col items-center justify-center min-h-[220px] relative transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-8 h-8 text-slate-500 mb-3" />
                  <p className="text-sm font-medium text-slate-300">Dosya seçin veya sürükleyin</p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP</p>
                </div>

                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5" /> Kalite Limiti
                      </span>
                      <span>{quality} MB</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={quality}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setQuality(val);
                        if (originalFile) compressImage(originalFile, val);
                      }}
                      className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                    />

                    {originalFile && compressedFile && (
                      <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Orijinal:</span>
                          <span className="text-slate-200 font-mono">{(originalFile.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Optimize Edilen:</span>
                          <span className="text-emerald-400 font-mono font-semibold">{(compressedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {previewUrl && originalFile && (
                    <a
                      href={previewUrl}
                      download={`optimized_${originalFile.name}`}
                      className="mt-4 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2.5 px-4 rounded-md transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> İndir
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modüler Bileşen Bağlantıları */}
          {activeTab === "password" && <PasswordGenerator />}
          {activeTab === "jwt" && <JwtDecoder />}
          {activeTab === "uuid" && <UuidGenerator />}
          {activeTab === "color" && <ColorPicker />}
          {activeTab === "hash" && <HashGenerator />}
          {activeTab === "flexbox" && <FlexboxPlayground />}
          {activeTab === "qr" && <QrGenerator />}
          {activeTab === "shadow" && <BoxShadowGenerator />}
          {activeTab === "json" && <JsonFormatter />}
          {activeTab === "base64" && <Base64Converter />}
          {activeTab === "markdown" && <MarkdownEditor />}
          {activeTab === "meta" && <MetaTagGenerator />}
          {activeTab === "url" && <UrlEncoderDecoder />}
          {activeTab === "text" && <TextAnalyzer />}
          {activeTab === "html" && <HtmlEntityConverter />}
          {activeTab === "timestamp" && <UnixTimestampConverter />}
          {activeTab === "regex" && <RegexTester />}
          {activeTab === "lorem" && <LoremIpsumGenerator />}

        </section>
      </main>

      <footer className="border-t border-slate-800/80 px-6 py-4 text-center text-xs text-slate-500">
        PrivaTools Open Source Utility Framework
      </footer>
    </div>
  );
}