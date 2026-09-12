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
  Upload, 
  Download, 
  Check, 
  Copy,
  ArrowRight,
  Sliders,
  AlertCircle
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"compressor" | "password" | "shadow" | "json" | "base64" | "markdown" | "meta" | "jwt" | "url" | "text" | "uuid" | "html" | "timestamp" | "color" | "regex" | "hash" | "flexbox" | "lorem">("compressor");

  // Görsel Sıkıştırma State'leri
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Şifre Üreteci State'leri
  const [password, setPassword] = useState<string>("");
  const [passLength, setPassLength] = useState<number>(16);
  const [copied, setCopied] = useState<boolean>(false);

  // CSS Box Shadow State'leri
  const [shadowX, setShadowX] = useState<number>(10);
  const [shadowY, setShadowY] = useState<number>(10);
  const [blur, setBlur] = useState<number>(20);
  const [spread, setSpread] = useState<number>(0);
  const [shadowColor, setShadowColor] = useState<string>("#000000");
  const [shadowCopied, setShadowCopied] = useState<boolean>(false);

  // JSON Formatter State'leri
  const [rawJson, setRawJson] = useState<string>('{"name":"PrivaTools","type":"Open Source"}');
  const [formattedJson, setFormattedJson] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonCopied, setJsonCopied] = useState<boolean>(false);

  // Base64 State'leri
  const [base64Input, setBase64Input] = useState<string>("");
  const [base64Output, setBase64Output] = useState<string>("");
  const [base64Mode, setBase64Mode] = useState<"encode" | "decode">("encode");
  const [base64Copied, setBase64Copied] = useState<boolean>(false);
  const [base64Error, setBase64Error] = useState<string | null>(null);

  // Markdown State'leri
  const [markdownInput, setMarkdownInput] = useState<string>("# PrivaTools\n\n**Client-side** açık kaynak araç seti.");
  const [markdownCopied, setMarkdownCopied] = useState<boolean>(false);

  // Meta Tag State'leri
  const [siteTitle, setSiteTitle] = useState<string>("PrivaTools - Open Source Utilities");
  const [siteDescription, setSiteDescription] = useState<string>("Browser-based, zero-server privacy utility tools for developers.");
  const [siteUrl, setSiteUrl] = useState<string>("https://privatools.vercel.app");
  const [siteImage, setSiteImage] = useState<string>("https://privatools.vercel.app/og-image.png");
  const [metaCopied, setMetaCopied] = useState<boolean>(false);

  // JWT Decoder State'leri
  const [jwtInput, setJwtInput] = useState<string>("");
  const [jwtHeader, setJwtHeader] = useState<string>("");
  const [jwtPayload, setJwtPayload] = useState<string>("");
  const [jwtError, setJwtError] = useState<string | null>(null);

  // URL State'leri
  const [urlInput, setUrlInput] = useState<string>("");
  const [urlOutput, setUrlOutput] = useState<string>("");
  const [urlMode, setUrlMode] = useState<"encode" | "decode">("encode");
  const [urlCopied, setUrlCopied] = useState<boolean>(false);

  // Metin Analizörü State'leri
  const [analyzerText, setAnalyzerText] = useState<string>("");

  // UUID Generator State'leri
  const [uuids, setUuids] = useState<string[]>([]);
  const [uuidQuantity, setUuidQuantity] = useState<number>(5);
  const [uuidCopied, setUuidCopied] = useState<boolean>(false);

  // HTML Entity State'leri
  const [htmlInput, setHtmlInput] = useState<string>("");
  const [htmlOutput, setHtmlOutput] = useState<string>("");
  const [htmlMode, setHtmlMode] = useState<"encode" | "decode">("encode");
  const [htmlCopied, setHtmlCopied] = useState<boolean>(false);

  // Unix Timestamp State'leri
  const [timestampInput, setTimestampInput] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [convertedDate, setConvertedDate] = useState<string>("");
  const [timestampCopied, setTimestampCopied] = useState<boolean>(false);

  // Renk Dönüştürücü State'leri
  const [hexColor, setHexColor] = useState<string>("#10b981");
  const [colorCopied, setColorCopied] = useState<string | null>(null);

  // Regex Tester State'leri
  const [regexPattern, setRegexPattern] = useState<string>("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [regexFlags, setRegexFlags] = useState<string>("g");
  const [regexText, setRegexText] = useState<string>("İletişim için support@privatools.app veya test@example.com adreslerine yazabilirsiniz.");
  const [regexMatches, setRegexMatches] = useState<string[]>([]);
  const [regexError, setRegexError] = useState<string | null>(null);

  // Hash Generator State'leri
  const [hashInput, setHashInput] = useState<string>("PrivaTools");
  const [sha1Output, setSha1Output] = useState<string>("");
  const [sha256Output, setSha256Output] = useState<string>("");
  const [sha512Output, setSha512Output] = useState<string>("");
  const [hashCopiedKey, setHashCopiedKey] = useState<string | null>(null);

  // Flexbox Playground State'leri
  const [flexDirection, setFlexDirection] = useState<"row" | "row-reverse" | "column" | "column-reverse">("row");
  const [justifyContent, setJustifyContent] = useState<"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly">("center");
  const [alignItems, setAlignItems] = useState<"flex-start" | "flex-end" | "center" | "stretch" | "baseline">("center");
  const [flexGap, setFlexGap] = useState<number>(16);
  const [flexItemCount, setFlexItemCount] = useState<number>(4);
  const [flexCopied, setFlexCopied] = useState<boolean>(false);

  // Lorem Ipsum Generator State'leri
  const [loremParagraphCount, setLoremParagraphCount] = useState<number>(3);
  const [loremOutput, setLoremOutput] = useState<string>("");
  const [loremCopied, setLoremCopied] = useState<boolean>(false);

  const sampleParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tiddus quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purpureus. Morbi in sem quis dui placerat ornare.",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris ut leo. Cras dolor metus, aliquet adipiscing, lacus. Nulla facilisi.",
    "Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue."
  ];

  const generateLorem = (count: number) => {
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(sampleParagraphs[i % sampleParagraphs.length]);
    }
    setLoremOutput(result.join("\n\n"));
  };

  // Hash Hesaplama Fonksiyonu (Web Crypto API)
  const computeHashes = async (text: string) => {
    setHashInput(text);
    if (!text) {
      setSha1Output("");
      setSha256Output("");
      setSha512Output("");
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const buffer1 = await crypto.subtle.digest("SHA-1", data);
    setSha1Output(Array.from(new Uint8Array(buffer1)).map(b => b.toString(16).padStart(2, '0')).join(''));

    const buffer256 = await crypto.subtle.digest("SHA-256", data);
    setSha256Output(Array.from(new Uint8Array(buffer256)).map(b => b.toString(16).padStart(2, '0')).join(''));

    const buffer512 = await crypto.subtle.digest("SHA-512", data);
    setSha512Output(Array.from(new Uint8Array(buffer512)).map(b => b.toString(16).padStart(2, '0')).join(''));
  };

  // Görsel Sıkıştırma Mantığı
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

  // Dinamik Şifre Üretici
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let result = "";
    for (let i = 0; i < passLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = (text: string, setStatus: (v: any) => void, valKey?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (valKey) {
      setStatus(valKey);
      setTimeout(() => setStatus(null), 2000);
    } else {
      setStatus(true);
      setTimeout(() => setStatus(false), 2000);
    }
  };

  // JSON Düzenleyici
  const handleFormatJson = (input: string) => {
    setRawJson(input);
    if (!input.trim()) {
      setFormattedJson("");
      setJsonError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Geçersiz JSON formatı");
      setFormattedJson("");
    }
  };

  // Base64 İşleme
  const handleBase64Process = (text: string, mode: "encode" | "decode") => {
    setBase64Input(text);
    setBase64Error(null);
    if (!text.trim()) {
      setBase64Output("");
      return;
    }
    try {
      if (mode === "encode") {
        setBase64Output(btoa(unescape(encodeURIComponent(text))));
      } else {
        setBase64Output(decodeURIComponent(escape(atob(text))));
      }
    } catch (err) {
      setBase64Error("Geçersiz Base64 dizisi çözülemedi.");
      setBase64Output("");
    }
  };

  // JWT Çözümleme Mantığı
  const handleDecodeJwt = (token: string) => {
    setJwtInput(token);
    setJwtError(null);
    if (!token.trim()) {
      setJwtHeader("");
      setJwtPayload("");
      return;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      setJwtError("Geçersiz JWT yapısı. Token 3 parçadan oluşmalıdır (Header.Payload.Signature).");
      setJwtHeader("");
      setJwtPayload("");
      return;
    }

    try {
      const headerDecoded = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payloadDecoded = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      setJwtHeader(JSON.stringify(headerDecoded, null, 2));
      setJwtPayload(JSON.stringify(payloadDecoded, null, 2));
    } catch (err) {
      setJwtError("JWT verisi Base64 çözümlenirken hata oluştu.");
      setJwtHeader("");
      setJwtPayload("");
    }
  };

  // URL Encode/Decode Mantığı
  const handleUrlProcess = (text: string, mode: "encode" | "decode") => {
    setUrlInput(text);
    if (!text.trim()) {
      setUrlOutput("");
      return;
    }
    try {
      if (mode === "encode") {
        setUrlOutput(encodeURIComponent(text));
      } else {
        setUrlOutput(decodeURIComponent(text));
      }
    } catch (err) {
      setUrlOutput("Hata: Dönüştürme yapılamadı.");
    }
  };

  // UUID v4 Üretici
  const generateUuids = (count: number) => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        list.push(crypto.randomUUID());
      } else {
        list.push(
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
              v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          })
        );
      }
    }
    setUuids(list);
  };

  // HTML Entity İşleyici
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

  // Timestamp Dönüştürücü
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

  // Renk Dönüşüm Fonksiyonları
  const hexToRgb = (hex: string) => {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(x => x + x).join("");
    const num = parseInt(c, 16);
    return isNaN(num) || c.length !== 6
      ? { r: 0, g: 0, b: 0 }
      : { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const currentColorRgb = hexToRgb(hexColor);
  const currentColorHsl = rgbToHsl(currentColorRgb.r, currentColorRgb.g, currentColorRgb.b);

  const rgbString = `rgb(${currentColorRgb.r}, ${currentColorRgb.g}, ${currentColorRgb.b})`;
  const hslString = `hsl(${currentColorHsl.h}, ${currentColorHsl.s}%, ${currentColorHsl.l}%)`;

  // Regex Test Fonksiyonu
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

  // Metin Analizi İstatistikleri
  const charCount = analyzerText.length;
  const wordCount = analyzerText.trim() ? analyzerText.trim().split(/\s+/).length : 0;
  const sentenceCount = analyzerText.trim() ? analyzerText.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphCount = analyzerText.trim() ? analyzerText.split(/\n+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  // Markdown Parser
  const parseMarkdown = (text: string) => {
    let parsed = text
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-white mb-2">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold text-white mb-2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-medium text-white mb-1">$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-emerald-400">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/`(.*)`/gim, '<code class="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-xs">$1</code>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-300">$1</li>');
    return { __html: parsed.replace(/\n/g, '<br />') };
  };

  const cssShadowCode = `box-shadow: ${shadowX}px ${shadowY}px ${blur}px ${spread}px ${shadowColor};`;

  const flexCode = `.container {\n  display: flex;\n  flex-direction: ${flexDirection};\n  justify-content: ${justifyContent};\n  align-items: ${alignItems};\n  gap: ${flexGap}px;\n}`;

  const metaTagCode = `<!-- Primary Meta Tags -->
<title>${siteTitle}</title>
<meta name="title" content="${siteTitle}" />
<meta name="description" content="${siteDescription}" />`;

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
            Araçlar
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
            onClick={() => {
              setActiveTab("password");
              if (!password) generatePassword();
            }}
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
            onClick={() => {
              setActiveTab("json");
              if (!formattedJson) handleFormatJson(rawJson);
            }}
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
            onClick={() => {
              setActiveTab("uuid");
              if (uuids.length === 0) generateUuids(uuidQuantity);
            }}
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
            onClick={() => {
              setActiveTab("hash");
              if (!sha256Output) computeHashes(hashInput);
            }}
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

          {/* TAB 2: Şifre Üreteci */}
          {activeTab === "password" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Parola Oluşturucu</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Cihazınızda kriptografik olarak rastgele ve yüksek güvenlikli şifreler üretin.
                </p>
              </div>

              <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={password}
                    className="w-full bg-slate-900 border border-slate-800 rounded-md px-4 py-3 font-mono text-emerald-400 text-sm focus:outline-none"
                  />
                  <button
                    onClick={() => copyToClipboard(password, setCopied)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-3 rounded-md text-xs font-medium transition flex items-center gap-1.5 shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Kopyalandı" : "Kopyala"}
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Uzunluk</span>
                    <span className="font-mono text-white">{passLength} karakter</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={passLength}
                    onChange={(e) => {
                      setPassLength(parseInt(e.target.value));
                      generatePassword();
                    }}
                    className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                <button
                  onClick={generatePassword}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs py-2.5 rounded-md transition"
                >
                  Yeniden Üret
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CSS Shadow */}
          {activeTab === "shadow" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">CSS Box Shadow Üreteci</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Gelişmiş CSS gölge efektleri oluşturun ve hazır kodları projenize kopyalayın.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-8 flex items-center justify-center min-h-[260px]">
                  <div
                    className="w-32 h-32 bg-slate-800 rounded-xl transition-all duration-150"
                    style={{
                      boxShadow: `${shadowX}px ${shadowY}px ${blur}px ${spread}px ${shadowColor}`,
                    }}
                  />
                </div>

                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>X Offset</span>
                        <span className="text-white font-mono">{shadowX}px</span>
                      </div>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={shadowX}
                        onChange={(e) => setShadowX(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Y Offset</span>
                        <span className="text-white font-mono">{shadowY}px</span>
                      </div>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        value={shadowY}
                        onChange={(e) => setShadowY(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Bulanıklık (Blur)</span>
                        <span className="text-white font-mono">{blur}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={blur}
                        onChange={(e) => setBlur(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Renk:</span>
                      <input
                        type="color"
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="w-6 h-6 rounded bg-transparent cursor-pointer border-0"
                      />
                    </div>
                    <button
                      onClick={() => copyToClipboard(cssShadowCode, setShadowCopied)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2 px-3 rounded transition flex items-center gap-1.5"
                    >
                      {shadowCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {shadowCopied ? "Kopyalandı" : "Kodu Kopyala"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: JSON Formatter */}
          {activeTab === "json" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">JSON Formatter & Validator</h1>
                <p className="text-sm text-slate-400 mt-1">
                  JSON verilerinizi biçimlendirin, sözdizimi hatalarını anında tespit edin.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">Ham JSON Verisi</label>
                  <textarea
                    rows={12}
                    value={rawJson}
                    onChange={(e) => handleFormatJson(e.target.value)}
                    placeholder="JSON verinizi buraya yapıştırın..."
                    className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 transition resize-none"
                  />
                </div>

                <div className="space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-medium text-slate-400">Formatlanmış Sonuç</label>
                      {formattedJson && (
                        <button
                          onClick={() => copyToClipboard(formattedJson, setJsonCopied)}
                          className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          {jsonCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {jsonCopied ? "Kopyalandı" : "Kopyala"}
                        </button>
                      )}
                    </div>

                    {jsonError ? (
                      <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 flex items-start gap-3 text-rose-400 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Sözdizimi Hatası</p>
                          <p className="mt-1 opacity-90">{jsonError}</p>
                        </div>
                      </div>
                    ) : (
                      <textarea
                        rows={12}
                        readOnly
                        value={formattedJson}
                        placeholder="Düzenlenmiş çıktı burada görünecek..."
                        className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Base64 Encoder / Decoder */}
          {activeTab === "base64" && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-semibold text-white">Base64 Encoder / Decoder</h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Metinlerinizi istemci tarafında anında Base64 formatına çevirin veya çözün.
                  </p>
                </div>
                <div className="flex bg-[#090D16] border border-slate-800 rounded-lg p-1 text-xs">
                  <button
                    onClick={() => {
                      setBase64Mode("encode");
                      handleBase64Process(base64Input, "encode");
                    }}
                    className={`px-3 py-1.5 rounded-md font-medium transition ${
                      base64Mode === "encode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Encode
                  </button>
                  <button
                    onClick={() => {
                      setBase64Mode("decode");
                      handleBase64Process(base64Input, "decode");
                    }}
                    className={`px-3 py-1.5 rounded-md font-medium transition ${
                      base64Mode === "decode" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Decode
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-400">
                    {base64Mode === "encode" ? "Düz Metin (Plain Text)" : "Base64 Dizisi"}
                  </label>
                  <textarea
                    rows={10}
                    value={base64Input}
                    onChange={(e) => handleBase64Process(e.target.value, base64Mode)}
                    placeholder={base64Mode === "encode" ? "Dönüştürülecek metni yazın..." : "Çözülecek Base64 kodunu yapıştırın..."}
                    className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 transition resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-slate-400">Sonuç</label>
                    {base64Output && (
                      <button
                        onClick={() => copyToClipboard(base64Output, setBase64Copied)}
                        className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        {base64Copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {base64Copied ? "Kopyalandı" : "Kopyala"}
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={10}
                    readOnly
                    value={base64Output}
                    placeholder="Sonuç burada görüntülenecek..."
                    className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Markdown Live Editor */}
          {activeTab === "markdown" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Markdown Live Editor</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Markdown kodlarınızı yazın ve gerçek zamanlı biçimlendirilmiş çıktısını görüntüleyin.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  rows={12}
                  value={markdownInput}
                  onChange={(e) => setMarkdownInput(e.target.value)}
                  placeholder="Markdown kodlarını yazın..."
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
                />
                <div
                  dangerouslySetInnerHTML={parseMarkdown(markdownInput)}
                  className="w-full h-[230px] bg-[#090D16] border border-slate-800 rounded-lg p-4 text-xs text-slate-300 leading-relaxed overflow-y-auto"
                />
              </div>
            </div>
          )}

          {/* TAB 7: Meta Tag Generator */}
          {activeTab === "meta" && (
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
          )}

          {/* TAB 8: JWT Decoder */}
          {activeTab === "jwt" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">JWT Decoder</h1>
                <p className="text-sm text-slate-400 mt-1">
                  JWT tokenlarınızı istemci tarafında çözerek Header ve Payload içeriklerini görüntüleyin.
                </p>
              </div>

              <div className="space-y-4">
                <textarea
                  rows={4}
                  value={jwtInput}
                  onChange={(e) => handleDecodeJwt(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea
                    rows={8}
                    readOnly
                    value={jwtHeader}
                    placeholder="Header verisi..."
                    className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
                  />
                  <textarea
                    rows={8}
                    readOnly
                    value={jwtPayload}
                    placeholder="Payload verisi..."
                    className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: URL Encoder / Decoder */}
          {activeTab === "url" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">URL Encoder / Decoder</h1>
                <p className="text-sm text-slate-400 mt-1">
                  URL adreslerinizdeki özel karakterleri istemci tarafında güvenle kodlayın veya çözün.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  rows={10}
                  value={urlInput}
                  onChange={(e) => handleUrlProcess(e.target.value, urlMode)}
                  placeholder="Metin veya URL yazın..."
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
                />
                <textarea
                  rows={10}
                  readOnly
                  value={urlOutput}
                  placeholder="Çıktı burada görünecek..."
                  className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 10: Metin Analizörü */}
          {activeTab === "text" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Metin İstatistik Analizörü</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Metninizin kelime, karakter, cümle ve tahmini okuma süresi istatistiklerini hesaplayın.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-center">
                  <p className="text-xs text-slate-500 font-medium">Karakter</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">{charCount}</p>
                </div>
                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-center">
                  <p className="text-xs text-slate-500 font-medium">Kelime</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">{wordCount}</p>
                </div>
                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-center">
                  <p className="text-xs text-slate-500 font-medium">Cümle / Paragraf</p>
                  <p className="text-xl font-bold text-slate-200 mt-1 font-mono">{sentenceCount} / {paragraphCount}</p>
                </div>
                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 text-center">
                  <p className="text-xs text-slate-500 font-medium">Okuma Süresi</p>
                  <p className="text-xl font-bold text-slate-200 mt-1 font-mono">~{readingTime} dk</p>
                </div>
              </div>

              <textarea
                rows={10}
                value={analyzerText}
                onChange={(e) => setAnalyzerText(e.target.value)}
                placeholder="Analiz edilecek metni yazın..."
                className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
              />
            </div>
          )}

          {/* TAB 11: UUID Generator */}
          {activeTab === "uuid" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">UUID / GUID Generator</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Kriptografik olarak çakışmasız, rastgele UUID v4 tanımlayıcıları üretin.
                </p>
              </div>

              <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-medium text-slate-400">Adet:</label>
                    <select
                      value={uuidQuantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setUuidQuantity(val);
                        generateUuids(val);
                      }}
                      className="bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                    >
                      <option value={1}>1 Adet</option>
                      <option value={5}>5 Adet</option>
                      <option value={10}>10 Adet</option>
                      <option value={20}>20 Adet</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => generateUuids(uuidQuantity)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-xs font-medium transition"
                    >
                      Yeniden Üret
                    </button>
                    {uuids.length > 0 && (
                      <button
                        onClick={() => copyToClipboard(uuids.join("\n"), setUuidCopied)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-1.5 px-3 rounded transition flex items-center gap-1.5"
                      >
                        {uuidCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {uuidCopied ? "Kopyalandı" : "Tümünü Kopyala"}
                      </button>
                    )}
                  </div>
                </div>

                <textarea
                  rows={8}
                  readOnly
                  value={uuids.join("\n")}
                  className="w-full bg-[#0D121F] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

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
                  onChange={(e) => handleHtmlProcess(e.target.value, htmlMode)}
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

          {/* TAB 14: Color Converter & Picker */}
          {activeTab === "color" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Color Code Converter & Picker</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Renk seçin, HEX, RGB ve HSL formatları arasında anında dönüşüm yapın.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center min-h-[240px] gap-4">
                  <div 
                    className="w-32 h-32 rounded-2xl shadow-lg border-2 border-slate-700/50 transition-all duration-200"
                    style={{ backgroundColor: hexColor }}
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400 font-medium">Renk Seçin:</label>
                    <input
                      type="color"
                      value={hexColor}
                      onChange={(e) => setHexColor(e.target.value)}
                      className="w-8 h-8 rounded bg-transparent cursor-pointer border-0"
                    />
                  </div>
                </div>

                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">HEX</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={hexColor.toUpperCase()}
                        onChange={(e) => setHexColor(e.target.value)}
                        className="w-full bg-[#0D121F] border border-slate-800 rounded-md px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none"
                      />
                      <button
                        onClick={() => copyToClipboard(hexColor.toUpperCase(), setColorCopied, "hex")}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md text-xs font-medium transition shrink-0"
                      >
                        {colorCopied === "hex" ? "Kopyalandı" : "Kopyala"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">RGB</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={rgbString}
                        className="w-full bg-[#0D121F] border border-slate-800 rounded-md px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none"
                      />
                      <button
                        onClick={() => copyToClipboard(rgbString, setColorCopied, "rgb")}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md text-xs font-medium transition shrink-0"
                      >
                        {colorCopied === "rgb" ? "Kopyalandı" : "Kopyala"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-400">HSL</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={hslString}
                        className="w-full bg-[#0D121F] border border-slate-800 rounded-md px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none"
                      />
                      <button
                        onClick={() => copyToClipboard(hslString, setColorCopied, "hsl")}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md text-xs font-medium transition shrink-0"
                      >
                        {colorCopied === "hsl" ? "Kopyalandı" : "Kopyala"}
                      </button>
                    </div>
                  </div>
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

          {/* TAB 16: Crypto Hash Generator */}
          {activeTab === "hash" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Crypto Hash Generator</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Web Crypto API kullanarak istemci tarafında güvenli SHA-1, SHA-256 ve SHA-512 özetleri üretin.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400">Girdi Metni</label>
                  <textarea
                    rows={4}
                    value={hashInput}
                    onChange={(e) => computeHashes(e.target.value)}
                    placeholder="Hash çıkarılacak metni girin..."
                    className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-slate-400">SHA-1</label>
                      <button
                        onClick={() => copyToClipboard(sha1Output, setHashCopiedKey, "sha1")}
                        className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        {hashCopiedKey === "sha1" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {hashCopiedKey === "sha1" ? "Kopyalandı" : "Kopyala"}
                      </button>
                    </div>
                    <input
                      type="text"
                      readOnly
                      value={sha1Output}
                      className="w-full bg-[#090D16] border border-slate-800 rounded-md p-2.5 text-xs font-mono text-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-slate-400">SHA-256</label>
                      <button
                        onClick={() => copyToClipboard(sha256Output, setHashCopiedKey, "sha256")}
                        className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        {hashCopiedKey === "sha256" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {hashCopiedKey === "sha256" ? "Kopyalandı" : "Kopyala"}
                      </button>
                    </div>
                    <input
                      type="text"
                      readOnly
                      value={sha256Output}
                      className="w-full bg-[#090D16] border border-slate-800 rounded-md p-2.5 text-xs font-mono text-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-slate-400">SHA-512</label>
                      <button
                        onClick={() => copyToClipboard(sha512Output, setHashCopiedKey, "sha512")}
                        className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        {hashCopiedKey === "sha512" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {hashCopiedKey === "sha512" ? "Kopyalandı" : "Kopyala"}
                      </button>
                    </div>
                    <input
                      type="text"
                      readOnly
                      value={sha512Output}
                      className="w-full bg-[#090D16] border border-slate-800 rounded-md p-2.5 text-xs font-mono text-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 17: Flexbox Visual Playground */}
          {activeTab === "flexbox" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-white">Flexbox Visual Playground</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Flexbox düzeninizi görsel olarak hizalayın ve CSS kodlarını kopyalayın.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 min-h-[300px] flex flex-col justify-between">
                  <div
                    className="w-full h-full min-h-[220px] bg-[#0D121F] border border-slate-800/80 rounded-lg p-3 transition-all duration-200"
                    style={{
                      display: "flex",
                      flexDirection,
                      justifyContent,
                      alignItems,
                      gap: `${flexGap}px`,
                    }}
                  >
                    {Array.from({ length: flexItemCount }).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-12 h-12 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0"
                      >
                        {idx + 1}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-mono">live preview</span>
                    <button
                      onClick={() => copyToClipboard(flexCode, setFlexCopied)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-1.5 px-3 rounded transition flex items-center gap-1.5"
                    >
                      {flexCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {flexCopied ? "Kopyalandı" : "CSS Kopyala"}
                    </button>
                  </div>
                </div>

                <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-medium">flex-direction</label>
                    <select
                      value={flexDirection}
                      onChange={(e) => setFlexDirection(e.target.value as any)}
                      className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none"
                    >
                      <option value="row">row</option>
                      <option value="row-reverse">row-reverse</option>
                      <option value="column">column</option>
                      <option value="column-reverse">column-reverse</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-medium">justify-content</label>
                    <select
                      value={justifyContent}
                      onChange={(e) => setJustifyContent(e.target.value as any)}
                      className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none"
                    >
                      <option value="flex-start">flex-start</option>
                      <option value="flex-end">flex-end</option>
                      <option value="center">center</option>
                      <option value="space-between">space-between</option>
                      <option value="space-around">space-around</option>
                      <option value="space-evenly">space-evenly</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-medium">align-items</label>
                    <select
                      value={alignItems}
                      onChange={(e) => setAlignItems(e.target.value as any)}
                      className="w-full bg-[#0D121F] border border-slate-800 rounded-md p-2 text-slate-200 focus:outline-none"
                    >
                      <option value="flex-start">flex-start</option>
                      <option value="flex-end">flex-end</option>
                      <option value="center">center</option>
                      <option value="stretch">stretch</option>
                      <option value="baseline">baseline</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>gap</span>
                        <span className="text-white font-mono">{flexGap}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={flexGap}
                        onChange={(e) => setFlexGap(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Eleman Sayısı</span>
                        <span className="text-white font-mono">{flexItemCount}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={flexItemCount}
                        onChange={(e) => setFlexItemCount(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
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