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

// Modüler Bileşenler
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<"compressor" | "password" | "shadow" | "json" | "base64" | "markdown" | "meta" | "jwt" | "url" | "text" | "uuid" | "html" | "timestamp" | "color" | "regex" | "hash" | "flexbox" | "lorem" | "qr">("compressor");

  // Görsel Sıkıştırma State'leri
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // HTML Entity State'leri
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [htmlOutput, setHtmlOutput] = useState<string>("");
  const [htmlMode, setHtmlMode] = useState<"encode" | "decode">("encode");

  // Unix Timestamp State'leri
  const [timestampInput, setTimestampInput] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [convertedDate, setConvertedDate] = useState<string>("");
  const [timestampCopied, setTimestampCopied] = useState<boolean>(false);

  // Regex Tester State'leri
  const [regexPattern, setRegexPattern] = useState<string>("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [regexFlags, setRegexFlags] = useState<string>("g");
  const [regexText, setRegexText] = useState<string>("İletişim için support@privatools.app veya test@example.com adreslerine yazabilirsiniz.");
  const [regexMatches, setRegexMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);

  // Lorem Ipsum State'leri
  const [loremParagraphCount, setLoremParagraphCount] = useState<number>(3);
  const [loremOutput, setLoremOutput] = useState<string>("");
  const [loremCopied, setLoremCopied] = useState<boolean>(false);

  const sampleParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tiddus quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purpureus. Morbi in sem quis dui placerat ornare."
  ];

  const generateLorem = (count: number) => {
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(sampleParagraphs[i % sampleParagraphs.length]);
    }
    setLoremOutput(result.join("\n\n"));
  };

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

  const copyToClipboard = (text: string, setStatus: (v: any) => void) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setStatus(true);
    setTimeout(() => setStatus(false), 2000);
  };

  const handleHtmlProcess = (text: string, mode: "encode" | "decode") => {
    setHtmlInput(text);
    if (!text.trim()) {
      setHtmlOutput("");
      return;
    }
    if (mode === "encode") {
      setHtmlOutput(
        text.replace(/[\u00A0-\u9999<>&"']/g, (i) => `&#${i.charCodeAt(0)};`)
      );
    } else {
      const doc = new DOMParser().parseFromString(text, "text/html");
      setHtmlOutput(doc.documentElement.textContent || "");
    }
  };

  const handleConvertTimestamp = (val: string) => {
    setTimestampInput(val);
    if (!val.trim()) {
      setConvertedDate("");
      return;
    }
    const num = Number(val);
    if (isNaN(num)) {
      setConvertedDate("Geçersiz sayısal zaman damgası.");
      return;
    }
    const date = new Date(num > 9999999999 ? num : num * 1000);
    if (isNaN(date.getTime())) {
      setConvertedDate("Geçersiz tarih.");
    } else {
      setConvertedDate(date.toUTCString() + " (UTC) \n" + date.toLocaleString() + " (Yerel)");
    }
  };

  const handleRegexTest = (pattern: string, flags: string, text: string) => {
    setRegexPattern(pattern);
    setRegexFlags(flags);
    setRegexText(text);

    if (!pattern.trim() || !text.trim()) {
      setRegexMatches([]);
      setRegexError(null);
      return;
    }

    try {
      const re = new RegExp(pattern, flags);
      setRegexError(null);
      if (flags.includes("g")) {
        const matches = text.match(re);
        setRegexMatches(matches ? Array.from(matches) : []);
      } else {
        const match = text.match(re);
        setRegexMatches(match ? [match[0]] : []);
      }
    } catch (err: any) {
      setRegexError(err.message || "Geçersiz Regex kalıbı");
      setRegexMatches([]);
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
            onClick={() => {
              setActiveTab("timestamp");
              if (!convertedDate) handleConvertTimestamp(timestampInput);
            }}
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
            onClick={() => {
              setActiveTab("regex");
              if (regexMatches.length === 0) handleRegexTest(regexPattern, regexFlags, regexText);
            }}
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
            onClick={() => {
              setActiveTab("lorem");
              if (!loremOutput) generateLorem(loremParagraphCount);
            }}
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

          {/* Modülerleştirilen Bileşenler */}
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

          {/* TAB 12: HTML Entity Converter */}
          {activeTab === "html" && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-semibold text-white">HTML Entity Converter</h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Özel karakterleri HTML Entity kodlarına dönüştürün veya çözün.
                  </p>
                </div>
                <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
                  <button
                    onClick={() => {
                      setHtmlMode("encode");
                      handleHtmlProcess(htmlInput, "encode");
                    }}
                    className={`px-3 py-1.5 rounded-md font-medium transition ${
                      htmlMode === "encode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => {
                      setHtmlMode("decode");
                      handleHtmlProcess(htmlInput, "decode");
                    }}
                    className={`px-3 py-1.5 rounded-md font-medium transition ${
                      htmlMode === "decode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Decode
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  rows={10}
                  value={htmlInput}
                  onChange={(e) => handleHtmlProcess(htmlInput, htmlMode)}
                  placeholder="Metin veya HTML yazın..."
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
                />
                <textarea
                  rows={10}
                  readOnly
                  value={htmlOutput}
                  placeholder="Sonuç..."
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 13: Unix Timestamp Converter */}
          {activeTab === "timestamp" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Unix Timestamp Dönüştürücü</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Unix zaman damgasını insani tarih/saat formatına dönüştürün.
                </p>
              </div>

              <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-slate-400">Unix Timestamp (Saniye veya Milisaniye)</label>
                    <button
                      onClick={() => handleConvertTimestamp(Math.floor(Date.now() / 1000).toString())}
                      className="text-xs text-emerald-400 hover:underline"
                    >
                      Şu Anki Zamanı Getir
                    </button>
                  </div>
                  <input
                    type="text"
                    value={timestampInput}
                    onChange={(e) => handleConvertTimestamp(e.target.value)}
                    placeholder="1726084292"
                    className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-3 text-xs font-mono text-slate-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-slate-400">Çözümlenmiş Tarih & Saat</label>
                    {convertedDate && (
                      <button
                        onClick={() => copyToClipboard(convertedDate, setTimestampCopied)}
                        className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        {timestampCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {timestampCopied ? "Kopyalandı" : "Kopyala"}
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    readOnly
                    value={convertedDate}
                    placeholder="Dönüştürülen tarih burada görüntülenecek..."
                    className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 15: Regex Tester & Matcher */}
          {activeTab === "regex" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Regex Tester & Matcher</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Düzenli ifadelerinizi (Regex) gerçek zamanlı olarak test edin ve eşleşen ifadeleri görün.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-xs font-medium text-slate-400">Regex Kalıbı (Pattern)</label>
                    <input
                      type="text"
                      value={regexPattern}
                      onChange={(e) => handleRegexTest(e.target.value, regexFlags, regexText)}
                      placeholder="[a-z]+"
                      className="w-full bg-[#090D16] border border-slate-800 rounded-md px-3 py-2.5 text-xs font-mono text-emerald-400 focus:outline-none focus:border-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">Bayraklar (Flags)</label>
                    <input
                      type="text"
                      value={regexFlags}
                      onChange={(e) => handleRegexTest(regexPattern, e.target.value, regexText)}
                      placeholder="g, i, m"
                      className="w-full bg-[#090D16] border border-slate-800 rounded-md px-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700"
                    />
                  </div>
                </div>

                {regexError && (
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{regexError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400">Test Metni</label>
                    <textarea
                      rows={8}
                      value={regexText}
                      onChange={(e) => handleRegexTest(regexPattern, regexFlags, e.target.value)}
                      placeholder="Test edilecek metni yazın..."
                      className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-medium text-slate-400">
                        Eşleşen İfadeler ({regexMatches.length})
                      </label>
                    </div>
                    <div className="w-full h-[165px] bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono overflow-y-auto space-y-1">
                      {regexMatches.length > 0 ? (
                        regexMatches.map((m, idx) => (
                          <div key={idx} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
                            {idx + 1}. {m}
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-500 italic">Eşleşme bulunamadı.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 18: Lorem Ipsum Generator */}
          {activeTab === "lorem" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Lorem Ipsum Generator</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Arayüz tasarımlarınız ve prototipleriniz için hızlıca taslak metin (placeholder) üretin.
                </p>
              </div>

              <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-medium text-slate-400">Paragraf Sayısı:</label>
                    <select
                      value={loremParagraphCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setLoremParagraphCount(val);
                        generateLorem(val);
                      }}
                      className="bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                    >
                      <option value={1}>1 Paragraf</option>
                      <option value={2}>2 Paragraf</option>
                      <option value={3}>3 Paragraf</option>
                      <option value={5}>5 Paragraf</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => generateLorem(loremParagraphCount)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-xs font-medium transition"
                    >
                      Yeniden Üret
                    </button>
                    {loremOutput && (
                      <button
                        onClick={() => copyToClipboard(loremOutput, setLoremCopied)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-1.5 px-3 rounded transition flex items-center gap-1.5"
                      >
                        {loremCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {loremCopied ? "Kopyalandı" : "Tümünü Kopyala"}
                      </button>
                    )}
                  </div>
                </div>

                <textarea
                  rows={8}
                  readOnly
                  value={loremOutput}
                  className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

        </section>
      </main>

      <footer className="border-t border-slate-800/80 px-6 py-4 text-center text-xs text-slate-500">
        PrivaTools Open Source Utility Framework
      </footer>
    </div>
  );
}