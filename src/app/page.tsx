"use client";

import { useState, ChangeEvent } from "react";
import imageCompression from "browser-image-compression";
import { 
  FileImage, 
  KeyRound, 
  Palette, 
  Code2, 
  Binary,
  Upload, 
  Download, 
  Check, 
  Copy,
  ArrowRight,
  Sliders,
  AlertCircle
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"compressor" | "password" | "shadow" | "json" | "base64">("compressor");

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

  const copyToClipboard = (text: string, setStatus: (v: boolean) => void) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setStatus(true);
    setTimeout(() => setStatus(false), 2000);
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

  const cssShadowCode = `box-shadow: ${shadowX}px ${shadowY}px ${blur}px ${spread}px ${shadowColor};`;

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

                  {base64Error ? (
                    <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 flex items-start gap-3 text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>{base64Error}</p>
                    </div>
                  ) : (
                    <textarea
                      rows={10}
                      readOnly
                      value={base64Output}
                      placeholder="Sonuç burada görüntülenecek..."
                      className="w-full bg-[#090D16] border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none resize-none"
                    />
                  )}
                </div>
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